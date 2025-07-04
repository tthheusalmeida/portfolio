import { mergeClassNames } from "@/utils/classNames";
import SocialMedia from "./SocialMedia";

interface CheckOutMyProps {
  className?: string;
}

export default function CheckOutMy({ className }: CheckOutMyProps) {
  return (
    <div
      className={mergeClassNames(
        "flex sm:flex-row flex-col items-center gap-4",
        className
      )}
    >
      <span className="text-base">Check out my</span>

      <div className="hidden sm:block w-32 border border-gray-200 h-0 rounded-full" />

      <SocialMedia svgClassName="bg-transparent hover:border-transparent border-none" />
    </div>
  );
}
