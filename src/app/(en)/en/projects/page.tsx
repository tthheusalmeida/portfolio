import ProjectsTemplate from "@/templates/ProjectsTemplate";
import { pageMetadata } from "@/seo/metadata";

export const metadata = pageMetadata("en", "/projects");

export default function Projects() {
  return <ProjectsTemplate />;
}
