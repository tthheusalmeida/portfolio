import type { Metadata } from "next";
import { Lang } from "@/i18n/dictionary";
import { SITE_URL, absoluteUrl } from "@/i18n/routes";

const KEYWORDS = [
  "Matheus Almeida",
  "Frontend",
  "Software Engineer",
  "Desenvolvedor Frontend",
  "Frontend Developer",
  "Vue",
  "React",
  "Tailwind",
  "JavaScript",
  "TypeScript",
  "Next.js",
  "HTML",
  "CSS",
  "Express",
  "MongoDB",
  "Firebase",
  "Programador Frontend",
  "Engenheiro de Software",
  "Web Developer",
  "Micro-SaaS",
  "UI Developer",
  "Developer Portfolio",
  "Portfólio",
];

const TEXTS = {
  pt: {
    homeTitle:
      "Matheus Almeida - Engenheiro de Software Front-End | Vue, React, Tailwind",
    homeDescription:
      "Engenheiro de Software Front-End especialista em Vue, React, TypeScript, Tailwind, Node.js e Firebase. Transformo ideias em experiências digitais modernas, acessíveis e de alto desempenho.",
    projectsTitle: "Projetos",
    projectsDescription:
      "Projetos freelance, pessoais e voluntários de Matheus Almeida, engenheiro de software front-end: Vue, React, Next.js, Node.js e mais.",
    locale: "pt_BR",
    hreflang: "pt-BR",
  },
  en: {
    homeTitle:
      "Matheus Almeida - Software Engineer Front End | Vue, React, Tailwind",
    homeDescription:
      "Software Engineer Front-End specialized in Vue, React, TypeScript, Tailwind, Node.js and Firebase. I transform ideas into modern, accessible, and high-performance digital experiences.",
    projectsTitle: "Projects",
    projectsDescription:
      "Freelance, personal and pro bono projects by Matheus Almeida, front-end software engineer: Vue, React, Next.js, Node.js and more.",
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
  pt: "Engenheiro de Software Front-End",
  en: "Front-End Software Engineer",
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
      "Vue.js",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Firebase",
    ],
    sameAs: [
      "https://www.linkedin.com/in/dev-almeida-matheus/",
      "https://github.com/tthheusalmeida",
    ],
  };
}
