<h3 align="center">
  <img alt="Portfolio" width="70%" title="#logo" src="https://github.com/tthheusalmeida/portfolio/blob/main/public/cover/me.webp">
  <br>
</h3>

<p align="center">
  <strong>Portfolio</strong> — A personal space to showcase who I am, what I build, and where I've been.
</p>

<p align="center">
  <a href="https://github.com/tthheusalmeida/portfolio/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" target="_blank" />
  </a>
</p>

# 📂 Table of Contents

- [About](#about)
- [Technology Stack](#technology-stack)
- [In Action](#in-action)
- [Getting Started](#getting-started)
- [Updating the Content and the CV](#updating-the-content-and-the-cv)
- [Documentation](#documentation)
- [Environment & Deployment](#environment--deployment)
- [License](#license)

<a id="about"></a>

## 👤 About

This is my personal portfolio, developed to present my professional background, skills, and recent projects. It serves as a hub for recruiters, collaborators, and tech enthusiasts to know more about my work and how to reach me.

- **Bilingual:** Portuguese at `/` and English at `/en`.
- **Static site:** exported with Next.js (`output: "export"`), so there is no server at runtime.
- **CV generated from the portfolio:** the "Download CV" button builds an ATS-friendly PDF (2 pages, in the language of the page) from the same data that feeds the site.
- **Contact form with fallback:** if the e-mail cannot be sent, the visitor can forward the same message (name, e-mail and text) on WhatsApp with one click.

<a id="technology-stack"></a>

## 💻 Technology Stack

The project was built with the following technologies:

- [Next.js](https://nextjs.org/) 15 — React framework, used here as a static export (App Router)
- [React](https://reactjs.org/) 19 — Library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) 4 — Utility-first CSS framework
- [@react-pdf/renderer](https://react-pdf.org/) — Generates the CV PDF in the browser
- [Firebase Analytics](https://firebase.google.com/) — Loaded on demand, after the page is idle
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) — Unit and component tests

<a id="in-action"></a>

## 📸 In Action

You can see the portfolio live at: [almeida-matheus.com](https://almeida-matheus.com/)

<a id="getting-started"></a>

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit and component tests
npm run lint
npm run build      # static export to out/
```

> Do not run `npm run build` while `npm run dev` is running: both write to `.next/` and the dev server breaks.

<a id="updating-the-content-and-the-cv"></a>

## 🧾 Updating the Content and the CV

All content lives in `src/data/` (English) and `src/data/pt.ts` (Portuguese overrides, matched **by index**). The CV wording lives in `src/cv/content/`.

Whenever a **work experience** is added, edited or removed, update both places: the portfolio data (EN and PT) and the CV content (`src/cv/content/experiences.en.ts` and `experiences.pt.ts`). The step-by-step checklist is in [`doc/work-experience-workflow.md`](doc/work-experience-workflow.md).

<a id="documentation"></a>

## 📚 Documentation

| Topic | File |
|---|---|
| Stack, static export, routing, folder map, deploy | [`doc/architecture.md`](doc/architecture.md) |
| Content, Portuguese overrides, dictionary | [`doc/data-and-i18n.md`](doc/data-and-i18n.md) |
| Components, styling, dialogs, contact form | [`doc/components.md`](doc/components.md) |
| CV generation | [`doc/cv-generation.md`](doc/cv-generation.md) |
| Changing a work experience | [`doc/work-experience-workflow.md`](doc/work-experience-workflow.md) |
| Commands, tests, deploy | [`doc/testing-and-deploy.md`](doc/testing-and-deploy.md) |

<a id="environment--deployment"></a>

## ⚙️ Environment & Deployment

The project is deployed via **GitHub Actions** and hosted on **Hostinger via FTP**.

### 🔐 Secrets and Environment

All sensitive data and environment variables are managed using **GitHub Secrets** and injected during the CI/CD process.

**⚠️ Never remove the following GitHub Secrets, as they are essential for deployment:**

- `FTP_HOST`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_PORT`

### 🌱 Build-time Environment Variables

The site is a static export, so these variables are injected at **build time** (the `env` block of `.github/workflows/deploy.yml`) and embedded in the generated files. They are the Firebase Analytics settings, all public by design:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

Every push to `main` builds the site and uploads `out/` by FTP to Hostinger, wiping the server folder first.

<a id="license"></a>

## 📝 License

This project is licensed under the MIT License. See the [license page](https://opensource.org/licenses/MIT) for more information.

---

<h4 align="center">
  Made with ❤️ by <a href="https://www.linkedin.com/in/dev-almeida-matheus/" target="_blank">Matheus Almeida</a>
</h4>
