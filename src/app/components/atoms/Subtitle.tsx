import { mergeClassNames } from "@/utils/classNames";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Subtitle({ children, className }: SubtitleProps) {
  return (
    <h2 className={mergeClassNames("text-base font-normal", className)}>
      {children}
    </h2>
  );
}
