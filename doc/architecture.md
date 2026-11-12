# Architecture

Personal portfolio of Matheus Almeida, published at https://almeida-matheus.com.

## Stack
- Next.js 15 (App Router, Turbopack in dev), React 19, TypeScript (strict), Tailwind CSS 4.
- `react-hot-toast` for toasts, `react-icons` for icons, `tailwind-merge` for class merging.
- Firebase Analytics only (loaded lazily after the page is idle, see `src/layouts/Providers.tsx`).
- `@react-pdf/renderer` generates the CV PDF in the browser (see `cv-generation.md`).
- Tests: Vitest (`tests/`).

## Static export
`next.config.ts` sets `output: "export"` and `trailingSlash: true`, so the build is plain static files in `out/`.
There is **no server at runtime**: anything dynamic (contact form, CV PDF) runs in the visitor's browser or calls an external service.
- Contact form: `src/services/sendEmail.ts` -> `baseService` (`src/services/base.ts`) posts to an external mail gateway.
- CV PDF: generated client side when the visitor clicks "Download CV".

## Routing and languages
- Portuguese is the default language and lives at the root (`/`, `/projects/`).
- English lives under `/en` (`/en/`, `/en/projects/`).
- Route groups: `src/app/(pt)` and `src/app/(en)/en`. Every page exists in both languages and renders the same templates from `src/templates/`.
- `src/i18n/routes.ts` has the helpers (`localizedPath`, `stripLocale`, `absoluteUrl`) and the `PAGES` list used by the sitemap.
- SEO: `src/seo/metadata.ts` (metadata per page/language), `src/seo/JsonLd.tsx` (structured data), `src/app/sitemap.ts`, `src/app/robots.ts`.

## Folder map (`src/`)
| Folder | Purpose |
|---|---|
| `app/` | Routes and the component library (`app/components/{atoms,molecules,organisms}`) |
| `templates/` | Page-level compositions (`HomeTemplate`, `ProjectsTemplate`, ...) |
| `layouts/` | Root shell, providers, fonts, page layout |
| `contexts/` | `LanguageContext` (`useLanguage`, `useData`) and `TabsContext` |
| `data/` | Portfolio content (English) and `pt.ts` (Portuguese overrides) |
| `i18n/` | UI dictionary (`dictionary.ts`) and route helpers |
| `cv/` | CV generator (data -> PDF) |
| `services/` | Firebase and the mail gateway |
| `seo/` | Metadata and JSON-LD |
| `utils/`, `hooks/` | Small helpers |

Other folders: `public/` (images, `fonts/carlito` used by the CV, `.htaccess` for Apache), `tests/`, `doc/`.

## Deploy
`.github/workflows/deploy.yml`: on every push to `main` it runs `npm ci`, `npm run build` (with the Firebase secrets) and uploads `out/` by FTP to Hostinger with `dangerous-clean-slate: true` (the server folder is wiped on every deploy, so removed files disappear from production).
