import type { Lang } from "@/i18n/dictionary";
import type { EducationInterface, EducationLevel } from "@/data/education";
import type { CvEducation, CvLabels } from "../types";
import { formatPeriod } from "./formatPeriod";

type EducationLabels = Pick<
  CvLabels,
  "country" | "levelUndergraduate" | "levelPostgraduate"
>;

const LEVEL_LABEL: Record<EducationLevel, (labels: EducationLabels) => string> = {
  undergraduate: (labels) => labels.levelUndergraduate,
  postgraduate: (labels) => labels.levelPostgraduate,
};

// Education periods read better with a dash ("Jul 2026 – In progress").
const EDUCATION_PERIOD_SEPARATOR = "–";

// "Computer Science – B.Sc. | UFOP – Universidade Federal de Ouro Preto, Brazil"
export function buildEducation(
  educations: ReadonlyArray<EducationInterface>,
  inProgressLabel: string,
  labels: EducationLabels,
  lang: Lang,
): Array<CvEducation> {
  return educations.map(({ university, ...education }) => ({
    title: `${education.title} – ${LEVEL_LABEL[education.level](labels)}`,
    institution: `${university.abbreviation} – ${university.originalName || university.name}, ${labels.country}`,
    period: formatPeriod(
      education.start,
      education.end,
      inProgressLabel,
      EDUCATION_PERIOD_SEPARATOR,
      lang,
    ),
  }));
}
