import { mergeClassNames } from "@/utils/classNames";
import AnimatedComponent from "../molecules/AnimatedComponent";

interface TitleProps {
  children?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}

export default function Title({ children, className, as = "h1" }: TitleProps) {
  return (
    <AnimatedComponent
      className={mergeClassNames(
        "text-4xl sm:text-6xl font-bold text-center sm:text-left",
        className
      )}
      HTMLtag={as}
    >
      {children}
    </AnimatedComponent>
  );
}
