"use client";

import { useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
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

// Four lines of text (leading-relaxed = 1.625). The collapsed text is clipped at
// this height with a soft fade, so the expand/collapse can animate max-height.
const COLLAPSED_HEIGHT = "6.5em";
const FADE = "1.75em";
const MASK_LAYERS =
  "linear-gradient(#000, #000), linear-gradient(to bottom, #000, transparent)";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return `${first}${last}`.toUpperCase();
}

// The full text is always in the DOM: collapsing is only a CSS line clamp, so
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
  const textRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const text = Array.isArray(description)
    ? description.join(" ")
    : description.replace(/\s+/g, " ").trim();

  const toggle = () => {
    const el = textRef.current;
    if (!el) return;

    // Animate between two known pixel heights; `none` is restored on
    // transition end so the open text can still reflow on resize.
    el.style.maxHeight = `${el.scrollHeight}px`;
    if (expanded) {
      void el.offsetHeight; // flush so the transition starts from the pixel height
      el.style.maxHeight = COLLAPSED_HEIGHT;
    }
    setExpanded(!expanded);
  };

  const maskSize = expanded
    ? `100% 100%, 100% ${FADE}`
    : `100% calc(100% - ${FADE}), 100% ${FADE}`;
  const transition = reduceMotion
    ? "none"
    : "max-height 500ms ease-in-out, mask-size 500ms ease-in-out, -webkit-mask-size 500ms ease-in-out";

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

      <blockquote className="mt-3">
        <div
          id={textId}
          ref={textRef}
          onTransitionEnd={(event) => {
            if (
              expanded &&
              event.propertyName === "max-height" &&
              textRef.current
            ) {
              textRef.current.style.maxHeight = "none";
            }
          }}
          className="min-h-[6.5em] max-h-[6.5em] overflow-hidden text-xs sm:text-sm font-normal leading-relaxed text-[var(--foreground)]/70"
          style={{
            WebkitMaskImage: MASK_LAYERS,
            maskImage: MASK_LAYERS,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "top, bottom",
            maskPosition: "top, bottom",
            WebkitMaskSize: maskSize,
            maskSize,
            transition,
          }}
        >
          <p>{text}</p>
        </div>
      </blockquote>

      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={textId}
        onClick={toggle}
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
