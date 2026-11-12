import type { Lang } from "@/i18n/dictionary";
import { EXPERIENCE_CONTENT_EN } from "./experiences.en";
import { EXPERIENCE_CONTENT_PT } from "./experiences.pt";

// The CV wording is written for ATS and recruiters, so it can differ from the
// portfolio text. An experience without an entry here still shows up in the
// CV, using the achievements written for the portfolio.

export interface CvRoleContent {
  // Written in the order they should be kept when space runs out.
  bullets: Array<string>;
  technologies?: Array<string>;
}

export interface CvExperienceContent {
  // Legal/long company name, when it differs from the portfolio name.
  company?: string;
  // Keeps the experience on the portfolio but out of the CV.
  hidden?: boolean;
  // Aligned by index with the roles of the experience (most recent first).
  roles: Array<CvRoleContent>;
}

// Keyed by the experience name in `src/data/experience.ts`.
export type CvExperienceContentMap = Record<string, CvExperienceContent>;

export const EXPERIENCE_CONTENT: Record<Lang, CvExperienceContentMap> = {
  en: EXPERIENCE_CONTENT_EN,
  pt: EXPERIENCE_CONTENT_PT,
};
