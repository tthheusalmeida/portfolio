import ProjectsTemplate from "@/templates/ProjectsTemplate";
import { pageMetadata } from "@/seo/metadata";

export const metadata = pageMetadata("pt", "/projects");

export default function Projects() {
  return <ProjectsTemplate />;
}
