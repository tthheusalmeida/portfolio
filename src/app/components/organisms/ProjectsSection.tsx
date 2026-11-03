"use client";

import ProjectsPreview from "./ProjectsPreview";
import RouterButton from "../atoms/RouterButton";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";
import { useLanguage, useData } from "@/contexts/LanguageContext";
import { FaArrowRight } from "react-icons/fa6";

const MAX_CARDS = 6;

export default function ProjectsSection() {
  const { t, rich } = useLanguage();
  const projects = useData().projects;

  return (
    <SectionTemplate
      id="projects"
      className="flex flex-col items-center sm:rounded-t-2xl"
    >
      <TitleAndSubtitleSection
        title={t("projects.title")}
        subtitle={rich("projects.subtitle")}
      >
        <ProjectsPreview projects={projects} />
      </TitleAndSubtitleSection>

      {projects.length > MAX_CARDS && (
        <RouterButton
          path="projects"
          variant="primary"
          className="max-w-48 mt-20 sm:mt-0"
        >
          {t("projects.seeAll")}
          <FaArrowRight className="animate-arrow-bounce" size={18} />
        </RouterButton>
      )}
    </SectionTemplate>
  );
}
