import Image from "next/image";
import RoleBadge from "../atoms/RoleBadge";
import { mergeClassNames } from "@/utils/classNames";
import CompanyTime from "../atoms/CompanyTime";
import { FaCheck } from "react-icons/fa";

interface BalloonRole {
  role: string;
  type: string;
  start: string;
  end: string | null;
}

interface BaloonProps {
  label: string;
  logo: string | null;
  // Most recent first. More than one role means a career path inside the
  // same company.
  roles: Array<BalloonRole>;
  description: string | null;
  achievements: Array<string>;
  highlights: Array<string>;
  image?: { src: string | null; alt: string | null };
}

// Collapsible block: on mobile it is always open; from `sm` it follows the
// card hover/focus. The content stays in the DOM (only clipped), so
// the full text remains available to crawlers and screen readers.
const EXPANDED =
  "sm:group-hover/card:grid-rows-[1fr] sm:group-focus-within/card:grid-rows-[1fr]";
const COLLAPSED =
  "sm:group-hover/card:grid-rows-[0fr] sm:group-focus-within/card:grid-rows-[0fr]";

export default function Balloon({
  label,
  logo,
  roles,
  description,
  achievements,
  highlights,
  image,
}: BaloonProps) {
  const hasCareerPath = roles.length > 1;
  const companyStart = roles[roles.length - 1].start;
  const companyEnd = roles[0].end;

  return (
    <article
      tabIndex={0}
      className={mergeClassNames(
        "group/card relative w-full min-w-0 max-w-full overflow-hidden",
        "p-4 rounded-lg outline-none border border-white/10",
        "bg-white/[0.04] backdrop-blur-3xl",
        "sm:w-[26rem] sm:hover:w-[34rem] sm:focus-within:w-[34rem]",
        "hover:bg-white/[0.08] focus-within:bg-white/[0.08]",
        "hover:shadow-lg hover:shadow-black/30",
        "focus-visible:ring-2 focus-visible:ring-[var(--action)]",
        "transition-[width,background-color,box-shadow] duration-500 ease-out motion-reduce:transition-none",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-2xl sm:text-3xl break-words">
            {label}
          </h3>

          {hasCareerPath && companyEnd && (
            <CompanyTime
              start={companyStart}
              end={companyEnd}
              className="mt-1 block"
            />
          )}

          <ol
            className={mergeClassNames(
              "mt-2 sm:mt-3 flex flex-col items-start gap-3",
              hasCareerPath && "border-l-2 border-[var(--action)]/40 pl-3",
            )}
          >
            {roles.map(({ role, type, start, end }) => (
              <li key={role} className="flex max-w-full flex-col items-start gap-1.5">
                <div className="flex flex-wrap items-center gap-x-2 text-xs">
                  {end && (
                    <>
                      <CompanyTime start={start} end={end} />
                      <span aria-hidden>·</span>
                    </>
                  )}
                  <span className="capitalize font-semibold text-[var(--foreground)]/80">
                    {type}
                  </span>
                </div>
                <RoleBadge>{role}</RoleBadge>
              </li>
            ))}
          </ol>
        </div>

        {logo && (
          <div className="flex h-14 w-32 shrink-0 items-center justify-center rounded-xl bg-white p-1">
            <Image
              src={logo}
              width={120}
              height={48}
              alt={`${label} company`}
              className="h-auto max-h-full w-auto max-w-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Summary: key deliveries, visible only while collapsed (desktop). */}
      <div
        className={mergeClassNames(
          "hidden sm:grid grid-rows-[1fr] mt-4",
          "transition-[grid-template-rows,opacity,margin] duration-500 ease-out motion-reduce:transition-none",
          COLLAPSED,
          "sm:group-hover/card:opacity-0 sm:group-hover/card:mt-0",
          "sm:group-focus-within/card:opacity-0 sm:group-focus-within/card:mt-0",
        )}
      >
        <ul className="min-h-0 overflow-hidden flex flex-col gap-1.5 text-sm font-medium">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2">
              <FaCheck className="mt-1 text-[var(--action)] flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Details: image, description and full achievements. */}
      <div
        className={mergeClassNames(
          "grid grid-rows-[1fr] sm:grid-rows-[0fr] mt-4 sm:mt-0",
          "sm:opacity-0 sm:group-hover/card:opacity-100 sm:group-focus-within/card:opacity-100",
          "sm:group-hover/card:mt-4 sm:group-focus-within/card:mt-4",
          "transition-[grid-template-rows,opacity,margin] duration-500 ease-out motion-reduce:transition-none",
          EXPANDED,
        )}
      >
        <div className="min-h-0 overflow-hidden text-xs sm:text-base">
          {image?.src && (
            <div className="relative hidden sm:block w-full h-44 mb-4 rounded overflow-hidden bg-black">
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                fill
                sizes="544px"
                className="object-cover"
              />
            </div>
          )}

          {description && <p className="font-light">{description}</p>}

          <ul className={mergeClassNames("flex flex-col gap-1", description && "mt-4")}>
            {achievements.map((achievement, index) => (
              <li
                key={index}
                className="flex items-start gap-2 font-semibold leading-relaxed"
              >
                <FaCheck className="mt-1 text-[var(--action)] flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
