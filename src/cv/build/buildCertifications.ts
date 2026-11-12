import type { Lang } from "@/i18n/dictionary";
import type { CertificationInterface } from "@/data/certification";
import type { CvCertification } from "../types";
import { formatedDateMonthYear } from "@/utils/date";

export function buildCertifications(
  certifications: ReadonlyArray<CertificationInterface>,
  lang: Lang,
): Array<CvCertification> {
  return certifications.map((certification) => ({
    title: certification.title,
    issuer: certification.issuer.name,
    date: formatedDateMonthYear(certification.date, lang),
  }));
}
