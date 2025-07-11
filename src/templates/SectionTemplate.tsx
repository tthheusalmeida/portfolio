import { mergeClassNames } from "@/utils/classNames";

interface SectionTemplateProps {
  children: React.ReactNode;
  className?: string;
  noPaddingInline?: boolean;
  isTranparentBackgroud?: boolean;
}

export default function SectionTemplate({
  children,
  className,
  noPaddingInline = false,
  isTranparentBackgroud = false,
}: SectionTemplateProps) {
  return (
    <div
      className={mergeClassNames(
        "min-h-screen w-full pt-16 pb-8",
        noPaddingInline ? "" : "px-4",
        isTranparentBackgroud ? "" : "bg-[var(--color-background)]",
        className
      )}
    >
      {children}
    </div>
  );
}
