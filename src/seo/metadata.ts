import type { Metadata } from "next";
import { Lang } from "@/i18n/dictionary";
import { SITE_URL, absoluteUrl } from "@/i18n/routes";

const KEYWORDS = [
  "Matheus Almeida",
  "Full Stack",
  "DevOps",
  "Software Engineer",
  "Full Stack Developer",
  "Desenvolvedor Full Stack",
  "DevOps Engineer",
  "TypeScript",
  "Node.js",
  "Vue",
  "React",
  "Next.js",
  "Firebase",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
  "CI/CD",
  "AWS",
  "GCP",
  "Observabilidade",
  "Engenheiro de Software",
  "Engenheiro Full Stack",
  "Web Developer",
  "Micro-SaaS",
  "UI Developer",
  "Developer Portfolio",
  "Portfólio",
];

const TEXTS = {
  pt: {
    homeTitle:
      "Matheus Almeida - Engenheiro de Software Full Stack & DevOps | TypeScript, Node.js, React",
    homeDescription:
      "Engenheiro de Software Full Stack & DevOps com TypeScript, Node.js, React, PostgreSQL, Docker e CI/CD na AWS e GCP. Construo, entrego e opero software com monitoramento e visão de design e negócio.",
    projectsTitle: "Projetos",
    projectsDescription:
      "Projetos freelance, pessoais e voluntários de Matheus Almeida, engenheiro de software full stack e DevOps: TypeScript, Node.js, React, PostgreSQL e mais.",
    locale: "pt_BR",
    hreflang: "pt-BR",
  },
  en: {
    homeTitle:
      "Matheus Almeida - Full Stack & DevOps Software Engineer | TypeScript, Node.js, React",
    homeDescription:
      "Full Stack & DevOps Software Engineer working with TypeScript, Node.js, React, PostgreSQL, Docker and CI/CD on AWS and GCP. I build, ship and run software with monitoring and a design and business mindset.",
    projectsTitle: "Projects",
    projectsDescription:
      "Freelance, personal and pro bono projects by Matheus Almeida, full stack and DevOps software engineer: TypeScript, Node.js, React, PostgreSQL and more.",
    locale: "en_US",
    hreflang: "en",
  },
} as const;

// Static metadata shared by every page of a language (root layout).
export function layoutMetadata(lang: Lang): Metadata {
  const text = TEXTS[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: text.homeTitle,
      template: "%s | Matheus Almeida",
    },
    description: text.homeDescription,
    authors: [{ name: "Matheus Almeida", url: SITE_URL }],
    creator: "Matheus Almeida",
    publisher: "Matheus Almeida",
    robots: { index: true, follow: true },
    keywords: KEYWORDS,
    icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
    category: "technology",
    classification: "Software Engineer",
    applicationName: "Matheus Almeida Portfolio",
    verification: {
      google: "zLhULd-U4o_BOSFwid6TZQZacqB-hte1fgytIbGqVMY",
    },
  };
}

// Per-page metadata: canonical + hreflang alternates so each language is
// indexed (and found) separately.
export function pageMetadata(lang: Lang, path: "/" | "/projects"): Metadata {
  const text = TEXTS[lang];
  const isHome = path === "/";
  const title = isHome ? text.homeTitle : text.projectsTitle;
  const description = isHome ? text.homeDescription : text.projectsDescription;
  const url = absoluteUrl(lang, path);

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": absoluteUrl("pt", path),
        en: absoluteUrl("en", path),
        "x-default": absoluteUrl("pt", path),
      },
    },
    openGraph: {
      title: isHome ? title : `${title} | Matheus Almeida`,
      description,
      url,
      siteName: "Matheus Almeida",
      locale: text.locale,
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      type: "website",
    },
  };
}

const JOB_TITLE = {
  pt: "Engenheiro de Software Full Stack & DevOps",
  en: "Full Stack & DevOps Software Engineer",
} as const;

export function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matheus Almeida",
    url: absoluteUrl(lang, "/"),
    jobTitle: JOB_TITLE[lang],
    inLanguage: TEXTS[lang].hreflang,
    knowsAbout: [
      "TypeScript",
      "Node.js",
      "Vue.js",
      "React",
      "Next.js",
      "Firebase",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "AWS",
      "Google Cloud",
    ],
    sameAs: [
      "https://www.linkedin.com/in/dev-almeida-matheus/",
      "https://github.com/tthheusalmeida",
    ],
  };
}
