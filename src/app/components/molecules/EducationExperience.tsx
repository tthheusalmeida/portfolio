"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { getCompactDuration, formatedDateMonthYear } from "@/utils/date";
import { mergeClassNames } from "@/utils/classNames";

interface EducationExtraCurricularProps {
  role: string;
  start: string;
  end: string;
  description: string;
  className?: string;
}

export default function EducationExtraCurricular({
  role,
  description,
  start,
  end,
  className,
}: EducationExtraCurricularProps) {
  const { lang } = useLanguage();

  return (
    <li
      className={mergeClassNames(
        "flex flex-col gap-2 p-4 rounded-lg",
        "bg-white/[0.03] border border-white/10",
        className,
      )}
    >
      <h4 className="font-semibold text-base sm:text-lg leading-snug">
        {role}
      </h4>

      <p className="text-xs sm:text-sm text-[var(--action)] font-medium">
        {getCompactDuration(start, end, lang)}
        <span className="text-[var(--foreground)]/50 font-normal">
          {" · "}
          {formatedDateMonthYear(start, lang)} –{" "}
          {formatedDateMonthYear(end, lang)}
        </span>
      </p>

      <p className="leading-relaxed text-gray-200 text-xs sm:text-sm">
        {description}
      </p>
    </li>
  );
}
