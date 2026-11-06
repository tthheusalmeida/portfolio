import type { Metadata } from "next";
import { Lang } from "@/i18n/dictionary";
import { SITE_URL, absoluteUrl } from "@/i18n/routes";
import { DATA_BY_LANG } from "@/data";

const OG_IMAGE = { path: "/og-image.jpg", width: 1200, height: 630 } as const;
const PERSON_ID = `${SITE_URL}/#person`;
const PERSON_NAME = "Matheus Almeida";
const PERSON_EMAIL = "dev.almeida.matheus@gmail.com";

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
      "Matheus Almeida - Engenheiro de Software Full Stack & DevOps",
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
      "Matheus Almeida - Full Stack & DevOps Software Engineer",
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
  const socialTitle = isHome ? title : `${title} | Matheus Almeida`;
  const image = {
    url: OG_IMAGE.path,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    alt: `${PERSON_NAME} - ${JOB_TITLE[lang]}`,
  };

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
      title: socialTitle,
      description,
      url,
      siteName: "Matheus Almeida",
      locale: text.locale,
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

const JOB_TITLE = {
  pt: "Engenheiro de Software Full Stack & DevOps",
  en: "Full Stack & DevOps Software Engineer",
} as const;

const SAME_AS = [
  "https://www.linkedin.com/in/dev-almeida-matheus/",
  "https://github.com/tthheusalmeida",
];

const KNOWS_ABOUT = [
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
];

// Universities are listed once, even when there is more than one degree.
function alumniOf() {
  const names = new Set(
    DATA_BY_LANG.en.educations.map(({ university }) => university.originalName),
  );
  return Array.from(names, (name) => ({
    "@type": "CollegeOrUniversity",
    name,
  }));
}

// Site-wide graph (every page): the person and the website, linked by @id so
// the structured data of each page can point at them.
export function siteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PERSON_NAME,
        url: absoluteUrl(lang, "/"),
        image: `${SITE_URL}${OG_IMAGE.path}`,
        email: PERSON_EMAIL,
        jobTitle: JOB_TITLE[lang],
        knowsAbout: KNOWS_ABOUT,
        alumniOf: alumniOf(),
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl(lang, "/")}#website`,
        url: absoluteUrl(lang, "/"),
        name: "Matheus Almeida",
        inLanguage: TEXTS[lang].hreflang,
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

// Home: the page is a profile of the person.
export function profilePageJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(lang, "/")}#profile`,
    url: absoluteUrl(lang, "/"),
    name: TEXTS[lang].homeTitle,
    description: TEXTS[lang].homeDescription,
    inLanguage: TEXTS[lang].hreflang,
    mainEntity: { "@id": PERSON_ID },
  };
}

// Projects page: one item per project, built from the same data as the page.
export function projectsJsonLd(lang: Lang) {
  const url = absoluteUrl(lang, "/projects");

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#projects`,
    url,
    name: TEXTS[lang].projectsTitle,
    description: TEXTS[lang].projectsDescription,
    inLanguage: TEXTS[lang].hreflang,
    author: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: DATA_BY_LANG[lang].projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.about.replace(/\s+/g, " ").trim(),
          url: project.link,
          image: `${SITE_URL}${project.image}`,
          keywords: project.technologies.join(", "),
          author: { "@id": PERSON_ID },
        },
      })),
    },
  };
}
