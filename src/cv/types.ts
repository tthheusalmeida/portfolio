import type { Lang } from "@/i18n/dictionary";

// Language-agnostic, render-agnostic description of a CV. The builders produce
// it, the fitter trims it and the PDF layer draws it.

export interface CvContact {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  portfolio: string;
  availability: string;
  objective: string;
}

// One entry per role (a company with three roles becomes three entries), the
// way ATS parsers expect to read a work history.
export interface CvJob {
  company: string;
  position: string;
  period: string;
  // Ordered from the most to the least relevant.
  bullets: Array<string>;
  technologies: Array<string>;
}

export interface CvEducation {
  title: string;
  institution: string;
  period: string;
}

export interface CvCertification {
  title: string;
  issuer: string;
  date: string;
}

export interface CvLanguage {
  name: string;
  level: string;
}

export interface CvLabels {
  summary: string;
  mainResults: string;
  education: string;
  languages: string;
  experience: string;
  certifications: string;
  enterprise: string;
  position: string;
  technologies: string;
  periodSeparator: string;
  contact: string;
  email: string;
  portfolio: string;
  objective: string;
  country: string;
  levelUndergraduate: string;
  levelPostgraduate: string;
}

export interface CvModel {
  lang: Lang;
  fileName: string;
  labels: CvLabels;
  contact: CvContact;
  summary: Array<string>;
  mainResults: Array<string>;
  jobs: Array<CvJob>;
  education: Array<CvEducation>;
  languages: Array<CvLanguage>;
  certifications: Array<CvCertification>;
}
