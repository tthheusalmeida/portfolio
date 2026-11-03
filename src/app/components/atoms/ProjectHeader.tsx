"use client";

import { mergeClassNames } from "@/utils/classNames";
import { useLanguage } from "@/contexts/LanguageContext";
import { DictionaryKey } from "@/i18n/dictionary";
import Tag from "./Tag";
import { FaExternalLinkAlt } from "react-icons/fa";

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
  const { t } = useLanguage();

  return (
    <div
      className={mergeClassNames(
        "flex justify-between gap-2 bg-stone-800",
        className
      )}
    >
      <div className="flex justify-between gap-2 py-2 px-1">
        {categories?.map((category, index) => (
          <Tag
            key={index}
            className="border-none text-sm sm:text-base hover:bg-transparent bg-transparent text-gray-200 font-normal"
          >
            {t(`projects.category.${category}` as DictionaryKey)}
          </Tag>
        ))}
      </div>

      <a href={link} target="_blank" className="flex items-center py-0 px-4">
        <FaExternalLinkAlt
          size={18}
          className="sm:block hidden text-[var(--action)]"
        />
        <FaExternalLinkAlt
          size={18}
          className="sm:hidden block text-[var(--action)]"
        />
      </a>
    </div>
  );
}
