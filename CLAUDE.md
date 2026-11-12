# Portfolio of Matheus Almeida

Bilingual (PT default at `/`, EN at `/en`) personal portfolio: Next.js 15 + React 19 + TypeScript + Tailwind 4, exported as a **static site** (`output: "export"`) and deployed by FTP to Hostinger from GitHub Actions on every push to `main`. No server at runtime.

The portfolio data in `src/data/` also feeds a **CV PDF generated in the browser** when a visitor clicks "Download CV" (`src/cv/`). Updating the portfolio is how the CV stays current.

## Hard rules
1. **Any change to work experiences (add, edit, remove) must also be applied to the CV.** Follow `doc/work-experience-workflow.md` (portfolio data EN + PT, CV content EN + PT, impacts/main results when relevant, then verify).
2. Do only what was asked. Do not change UI copy (`src/i18n/dictionary.ts`), colors or services unasked; propose and wait.
3. Never run `next build` while `next dev` is running (it corrupts `.next/`). Check `pgrep -af "next dev"`; verify with `npx tsc --noEmit`, `npm run lint` and `npm test` instead.
4. Never invent metrics, tools or dates for the CV or the portfolio; ask.
5. Code, comments and docs are in English; the owner talks in Portuguese.
6. Portuguese data in `src/data/pt.ts` is matched to the English data **by index**; keep order and lengths identical.
7. Commits: conventional style (`feat:`, `fix:`, `chore:`, `docs:`), only when asked.

## Where to read (read only what the task needs)
| If the task is about... | Read |
|---|---|
| Stack, static export, routing, languages, folder map, deploy | `doc/architecture.md` |
| Portfolio content, `pt.ts` overrides, dictionary, experience model | `doc/data-and-i18n.md` |
| UI components, atomic layers, dialogs/focus, contact form and WhatsApp fallback, toasts, styling, the CV button | `doc/components.md` |
| The CV: layers, content files, fitting to 2 pages, fonts, writing bullets | `doc/cv-generation.md` |
| Adding or changing a work experience (checklist) | `doc/work-experience-workflow.md` |
| Commands, tests (incl. how to write component tests), dev server vs build, commits, deploy secrets | `doc/testing-and-deploy.md` |

## Quick map
- `src/data/` content (EN) + `pt.ts` (PT) -> `DATA_BY_LANG` -> `useData()`.
- `src/cv/content/` CV-only wording: `profile.ts`, `labels.ts`, `experiences.{en,pt}.ts`.
- `src/cv/` pipeline: `buildCvModel` -> `fitToPages` (max 3 bullets/job, 2 pages) -> `@react-pdf/renderer`.
- `public/fonts/carlito/` fonts used by the CV.
- `tests/` Vitest; `tests/cv/` covers the CV.
