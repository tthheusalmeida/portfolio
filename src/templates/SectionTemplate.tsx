import { mergeClassNames } from "@/utils/classNames";

interface SectionTemplateProps {
  children: React.ReactNode;
  className?: string;
  showBackgroundCoding?: boolean;
}

export default function SectionTemplate({
  children,
  className,
}: SectionTemplateProps) {
  return (
    <div
      className={mergeClassNames(" min-h-screen w-full pt-16 pb-8", className)}
    >
      {children}
    </div>
  );
}
