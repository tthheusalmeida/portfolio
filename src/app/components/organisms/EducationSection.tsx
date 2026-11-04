"use client";

import SectionTemplate from "@/templates/SectionTemplate";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import Education from "../molecules/Education";
import { useLanguage, useData } from "@/contexts/LanguageContext";

export default function EducationSection() {
  const { t, rich } = useLanguage();
  const educations = useData().educations;

  return (
    <>
      <SectionTemplate
        id="education"
        className="flex flex-col items-center justify-center"
      >
        <TitleAndSubtitleSection
          title={t("education.title")}
          subtitle={rich("education.subtitle")}
        >
          <div className="flex flex-col gap-14 sm:gap-16">
            {educations.map((education, index) => (
              <Education key={index} {...education} />
            ))}
          </div>
        </TitleAndSubtitleSection>
      </SectionTemplate>
    </>
  );
}
