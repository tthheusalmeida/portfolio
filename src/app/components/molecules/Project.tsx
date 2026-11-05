import { mergeClassNames } from "@/utils/classNames";
import Tag from "../atoms/Tag";
import Image from "next/image";
import AnimatedComponent from "./AnimatedComponent";
import ProjectHeader from "../atoms/ProjectHeader";
import { Category } from "@/data/project";

export interface ProjectProps {
  className?: string;
  title: string;
  about: string;
  technologies: Array<string>;
  image: string;
  link: string;
  categories?: Array<Category>;
}

// Mobile: image on top, details always visible below it.
// Desktop: image fills the card, the title stays visible at the bottom and the
// details slide up on hover/focus. The text is always in the DOM (SEO).
export default function Project({
  className,
  title,
  about,
  technologies,
  image,
  link,
  categories,
}: ProjectProps) {
  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames("relative w-full group", className)}
    >
      <ProjectHeader
        className="rounded-t-2xl"
        categories={categories}
        link={link}
        title={title}
      />

      <div className="relative sm:h-96 overflow-hidden rounded-b-2xl bg-stone-800">
        <div className="relative h-48 sm:absolute sm:inset-0 sm:h-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 sm:group-hover:scale-105 sm:group-focus-within:scale-105 motion-reduce:transition-none"
          />
        </div>

        <div
          aria-hidden
          className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"
        />
        <div
          aria-hidden
          className="hidden sm:block absolute inset-0 bg-black/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        />

        <div className="relative p-4 sm:absolute sm:inset-x-0 sm:bottom-0">
          <h3 className="text-base sm:text-lg text-[var(--action)] font-bold">
            {title}
          </h3>

          <div
            className={mergeClassNames(
              "grid grid-rows-[1fr] sm:grid-rows-[0fr] sm:opacity-0",
              "sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100",
              "sm:group-focus-within:grid-rows-[1fr] sm:group-focus-within:opacity-100",
              "transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="pt-2 sm:pt-3 text-xs sm:text-sm font-normal">
                {about}
              </p>

              <ul className="flex gap-2 flex-wrap mt-4 sm:mt-5 pb-1">
                {technologies.map((item) => (
                  <li key={item} className="flex">
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatedComponent>
  );
}
