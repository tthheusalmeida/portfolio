# Testing, checks and deploy

## Commands
| Command | Use |
|---|---|
| `npm run dev` | Dev server (`next dev --turbopack`) |
| `npm test` | Vitest (`tests/**/*.test.ts`) |
| `npx tsc --noEmit` | Type check |
| `npm run lint` | ESLint |
| `npm run build` | Static export to `out/` |

## Important: dev server and build
The owner usually has `next dev` running. `next build` writes to the same `.next/` folder and breaks the dev server. Before any build run `pgrep -af "next dev"`; if it is running, verify with `tsc`, `lint` and `vitest` instead, or ask the owner to stop it. If a build was run by mistake: stop dev, `rm -rf .next`, start dev again.

## Tests (`tests/`)
- `i18n.test.ts`: Portuguese data aligned with English (item counts, achievements, education activities), same dictionary keys in every language, route helpers, copyright years.
- `seo.test.ts`: metadata and structured data.
- `cv/`: CV model, fitting algorithm, PDF rendering and the browser download (`downloadCv.test.ts`), see `cv-generation.md`.
- `components/`: components with JavaScript interaction, using Testing Library and jsdom: `DownloadCvButton` (language, busy state, error toast), `Form` (validation, success, failure + WhatsApp fallback, PT/EN) and `Modal` (dialog semantics, focus trap, Escape, focus return).
- `utils/`: helpers such as `whatsapp.ts`.

## How to write a component test
- Files are `tests/**/*.test.{ts,tsx}`. Component tests start with `// @vitest-environment jsdom` (other tests run in Node) and call `afterEach(cleanup)`.
- Wrap the component in `<LanguageProvider lang="en">` and read expected texts from `dictionary[lang]` instead of hard-coding them.
- Mock the boundaries (`@/services/sendEmail`, `@/cv/downloadCv`, the `Toast` module), never the component under test. Use `userEvent`.
- jsdom is pinned to v25 because newer versions need a newer Node than the one in use (18).

`vitest.config.ts` aliases `@` to `src` and uses automatic JSX (the app's tsconfig keeps `jsx: preserve` for Next).

## Commits
Conventional style used in the history: `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`, with a short imperative summary.

## Deploy
See `architecture.md` (Deploy). The workflow needs the GitHub secrets for Firebase and FTP; never remove them.
