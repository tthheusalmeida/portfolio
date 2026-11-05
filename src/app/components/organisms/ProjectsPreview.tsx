import { mergeClassNames } from "@/utils/classNames";
import Project, { ProjectProps } from "../molecules/Project";
import { isEven } from "@/utils/math";

export const MAX_PREVIEW_PROJECTS = 6;

interface ProjectsPreviewProps {
  projects: Array<ProjectProps>;
  className?: string;
}

// Each project is rendered once. On desktop they are split into two sticky
// columns (even/odd); on mobile the column wrappers use `display: contents`,
// so every card becomes a child of the same flex column and `order` keeps the
// original sequence.
export default function ProjectsPreview({
  projects,
  className,
}: ProjectsPreviewProps) {
  const entries = projects
    .slice(0, MAX_PREVIEW_PROJECTS)
    .map((project, index) => ({ project, index }));

  const columns = [
    { side: "left", items: entries.filter(({ index }) => isEven(index)) },
    { side: "right", items: entries.filter(({ index }) => !isEven(index)) },
  ] as const;

  return (
    <div
      className={mergeClassNames(
        "relative w-full flex flex-col sm:flex-row",
        className,
      )}
    >
      {columns.map(({ side, items }) => (
        <div
          key={side}
          className={mergeClassNames(
            "contents sm:flex sm:flex-col sm:w-1/2",
            side === "left" ? "sm:items-start sm:pr-4" : "sm:items-end sm:pl-4",
          )}
        >
          {items.map(({ project, index }) => (
            <div
              key={project.title}
              className="sticky top-16 flex w-full mb-12"
              style={{ order: index, zIndex: index }}
            >
              <Project {...project} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
