"use client";

import PageLayout from "@/layouts/PageLayout";
import SectionTemplate from "./SectionTemplate";
import TitleAndSubtitleSection from "@/app/components/molecules/TitleAndSubtitleSection";
import Form from "@/app/components/organisms/Form";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactTemplate() {
  const { t, rich } = useLanguage();

  return (
    <PageLayout>
      <SectionTemplate>
        <TitleAndSubtitleSection
          title={t("contact.title")}
          subtitle={rich("contact.subtitle")}
          className="my-16 sm:mt-28 sm:mb-12"
        >
          <div className="w-full flex justify-center">
            <Form />
          </div>
        </TitleAndSubtitleSection>
      </SectionTemplate>
    </PageLayout>
  );
}
