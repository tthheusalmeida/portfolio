import Image from "next/image";
import { mergeClassNames } from "@/utils/classNames";
import { BiSolidQuoteRight } from "react-icons/bi";

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
    <div
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
            className="rounded-full"
          />
        )}

        <div>
          <p className="font-normal text-base">
            <BiSolidQuoteRight
              size={20}
              className="inline-block rotate-180 text-orange-300 mr-2"
            />
            {description}
            <BiSolidQuoteRight
              size={20}
              className="inline-block text-orange-300 ml-2"
            />
          </p>

          <span className="pt-6 font-normal text-xs block italic">
            — {label}, {role}
          </span>
        </div>
      </div>
    </div>
  );
}
