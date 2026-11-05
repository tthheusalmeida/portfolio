"use client";

import { useId, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mergeClassNames } from "@/utils/classNames";

interface CertificationStampProps {
  className?: string;
}

const CENTER = 100;
const SERIF = "Georgia, 'Times New Roman', serif";

// Scalloped (wavy) circle used as the seal body.
function scallopPath(radius: number) {
  const bumps = 12;
  const amplitude = 3;
  const steps = 280;

  return (
    Array.from({ length: steps }, (_, i) => {
      const angle = (i / steps) * Math.PI * 2;
      const r = radius + amplitude * Math.cos(angle * bumps);
      const x = (CENTER + r * Math.cos(angle)).toFixed(2);
      const y = (CENTER + r * Math.sin(angle)).toFixed(2);
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    }).join(" ") + " Z"
  );
}

function starPath(cx: number, cy: number, radius: number) {
  return (
    Array.from({ length: 10 }, (_, i) => {
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      const r = i % 2 === 0 ? radius : radius * 0.4;
      const x = (cx + r * Math.cos(angle)).toFixed(2);
      const y = (cy + r * Math.sin(angle)).toFixed(2);
      return `${i === 0 ? "M" : "L"}${x} ${y}`;
    }).join(" ") + " Z"
  );
}

const SEAL_PATH = scallopPath(88);
const TOP_STARS = [
  starPath(80, 67, 6),
  starPath(100, 62, 8),
  starPath(120, 67, 6),
];
const BOTTOM_STARS = [
  starPath(80, 133, 6),
  starPath(100, 138, 8),
  starPath(120, 133, 6),
];

// Arc paths for the curved texts. The bottom one runs counter-clockwise so the
// letters stay upright.
const TOP_ARC = `M ${CENTER - 52} ${CENTER} A 52 52 0 0 1 ${CENTER + 52} ${CENTER}`;
const BOTTOM_ARC = `M ${CENTER - 65} ${CENTER} A 65 65 0 0 0 ${CENTER + 65} ${CENTER}`;

// Class names must be written out in full: Tailwind only generates classes it
// can find as literal strings in the source.
// Entering the viewport: the seal is "pressed" onto the card (keyframes live in
// globals.css). Hovering or focusing the card only tilts it a bit more.
const PRESS = "[animation:stamp-press_0.8s_cubic-bezier(0.2,0.9,0.3,1.2)_both]";
const TILT =
  "transition-[rotate] duration-300 ease-out " +
  "group-hover/card:[rotate:-18deg] group-focus-within/card:[rotate:-18deg]";

export default function CertificationStamp({
  className,
}: CertificationStampProps) {
  const { t } = useLanguage();
  const id = useId().replace(/:/g, "");
  const sealMask = `${id}-seal`;
  const bannerMask = `${id}-banner`;
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const label = t("certifications.stamp");
  const arcFontSize = label.length > 9 ? 14 : 17;

  return (
    <svg
      ref={ref}
      viewBox="0 0 200 200"
      role="img"
      aria-label={label}
      className={mergeClassNames(
        "text-[var(--action)]",
        "[rotate:-8deg]",
        !reduceMotion && TILT,
        !reduceMotion &&
          (isInView ? `${PRESS} [animation-delay:0.3s]` : "opacity-0"),
        className,
      )}
    >
      <defs>
        {/* Hollows out the inside of the scalloped disc. */}
        <mask id={sealMask}>
          <rect width="200" height="200" fill="white" />
          <circle cx={CENTER} cy={CENTER} r="78" fill="black" />
        </mask>

        {/* Hollows out the banner text. */}
        <mask id={bannerMask}>
          <rect width="200" height="200" fill="white" />
          <text
            x={CENTER}
            y="109"
            fill="black"
            fontFamily={SERIF}
            fontSize="24"
            fontWeight="700"
            textAnchor="middle"
            textLength="116"
            lengthAdjust="spacingAndGlyphs"
          >
            {label}
          </text>
        </mask>

        <path id={`${id}-top`} d={TOP_ARC} />
        <path id={`${id}-bottom`} d={BOTTOM_ARC} />
      </defs>

      <path d={SEAL_PATH} fill="currentColor" mask={`url(#${sealMask})`} />
      <circle
        cx={CENTER}
        cy={CENTER}
        r="71"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <g
        fill="currentColor"
        fontFamily={SERIF}
        fontSize={arcFontSize}
        fontWeight="700"
        letterSpacing="2"
        textAnchor="middle"
      >
        <text>
          <textPath href={`#${id}-top`} startOffset="50%">
            {label}
          </textPath>
        </text>
        <text>
          <textPath href={`#${id}-bottom`} startOffset="50%">
            {label}
          </textPath>
        </text>

        {[...TOP_STARS, ...BOTTOM_STARS].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g fill="currentColor" mask={`url(#${bannerMask})`}>
        {/* Ribbon tails with a swallowtail notch, then the banner. */}
        <path d="M 28 86 L 4 86 L 15 102 L 4 118 L 28 118 Z" />
        <path d="M 172 86 L 196 86 L 185 102 L 196 118 L 172 118 Z" />
        <rect x="26" y="78" width="148" height="44" />
      </g>
    </svg>
  );
}
