import { DATA_BY_LANG } from "@/data";
import { dictionary, type Lang } from "@/i18n/dictionary";
import { EXPERIENCE_CONTENT } from "../content/experienceContent";
import { CV_LABELS } from "../content/labels";
import { CV_PROFILE } from "../content/profile";
import type { CvModel } from "../types";
import { buildCertifications } from "./buildCertifications";
import { buildEducation } from "./buildEducation";
import { buildJobs } from "./buildJobs";
import { yearsOfExperience } from "./yearsOfExperience";

// Single entry point that turns the portfolio data into a CV model.
export function buildCvModel(lang: Lang, now: Date = new Date()): CvModel {
  const data = DATA_BY_LANG[lang];
  const dict = dictionary[lang];
  const profile = CV_PROFILE[lang];
  const labels = CV_LABELS[lang];
  const years = String(yearsOfExperience(data.experiences, now));

  return {
    lang,
    fileName: profile.fileName,
    labels,
    contact: profile.contact,
    summary: profile.summary.map((p) => p.replaceAll("{years}", years)),
    mainResults: profile.mainResults,
    jobs: buildJobs(
      data.experiences,
      EXPERIENCE_CONTENT[lang],
      dict["date.present"],
      labels.periodSeparator,
      lang,
    ),
    education: buildEducation(
      data.educations,
      dict["education.inProgress"],
      labels,
      lang,
    ),
    languages: profile.languages,
    certifications: buildCertifications(data.certifications, lang),
  };
}
