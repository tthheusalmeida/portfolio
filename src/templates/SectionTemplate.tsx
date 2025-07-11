import { mergeClassNames } from "@/utils/classNames";

export default function SectionTemplate({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${mergeClassNames(
        "min-h-screen w-full pt-16 pb-8",
        className
      )}`}
    >
      {children}
    </div>
  );
}
