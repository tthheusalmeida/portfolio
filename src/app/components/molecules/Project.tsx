"use client";

import { mergeClassNames } from "@/utils/classNames";
import Tag from "../atoms/Tag";
import Image from "next/image";
import AnimatedComponent from "./AnimatedComponent";
import { Category } from "@/data/project";
import { useLanguage } from "@/contexts/LanguageContext";
import { DictionaryKey } from "@/i18n/dictionary";
import { FaExternalLinkAlt } from "react-icons/fa";

export interface ProjectProps {
  className?: string;
  title: string;
  about: string;
  technologies: Array<string>;
  image: string;
  link: string;
  categories?: Array<Category>;
}

// Technologies always visible in the collapsed state; the rest appear on hover.
const VISIBLE_TECHNOLOGIES = 3;
// Hard cap: at most two rows of tags (fixed height, so every card lines up).
// Anything past the cap is not rendered.
const MAX_TECHNOLOGIES = 10;
const TAGS_PER_ROW = 5;

// Cards have a fixed height on purpose: they are stacked with `position:
// sticky`, and a taller card behind a shorter one would peek out from under it.
//
// `reveal:` = desktop with a real hover (see globals.css). There the image fills
// the card, the title and the first technologies stay visible at the bottom, and
// the description and the remaining technologies reveal on hover/focus.
// Everywhere else (mobile, tablets) the image sits on top (it absorbs the
// leftover height) and every detail is always visible below it.
// The text is always in the DOM (SEO). The whole card is one link (the overlay
// anchor), so the image and the title are clickable too.
export default function Project({
  className,
  title,
  about,
  technologies,
  image,
  link,
  categories,
}: ProjectProps) {
  const { t } = useLanguage();
  const shown = technologies.slice(0, MAX_TECHNOLOGIES);
  // Tags that fit in one row on desktop. Past that, a second row is reserved.
  const hasSecondRow = shown.length > TAGS_PER_ROW;
  const hiddenCount = Math.max(shown.length - VISIBLE_TECHNOLOGIES, 0);

  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames("relative w-full group", className)}
    >
      <div className="relative flex flex-col h-[30rem] reveal:block reveal:h-96 overflow-hidden rounded-2xl bg-stone-800">
        <div className="relative flex-1 min-h-40 reveal:absolute reveal:inset-0 reveal:min-h-0">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 reveal:group-hover:scale-105 reveal:group-focus-within:scale-105 motion-reduce:transition-none"
          />
        </div>

        <div
          aria-hidden
          className="hidden reveal:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
        />
        <div
          aria-hidden
          className="hidden reveal:block absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
        />

        {categories && categories.length > 0 && (
          <ul className="absolute left-3 top-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <li
                key={category}
                className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
              >
                {t(`projects.category.${category}` as DictionaryKey)}
              </li>
            ))}
          </ul>
        )}

        <span
          aria-hidden
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/60 text-[var(--action)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[var(--action)] group-hover:text-[var(--background)] group-focus-within:bg-[var(--action)] group-focus-within:text-[var(--background)]"
        >
          <FaExternalLinkAlt size={14} />
        </span>

        <div
          className={mergeClassNames(
            "relative p-4 reveal:absolute reveal:inset-x-0 reveal:bottom-0",
            // The reserved second row of tags hangs below the card edge (clipped)
            // while closed, so the first row sits at the bottom, not floating up.
            hasSecondRow &&
              mergeClassNames(
                "reveal:translate-y-9 reveal:group-hover:translate-y-0 reveal:group-focus-within:translate-y-0",
                "transition-transform duration-500 ease-out motion-reduce:transition-none",
              ),
          )}
        >
          <h3 className="text-base sm:text-lg text-[var(--action)] font-bold">
            {title}
          </h3>

          <div
            className={mergeClassNames(
              "grid grid-rows-[1fr] reveal:grid-rows-[0fr] reveal:opacity-0",
              "reveal:group-hover:grid-rows-[1fr] reveal:group-hover:opacity-100",
              "reveal:group-focus-within:grid-rows-[1fr] reveal:group-focus-within:opacity-100",
              "transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none",
            )}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="pt-2 text-xs sm:text-sm font-normal">{about}</p>
            </div>
          </div>

          {/* Every technology takes its final place in the layout from the
              start: the extra ones are only transparent until the hover, so
              nothing shifts when they appear. They fade in one after the
              other. The "+N" chip sits on the slot of the first extra one and
              fades out as that one fades in. */}
          <ul
            className={mergeClassNames(
              "mt-3 flex h-16 flex-wrap content-start gap-y-2 overflow-hidden sm:mt-4",
              !hasSecondRow && "reveal:h-7",
            )}
          >
            {shown.map((item, index) => {
              const extra = index >= VISIBLE_TECHNOLOGIES;
              return (
                <li
                  key={item}
                  style={
                    extra
                      ? ({
                          "--tag-delay": `${(index - VISIBLE_TECHNOLOGIES) * 70}ms`,
                        } as React.CSSProperties)
                      : undefined
                  }
                  className="relative flex h-7 whitespace-nowrap"
                >
                  <div
                    className={mergeClassNames(
                      "transition-opacity duration-500 ease-out motion-reduce:transition-none",
                      extra &&
                        mergeClassNames(
                          "reveal:opacity-0",
                          "reveal:group-hover:opacity-100 reveal:group-hover:delay-(--tag-delay)",
                          "reveal:group-focus-within:opacity-100 reveal:group-focus-within:delay-(--tag-delay)",
                        ),
                    )}
                  >
                    <Tag className="mr-2 flex h-7 items-center leading-none">
                      {item}
                    </Tag>
                  </div>

                  {index === VISIBLE_TECHNOLOGIES && (
                    <div
                      aria-hidden
                      className={mergeClassNames(
                        "pointer-events-none absolute left-0 top-0 hidden reveal:block",
                        "transition-opacity duration-300 ease-out motion-reduce:transition-none",
                        "reveal:group-hover:opacity-0 reveal:group-focus-within:opacity-0",
                      )}
                    >
                      <Tag className="flex h-7 items-center leading-none">
                        +{hiddenCount}
                      </Tag>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--action)]"
        >
          <span className="sr-only">
            {title} ({t("projects.opensInNewTab")})
          </span>
        </a>
      </div>
    </AnimatedComponent>
  );
}
