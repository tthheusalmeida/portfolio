import ProjectsPreview from "./ProjectsPreview";
import RouterButton from "../atoms/RouterButton";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";
import VIEW from "@/data/view";
import { FaArrowRight } from "react-icons/fa6";

export default function ProjectsSection() {
  const projects = VIEW.projects;

  return (
    <SectionTemplate className="flex flex-col items-center">
      <TitleAndSubtitleSection
        title="Projects"
        subtitle={
          <>
            A reflection of my <span className="font-bold">Growth</span> and{" "}
            <span className="font-bold">Passion</span>
          </>
        }
      >
        <ProjectsPreview projects={projects} />
      </TitleAndSubtitleSection>

      <RouterButton
        path="projects"
        variant="secondary"
        className="max-w-48 mt-20 sm:mt-0"
      >
        See all projects{" "}
        <FaArrowRight className="animate-arrow-bounce" size={18} />
      </RouterButton>
    </SectionTemplate>
  );
}
