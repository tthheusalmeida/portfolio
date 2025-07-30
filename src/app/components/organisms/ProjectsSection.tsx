import ProjectsPreview from "./ProjectsPreview";
// import RouterButton from "../atoms/RouterButton";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";
import VIEW from "@/data/view";
// import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../atoms/HighlightText";

export default function ProjectsSection() {
  const projects = VIEW.projects;

  return (
    <SectionTemplate className="flex flex-col items-center sm:rounded-t-2xl">
      <TitleAndSubtitleSection
        title="Projects"
        subtitle={
          <>
            A reflection of my <HighlightText>Growth</HighlightText> and{" "}
            <HighlightText>Passion</HighlightText>
          </>
        }
      >
        <ProjectsPreview projects={projects} />
      </TitleAndSubtitleSection>

      {/* <RouterButton
        path="projects"
        variant="primary"
        className="max-w-48 mt-20 sm:mt-0"
      >
        See all projects
        <FaArrowRight className="animate-arrow-bounce" size={18} />
      </RouterButton> */}
    </SectionTemplate>
  );
}
