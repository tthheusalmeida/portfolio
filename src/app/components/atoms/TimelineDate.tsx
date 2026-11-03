"use client";

import { mergeClassNames } from "@/utils/classNames";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatedDate } from "@/utils/date";
export interface TimelineDateProps {
  start: string;
  end: string;
  side: "right" | "left";
  className?: string;
}

export default function TimelineDate({
  start,
  end,
  side,
  className,
}: TimelineDateProps) {
  const { lang, t } = useLanguage();
  const isSideRight = side === "right";

  return (
    <span
      className={mergeClassNames(
        "text-sm sm:text-base",
        isSideRight ? "text-right" : "text-left",
        className
      )}
    >
      {`${formatedDate(start, lang)} - ${end ? formatedDate(end, lang) : t("date.present")}`}
    </span>
  );
}
