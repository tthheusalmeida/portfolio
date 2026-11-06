"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { formatedDateMonthYear } from "@/utils/date";
import { mergeClassNames } from "@/utils/classNames";

interface EducationPeriodProps {
  start: string;
  end: string | null;
  className?: string;
}

// "ago de 2018 – abr de 2025", or "jul de 2026 – Em andamento" with a pulsing
// dot while the education is not finished.
export default function EducationPeriod({
  start,
  end,
  className,
}: EducationPeriodProps) {
  const { lang, t } = useLanguage();

  return (
    <p
      className={mergeClassNames(
        "flex items-center gap-2 text-xs text-[var(--foreground)]/70 sm:text-sm",
        className,
      )}
    >
      {!end && (
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--action)] opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-[var(--action)]" />
        </span>
      )}
      {formatedDateMonthYear(start, lang)} –{" "}
      {end ? formatedDateMonthYear(end, lang) : t("education.inProgress")}
    </p>
  );
}
