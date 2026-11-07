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
        className="flex flex-col items-center pb-20 sm:pb-32"
        fitContent
      >
        <TitleAndSubtitleSection
          title={t("certifications.title")}
          subtitle={rich("certifications.subtitle")}
        >
          <div className="flex flex-row flex-wrap items-stretch justify-center gap-6">
            {certifications.map((certification, index) => (
              <Certification key={index} {...certification} />
            ))}
          </div>
        </TitleAndSubtitleSection>
      </SectionTemplate>
    </>
  );
}
