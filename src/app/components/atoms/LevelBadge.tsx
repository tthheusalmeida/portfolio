"use client";

import { mergeClassNames } from "@/utils/classNames";
import { useLanguage } from "@/contexts/LanguageContext";
import { EducationLevel } from "@/data/education";
import { DictionaryKey } from "@/i18n/dictionary";

interface LevelBadgeProps {
  level: EducationLevel;
  className?: string;
}

// Postgraduate uses the action color; undergraduate stays neutral.
export default function LevelBadge({ level, className }: LevelBadgeProps) {
  const { t } = useLanguage();

  return (
    <span
      className={mergeClassNames(
        "inline-block px-2.5 py-1 rounded",
        "text-xs font-bold uppercase tracking-wider",
        level === "postgraduate"
          ? "bg-[var(--action)] text-[var(--background)]"
          : "border border-white/25 text-[var(--foreground)]/80",
        className,
      )}
    >
      {t(`education.level.${level}` as DictionaryKey)}
    </span>
  );
}
