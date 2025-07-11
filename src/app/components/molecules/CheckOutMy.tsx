import { mergeClassNames } from "@/utils/classNames";
import SocialMedia from "./SocialMedia";
import AnimatedComponent from "./AnimatedComponent";

interface CheckOutMyProps {
  className?: string;
}

export default function CheckOutMy({ className }: CheckOutMyProps) {
  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames(
        "flex sm:flex-row flex-col items-center gap-4",
        className
      )}
    >
      <span className="text-base">Check out my</span>

      <div className="hidden sm:block w-32 border border-gray-200 h-0 rounded-full" />

      <SocialMedia svgClassName="hover:border-transparent border-none" />
    </AnimatedComponent>
  );
}
