"use client";

import SectionTemplate from "@/templates/SectionTemplate";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import Form from "@/app/components/organisms/Form";
import Footer from "./Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTASection() {
  const { t, rich } = useLanguage();

  return (
    <>
      <SectionTemplate
        id="contact"
        className="flex flex-col justify-between min-h-0"
      >
        <TitleAndSubtitleSection
          title={t("contact.title")}
          subtitle={rich("contact.subtitle")}
          className="my-16 sm:mt-28 sm:mb-12"
        >
          <div className="w-full flex justify-center">
            <Form />
          </div>
        </TitleAndSubtitleSection>

        <Footer className="mt-24" />
      </SectionTemplate>
    </>
  );
}
