"use client";

import { mergeClassNames } from "@/utils/classNames";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatedDateMonthYear } from "@/utils/date";

export interface TimelineDateProps {
  start: string;
  end: string | null;
}

interface TimelineDateComponentProps extends TimelineDateProps {
  align?: "left" | "right";
  className?: string;
}

// Highlights the start year and keeps the full period as a secondary line.
export default function TimelineDate({
  start,
  end,
  align = "left",
  className,
}: TimelineDateComponentProps) {
  const { lang, t } = useLanguage();
  const [startDay, startMonth, year] = start.split("/");

  return (
    <time
      dateTime={`${year}-${startMonth}-${startDay}`}
      className={mergeClassNames(
        "flex flex-col",
        align === "right" ? "items-end text-right" : "items-start text-left",
        className,
      )}
    >
      <span
        data-mascot-perch="hang"
        className={mergeClassNames(
          "font-bold leading-none tracking-tight tabular-nums",
          "text-4xl sm:text-7xl text-[#4c4b4a]",
          "transition-colors duration-500",
          // The Claude Code mascot hangs from this year (see ClaudeMascot).
          "data-mascot-on:text-[var(--foreground)]",
          "group-has-[article:hover]/row:text-[var(--foreground)] group-has-[article:focus-within]/row:text-[var(--foreground)]",
        )}
      >
        {year}
      </span>
      <span className="mt-1 text-xs sm:text-sm text-[var(--foreground)]/70">
        {formatedDateMonthYear(start, lang)} –{" "}
        {end ? formatedDateMonthYear(end, lang) : t("date.present")}
      </span>
    </time>
  );
}
