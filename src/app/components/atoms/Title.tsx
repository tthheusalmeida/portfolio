import { mergeClassNames } from "@/utils/classNames";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={mergeClassNames("text-4xl sm:text-6xl font-bold", className)}
    >
      {children}
    </h1>
  );
}
