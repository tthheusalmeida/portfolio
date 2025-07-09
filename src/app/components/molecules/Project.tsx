import { mergeClassNames } from "@/utils/classNames";
import Tag from "../atoms/Tag";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import AnimatedComponent from "./AnimatedComponent";

export type Category = "personal" | "freelancer" | "probono";

export interface ProjectProps {
  className?: string;
  title: string;
  about: string;
  technologies: Array<string>;
  image: string;
  link: string;
  categories?: Array<Category>;
}

export default function Project({
  className,
  title,
  about,
  technologies,
  image,
  link,
}: // categories,
ProjectProps) {
  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames(
        "relative w-full h-60 sm:h-96 group drop-shadow-[0_0_16px_var(--background)]",
        className
      )}
    >
      <div className="relative w-full h-60 sm:h-96 overflow-hidden rounded-2xl bg-[var(--background)]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="auto"
          className={mergeClassNames(
            "object-cover object-center group-hover:scale-105",
            "transition-transform duration-200 rounded-2xl"
          )}
        />

        <div
          className={mergeClassNames(
            "absolute top-0 left-0 opacity-100 sm:opacity-0",
            "flex flex-col gap-2 sm:gap-4 justify-between bg-[var(--color-background)]/80",
            "w-full h-full p-4 sm:p-4 rounded-2xl",
            "sm:hover:opacity-100 transition-opacity duration-400"
          )}
        >
          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-lg sm:text-2xl font-semibold sm:font-bold max-w-[65%]">
                {title}
              </h3>
              <a
                href={link}
                target="_blank"
                className="flex gap-2 items-center"
              >
                <span className="text-xs sm:text-base">See project</span>
                <FaArrowRight
                  size={18}
                  className="mb-0.5 sm:block hidden -rotate-45"
                />
                <FaArrowRight
                  size={16}
                  className="mb-0.5 sm:hidden block -rotate-45"
                />
              </a>
            </div>

            <p className="text-xs sm:text-base font-normal text-justify pt-2 sm:pt-4 mx-auto">
              {about}
            </p>
          </div>

          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {technologies.map((item, index) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </div>
        </div>
      </div>
    </AnimatedComponent>
  );
}
