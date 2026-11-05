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
    // On desktop each item is a subgrid spanning the parent's three rows
    // (title, period, description), so those rows line up across the columns.
    <li
      className={mergeClassNames(
        "flex flex-col gap-2",
        "lg:grid lg:row-span-3 lg:grid-rows-subgrid lg:gap-y-2",
        "lg:px-6 lg:first:pl-0 lg:last:pr-0",
        className,
      )}
    >
      <div>
        {/* Short accent on top of each column (desktop only). */}
        <span
          aria-hidden
          className="hidden lg:block mb-3 h-0.5 w-8 rounded bg-[var(--action)]"
        />
        <h4 className="font-semibold text-base sm:text-lg leading-snug">
          {role}
        </h4>
      </div>

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
