"use client";

import { formatedDateMonthYear } from "@/utils/date";
import { EducationInterface } from "@/data/education";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import AnimatedComponent from "./AnimatedComponent";
import EducationExtraCurricular from "../molecules/EducationExperience";
import LevelBadge from "../atoms/LevelBadge";
import { mergeClassNames } from "@/utils/classNames";

export default function Education({
  level,
  title,
  abbreviation,
  university,
  start,
  end,
  experiences,
}: EducationInterface) {
  const { lang, t } = useLanguage();
  const isPostgraduate = level === "postgraduate";
  const startYear = start.split("/")[2];
  const endYear = end?.split("/")[2];

  return (
    <AnimatedComponent
      HTMLtag="article"
      className={mergeClassNames(
        "w-full rounded-xl p-4 sm:p-8 border",
        "bg-white/[0.04] backdrop-blur-3xl",
        isPostgraduate
          ? "border-[var(--action)]/40 shadow-lg shadow-black/30"
          : "border-white/10",
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-8">
        <div className="flex gap-4 items-start min-w-0">
          {university.image && (
            <Image
              src={university.image}
              width={64}
              height={64}
              alt={university.name}
              className="size-14 sm:size-16 shrink-0 rounded-full bg-white object-contain"
            />
          )}

          <div className="flex flex-col items-start gap-2 min-w-0">
            <LevelBadge level={level} />

            <h3
              className={mergeClassNames(
                "font-semibold leading-snug break-words",
                isPostgraduate ? "text-xl sm:text-3xl" : "text-lg sm:text-2xl",
              )}
            >
              {title}
              {abbreviation && (
                <span className="font-bold"> ({abbreviation})</span>
              )}
            </h3>

            <div className="text-xs sm:text-base text-[var(--foreground)]/60">
              <p>
                {university.name} ({university.abbreviation})
              </p>
              {university.originalName && (
                <p className="italic">{university.originalName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: compact row above the header. Desktop: big year on the right. */}
        <div
          className={mergeClassNames(
            "order-first sm:order-none shrink-0",
            "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
            "pb-3 border-b border-white/10 sm:pb-0 sm:border-0",
            "sm:flex-col sm:items-end sm:justify-start sm:gap-0",
          )}
        >
          <p
            className={mergeClassNames(
              "font-bold leading-none tracking-tight tabular-nums",
              "text-xl sm:text-5xl",
              isPostgraduate
                ? "text-[var(--action)]"
                : "text-[var(--foreground)]/40 sm:text-[var(--foreground)]/25",
            )}
          >
            {startYear} – {endYear ?? t("date.present")}
          </p>
          <p className="sm:mt-2 text-xs sm:text-sm text-[var(--foreground)]/60 flex items-center gap-2">
            {!end && (
              <span className="relative flex size-2" aria-hidden>
                <span className="absolute inline-flex size-full rounded-full bg-[var(--action)] opacity-75 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--action)]" />
              </span>
            )}
            {formatedDateMonthYear(start, lang)} –{" "}
            {end ? formatedDateMonthYear(end, lang) : t("education.inProgress")}
          </p>
        </div>
      </div>

      {experiences.length > 0 && (
        <div className="mt-6 sm:mt-8">
          <h4 className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--foreground)]/50">
            {t("education.activities")}
          </h4>

          {/* Mobile: list with a line on the left. Desktop: columns split by
              thin vertical lines. No boxes inside the education card. */}
          <ul
            style={{ "--cols": experiences.length } as React.CSSProperties}
            className="flex flex-col gap-6 border-l-2 border-[var(--action)]/40 pl-4 lg:grid lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:grid-rows-[auto_auto_1fr] lg:gap-y-0 lg:divide-x lg:divide-white/10 lg:border-l-0 lg:pl-0"
          >
            {experiences.map((exp) => (
              <EducationExtraCurricular key={exp.role} {...exp} />
            ))}
          </ul>
        </div>
      )}
    </AnimatedComponent>
  );
}
