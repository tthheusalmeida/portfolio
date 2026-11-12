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
- `cv/`: CV model, fitting algorithm and PDF rendering (see `cv-generation.md`).
`vitest.config.ts` aliases `@` to `src` and uses automatic JSX (the app's tsconfig keeps `jsx: preserve` for Next).

## Commits
Conventional style used in the history: `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`, with a short imperative summary.

## Deploy
See `architecture.md` (Deploy). The workflow needs the GitHub secrets for Firebase and FTP; never remove them.
