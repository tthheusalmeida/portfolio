"use client";

import SectionTemplate from "@/templates/SectionTemplate";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import { useLanguage, useData } from "@/contexts/LanguageContext";
import Certification from "../molecules/Certification";

export default function CertificationSection() {
  const { t, rich } = useLanguage();
  const certifications = useData().certifications;

  return (
    <>
      <SectionTemplate
        id="certification"
        className="flex flex-col items-center justify-center"
      >
        <TitleAndSubtitleSection
          title={t("certifications.title")}
          subtitle={rich("certifications.subtitle")}
        >
          <div className="flex flex-row flex-wrap items-center justify-center">
            {certifications.map((certification, index) => (
              <Certification key={index} {...certification} />
            ))}
          </div>
        </TitleAndSubtitleSection>
      </SectionTemplate>
    </>
  );
}
