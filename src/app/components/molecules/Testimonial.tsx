"use client";

import { useId, useState } from "react";
import { BiSolidQuoteRight } from "react-icons/bi";
import { useLanguage } from "@/contexts/LanguageContext";
import { mergeClassNames } from "@/utils/classNames";
import AnimatedComponent from "./AnimatedComponent";

interface TestimonialProps {
  label: string;
  role: string;
  description: string | Array<string>;
  highlight?: string;
  relationship?: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

// The full text is always in the DOM: collapsing only clips it with a grid row, so
// crawlers and screen readers still get the whole testimonial.
export default function Testimonial({
  label,
  role,
  description,
  highlight,
  relationship,
}: TestimonialProps) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const textId = useId();

  const text = Array.isArray(description)
    ? description.join(" ")
    : description.replace(/\s+/g, " ").trim();

  return (
    <AnimatedComponent
      HTMLtag="figure"
      className={mergeClassNames(
        "flex flex-col w-full p-5 sm:p-6 rounded-xl",
        "bg-white/[0.04] border border-white/10 backdrop-blur-sm",
        "transition-colors duration-300 hover:bg-white/[0.07]",
      )}
    >
      <BiSolidQuoteRight
        aria-hidden
        size={28}
        className="rotate-180 text-[var(--action)]"
      />

      {highlight && (
        <p className="mt-3 min-h-[2.75em] text-base sm:text-lg font-semibold leading-snug">
          {highlight}
        </p>
      )}

      {/* Collapsed: only the highlight. Expanded: the full text. The text is
          always in the DOM (clipped by a 0fr grid row), so it stays readable by
          crawlers and screen readers. */}
      <blockquote
        className={mergeClassNames(
          "grid transition-[grid-template-rows,margin] duration-500 ease-in-out",
          expanded ? "mt-3 grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]",
        )}
      >
        <div id={textId} className="min-h-0 overflow-hidden">
          <p className="text-xs sm:text-sm font-normal leading-relaxed text-[var(--foreground)]/70">
            {text}
          </p>
        </div>
      </blockquote>

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={textId}
        onClick={() => setExpanded((prev) => !prev)}
        className="self-start mt-2 text-xs font-semibold text-[var(--action)] hover:underline"
      >
        {expanded ? t("testimonials.readLess") : t("testimonials.readMore")}
      </button>

      <figcaption className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--action)]/15 text-sm font-bold text-[var(--action)]"
        >
          {getInitials(label)}
        </span>

        <div className="min-w-0">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-[var(--foreground)]/60">{role}</p>
          {relationship && (
            <p className="mt-0.5 text-xs font-medium text-[var(--action)]">
              {relationship}
            </p>
          )}
        </div>
      </figcaption>
    </AnimatedComponent>
  );
}
