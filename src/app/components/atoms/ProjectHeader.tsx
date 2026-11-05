"use client";

import { mergeClassNames } from "@/utils/classNames";
import { useLanguage } from "@/contexts/LanguageContext";
import { DictionaryKey } from "@/i18n/dictionary";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectHeaderProps {
  categories?: Array<string>;
  className?: string;
  link?: string;
  title: string;
}

export default function ProjectHeader({
  categories,
  className,
  link,
  title,
}: ProjectHeaderProps) {
  const { t } = useLanguage();

  return (
    <div
      className={mergeClassNames(
        "flex justify-between gap-2 bg-stone-800",
        className,
      )}
    >
      <div className="flex gap-2 py-2 px-3 text-sm sm:text-base text-gray-200">
        {categories?.map((category) => (
          <span key={category}>
            {t(`projects.category.${category}` as DictionaryKey)}
          </span>
        ))}
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="flex items-center px-4 text-[var(--action)] focus-visible:outline-2 focus-visible:outline-[var(--action)]"
      >
        <FaExternalLinkAlt size={18} aria-hidden />
      </a>
    </div>
  );
}
