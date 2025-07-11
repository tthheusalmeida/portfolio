import Image from "next/image";
import { mergeClassNames } from "@/utils/classNames";
import { BiSolidQuoteRight } from "react-icons/bi";
import AnimatedComponent from "./AnimatedComponent";

interface TestimonialProps {
  label: string;
  src?: string;
  role: string;
  description: string | Array<string>;
}

export default function Testimonial({
  label,
  src,
  role,
  description,
}: TestimonialProps) {
  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames(
        "w-full p-4 rounded",
        "bg-[var(--color-background)]/60 backdrop-blur-3xl"
      )}
    >
      <div className="flex items-start gap-4">
        {src && (
          <Image
            src={src}
            width={56}
            height={56}
            alt={`${label} image`}
            className={mergeClassNames(
              "hidden sm:rounded-full sm:inline-block"
            )}
          />
        )}

        <div className="flex sm:block flex-col w-full sm:w-auto gap-4">
          <BiSolidQuoteRight
            size={32}
            className="inline-block sm:hidden rotate-180 text-orange-300 mr-2"
          />

          <p className="font-normal text-base pt-4 sm:p-0">
            <BiSolidQuoteRight
              size={20}
              className="hidden sm:inline-block rotate-180 text-orange-300 mr-2"
            />
            {description}
            <BiSolidQuoteRight
              size={20}
              className="hidden sm:inline-block text-orange-300 ml-2"
            />
          </p>

          <span className="pt-6 font-normal text-xs block italic">
            — {label}, {role}
          </span>
        </div>
      </div>
    </AnimatedComponent>
  );
}
