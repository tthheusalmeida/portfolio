# CV generation

The CV is **built on click, in the browser**, from the portfolio data, in the language of the page (`/` = PT, `/en` = EN). Output: A4 PDF with real text (ATS-friendly), single column, Carlito font (metric-compatible with Calibri), at most **2 pages**.

The layout copies the reference CV of the owner: header, centered "Objective", RESUME (2 paragraphs), MAIN RESULTS (bullets), EDUCATION, LANGUAGES, WORK EXPERIENCE, QUALIFICATIONS AND CERTIFICATIONS. Do not reorder sections or change wording style without being asked.

## Flow
`downloadCv(lang)` (`src/cv/downloadCv.ts`, loads the PDF engine with dynamic `import()` only on click) -> `generateCv` -> `buildCvModel` -> `fitToPages` -> `createPdfRenderer` -> download of the blob.

## Layers (`src/cv/`)
| Path | Responsibility |
|---|---|
| `types.ts` | `CvModel`: language-agnostic, render-agnostic description of the CV |
| `content/profile.ts` | CV-only text: contact, objective, availability, resume paragraphs, main results, languages, file name (EN + PT). `{years}` is replaced by the computed years of experience |
| `content/labels.ts` | Section names and field labels (EN + PT) |
| `content/experienceContent.ts`, `experiences.en.ts`, `experiences.pt.ts` | The wording of each job **for the CV** (bullets, technologies) |
| `build/` | Pure functions turning portfolio data into the model (`buildCvModel`, `buildJobs`, `buildEducation`, `buildCertifications`, `formatPeriod`, `yearsOfExperience`) |
| `fit/fitToPages.ts` | Caps bullets per job and trims until the page limit is met; knows nothing about PDF (receives a page counter) |
| `pdf/` | `@react-pdf/renderer` layer: `theme.ts`, `fonts.ts`, `CvPdfDocument.tsx`, one file per section in `sections/`, `createPdfRenderer.ts`, `countPdfPages.ts` |
| `generateCv.ts`, `downloadCv.ts` | Use case and browser download |

Fonts are static files in `public/fonts/carlito/` (`carlito-latin-{400,700}-normal.woff`), loaded by URL in the browser and by folder path in tests.

## How job content is chosen
- One CV entry per **role** (a company with 3 roles becomes 3 entries: "Enterprise / Position / dates").
- Content comes from `content/experiences.{en,pt}.ts`, keyed by the experience `name` of that language (see `data-and-i18n.md`: the PT data renames the school to "Escola Estadual de Ouro Preto"). `roles[]` is aligned by index with the roles of the experience.
- Per role: `bullets` ordered from the most to the least valuable, and `technologies` (rendered as plain text, never as a bullet, most valuable first).
- Optional `company` (long/legal name shown in the CV) and `hidden: true` (keep the experience out of the CV).
- Without an entry, the experience still appears, using the portfolio `achievements` (only under its most recent role) and no technologies line. This is a fallback; write CV content for every experience.

## Fitting rules (`DEFAULT_FIT_OPTIONS`)
`maxBullets: 3` (only the 3 best bullets of each job), `minBullets: 2`, `maxPages: 2`. If it still exceeds 2 pages, the oldest jobs lose bullets first (down to `minBullets`, then to 1). Each job block is never split across pages.

## Writing CV bullets
Verb + result, with numbers whenever they exist (80%, 5x, 70+, 99%, 60%, 20+). Put the number-bearing and most valuable bullet first. Never invent metrics; ask the owner. Keep the ATS keywords in the technologies line.

## Tests
`tests/cv/` checks the model, the fitting algorithm and that both PDFs render with at most 2 pages. To inspect the PDFs: `CV_OUT_DIR=/some/dir npx vitest run tests/cv` writes them there; view them with `pdftoppm -png` and read the text with `pdftotext -layout`.
