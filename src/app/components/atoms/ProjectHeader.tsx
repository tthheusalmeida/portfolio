import { mergeClassNames } from "@/utils/classNames";
import Tag from "./Tag";
import { FaArrowRight } from "react-icons/fa6";

interface ProjectHeaderProps {
  categories?: Array<string>;
  className?: string;
  link?: string;
}

export default function ProjectHeader({
  categories,
  className,
  link,
}: ProjectHeaderProps) {
  return (
    <div
      className={mergeClassNames(
        "flex justify-between gap-2 bg-[var(--color-background)]",
        className
      )}
    >
      <div className="flex justify-between gap-2 py-2 px-1">
        {categories?.map((category, index) => (
          <Tag
            key={index}
            className="border-none text-sm sm:text-base hover:bg-transparent bg-transparent text-gray-200 font-normal"
          >
            {category}
          </Tag>
        ))}
      </div>

      <a href={link} target="_blank" className="flex items-center py-0 px-3">
        <FaArrowRight
          size={20}
          className="sm:block hidden -rotate-45 text-[var(--action)]"
        />
        <FaArrowRight
          size={20}
          className="sm:hidden block -rotate-45 text-[var(--action)]"
        />
      </a>
    </div>
  );
}
