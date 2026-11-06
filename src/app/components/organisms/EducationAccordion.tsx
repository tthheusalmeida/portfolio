"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { EducationInterface } from "@/data/education";
import { mergeClassNames } from "@/utils/classNames";
import LevelBadge from "../atoms/LevelBadge";
import EducationActivities from "../molecules/EducationActivities";
import EducationPeriod from "../molecules/EducationPeriod";

// Résumé-style ledger. Each education is a single line (year, level tag,
// course, university); click to open the details. The level tag (with the
// degree abbreviation) keeps the course name short. The year is the
// conclusion year, or the start year while the education is in progress.
export default function EducationAccordion({
  educations,
}: {
  educations: Array<EducationInterface>;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul className="w-full divide-y divide-white/10 border-y border-white/10">
      {educations.map((education, index) => {
        const {
          level,
          title,
          abbreviation,
          description,
          university,
          start,
          end,
          experiences,
        } = education;
        const isOpen = open === index;
        const panelId = `${id}-${index}`;

        return (
          <li key={`${level}-${university.abbreviation}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="group/row grid w-full cursor-pointer grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-6 text-left sm:grid-cols-[7rem_1fr_auto] sm:gap-6"
            >
              <span
                className={mergeClassNames(
                  "text-2xl font-bold leading-none tabular-nums transition-colors duration-300 sm:text-5xl",
                  !end || isOpen
                    ? "text-[var(--action)]"
                    : "text-[var(--foreground)]/25 group-hover/row:text-[var(--foreground)]/60",
                )}
              >
                {(end ?? start).split("/")[2]}
              </span>
              <span className="flex min-w-0 flex-col items-start gap-1.5">
                <LevelBadge level={level} abbreviation={abbreviation} />
                <span className="block break-words text-base font-semibold leading-snug sm:text-2xl">
                  {title}
                </span>
                <span className="block text-xs text-[var(--foreground)]/60 sm:text-base">
                  {university.abbreviation}
                </span>
              </span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={mergeClassNames(
                  "size-5 fill-none stroke-[var(--foreground)]/60 stroke-2 transition-transform duration-300",
                  isOpen && "rotate-90",
                )}
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <div
              id={panelId}
              className={mergeClassNames(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="flex flex-col gap-4 pb-8 sm:pl-[8.5rem]">
                  <div className="flex items-center gap-3">
                    {university.image && (
                      <Image
                        src={university.image}
                        width={48}
                        height={48}
                        alt={university.name}
                        className="size-10 shrink-0 rounded-full bg-white object-contain"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--foreground)]/60 sm:text-base">
                        {university.name}
                      </p>
                      <EducationPeriod start={start} end={end} />
                    </div>
                  </div>
                  <p className="max-w-2xl text-sm font-light sm:text-base">
                    {description}
                  </p>
                  <EducationActivities experiences={experiences} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
