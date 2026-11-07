import { mergeClassNames } from "@/utils/classNames";

interface SectionTemplateProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  noPaddingInline?: boolean;
  isTranparentBackgroud?: boolean;
  // Height follows the content instead of filling a whole screen. For short
  // sections, which would otherwise leave a big empty gap around them.
  fitContent?: boolean;
}

export default function SectionTemplate({
  children,
  id,
  className,
  noPaddingInline = false,
  isTranparentBackgroud = false,
  fitContent = false,
}: SectionTemplateProps) {
  return (
    <div
      className={mergeClassNames(
        "w-full pt-16",
        fitContent ? "pb-20 sm:pb-28" : "min-h-screen pb-8",
        noPaddingInline ? "" : "px-4",
        isTranparentBackgroud ? "" : "bg-[var(--color-background)]",
        className
      )}
      id={id}
    >
      {children}
    </div>
  );
}
