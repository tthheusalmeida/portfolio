import ProjectsTemplate from "@/templates/ProjectsTemplate";
import { pageMetadata, projectsJsonLd } from "@/seo/metadata";
import JsonLd from "@/seo/JsonLd";

export const metadata = pageMetadata("en", "/projects");

export default function Projects() {
  return (
    <>
      <JsonLd data={projectsJsonLd("en")} />
      <ProjectsTemplate />
    </>
  );
}
