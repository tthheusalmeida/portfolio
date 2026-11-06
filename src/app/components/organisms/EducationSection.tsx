"use client";

import SectionTemplate from "@/templates/SectionTemplate";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import EducationAccordion from "./EducationAccordion";
import { useLanguage, useData } from "@/contexts/LanguageContext";

export default function EducationSection() {
  const { t, rich } = useLanguage();
  // Postgraduate first: it is the highest and most recent level.
  const educations = [...useData().educations].sort(
    (a, b) =>
      Number(b.level === "postgraduate") - Number(a.level === "postgraduate"),
  );

  return (
    <SectionTemplate
      id="education"
      className="flex flex-col items-center justify-center"
    >
      <TitleAndSubtitleSection
        title={t("education.title")}
        subtitle={rich("education.subtitle")}
      >
        <div className="mt-11 w-full">
          <EducationAccordion educations={educations} />
        </div>
      </TitleAndSubtitleSection>
    </SectionTemplate>
  );
}
