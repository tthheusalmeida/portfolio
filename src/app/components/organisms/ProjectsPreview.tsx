import { mergeClassNames } from "@/utils/classNames";
import { ProjectProps } from "../molecules/Project";
import StickyStack from "../molecules/StickyStack";
import { isEven } from "@/utils/math";

interface ProjectsPreviewProps {
  projects: Array<ProjectProps>;
  className?: string;
}

export default function ProjectsPreview({
  projects,
  className,
}: ProjectsPreviewProps) {
  const leftStack = Array<ProjectProps>();
  const rightStack = Array<ProjectProps>();

  projects.forEach((project, index) =>
    isEven(index) ? leftStack.push(project) : rightStack.push(project)
  );

  // TODO remove this for correct projects sizes
  // const height = {
  //   mobileProjectComponent: 240,
  //   desktopProjectComponent: 384,
  //   projectComponentMarginBottom: 48,
  // }
  // const mobileHeight =
  //   2 *
  //   (Math.max(leftStack.length, rightStack.length) *
  //     (height.mobileProjectComponent + height.projectComponentMarginBottom));
  // const desktopHeight =
  //   Math.max(leftStack.length, rightStack.length) *
  //   (height.desktopProjectComponent + height.projectComponentMarginBottom);
  // console.log(`'PROJECT: mobile(${mobileHeight}) desktop(${desktopHeight})`);

  return (
    <div
      className={mergeClassNames(
        "relative w-full flex items-center",
        "h-[1600px] sm:h-[1480px]",
        className
      )}
    >
      <StickyStack
        projects={projects}
        side="middle"
        keyPrefix="middle"
        className="block sm:hidden"
      />

      <StickyStack
        projects={leftStack}
        side="left"
        keyPrefix="left"
        className="hidden sm:block"
      />
      <StickyStack
        projects={rightStack}
        side="right"
        keyPrefix="right"
        className="hidden sm:block"
      />
    </div>
  );
}
