"use client";

import { useState } from "react";
import { EducationExperience } from "@/data/education";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatedDateMonthYear } from "@/utils/date";
import { mergeClassNames } from "@/utils/classNames";
import CompanyTime from "../atoms/CompanyTime";

interface EducationActivitiesProps {
  experiences: Array<EducationExperience>;
}

// Academic activities as chips. Each chip is clearly a button (plus icon,
// border that lights up on hover) and opens its details below.
export default function EducationActivities({
  experiences,
}: EducationActivitiesProps) {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

  if (experiences.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/50 sm:text-sm">
          {t("education.activities")}
        </h4>
        <p className="text-xs text-[var(--foreground)]/50">
          {t("education.activitiesHint")}
        </p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {experiences.map(({ role }, index) => {
          const active = selected === index;
          return (
            <li key={role} className="max-w-full">
              <button
                type="button"
                aria-expanded={active}
                title={role}
                onClick={() => setSelected(active ? null : index)}
                className={mergeClassNames(
                  "group/chip flex max-w-full cursor-pointer items-center gap-2 rounded-full border py-1.5 pl-2.5 pr-4 text-xs font-semibold sm:text-sm",
                  "transition-colors duration-300",
                  active
                    ? "border-[var(--action)] bg-[var(--action)] text-[var(--background)]"
                    : "border-[var(--action)]/50 hover:border-[var(--action)] hover:bg-[var(--action)]/10",
                )}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  className={mergeClassNames(
                    "size-4 shrink-0 fill-none stroke-current stroke-[2.5] transition-transform duration-300",
                    active
                      ? "rotate-45"
                      : "text-[var(--action)] group-hover/chip:rotate-90",
                  )}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="truncate">{role}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {experiences.map((exp, index) => (
        <div
          key={exp.role}
          className={mergeClassNames(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
            selected === index
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden" inert={selected !== index}>
            <div className="flex flex-col gap-1 border-l-2 border-[var(--action)]/40 pl-4">
              <h5 className="text-sm font-semibold leading-snug sm:text-base">
                {exp.role}
              </h5>
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-[var(--foreground)]/60">
                <CompanyTime
                  start={exp.start}
                  end={exp.end}
                  className="font-semibold text-[var(--action)]"
                />
                <span aria-hidden>·</span>
                <span>
                  {formatedDateMonthYear(exp.start, lang)} –{" "}
                  {formatedDateMonthYear(exp.end, lang)}
                </span>
              </div>
              <p className="text-xs font-light leading-relaxed sm:text-base">
                {exp.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
