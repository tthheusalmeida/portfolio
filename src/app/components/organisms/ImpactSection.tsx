"use client";

import SectionTemplate from "@/templates/SectionTemplate";
import { useLanguage, useData } from "@/contexts/LanguageContext";
import AnimatedComponent from "../molecules/AnimatedComponent";

export default function ImpactSection() {
  const { t } = useLanguage();
  const impacts = useData().impacts;

  return (
    <SectionTemplate id="impact" className="min-h-0 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[var(--page-width)]">
        <h2 className="mb-6 text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--foreground)]/50">
          {t("impact.title")}
        </h2>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {impacts.map(({ value, prefix, suffix, label, company }, index) => (
            <li key={label} className="flex">
              <AnimatedComponent
                HTMLtag="div"
                delay={index * 0.1}
                className="flex w-full flex-col items-center rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center sm:p-6"
              >
                <span className="min-h-4 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/50">
                  {prefix}
                </span>

                {/* The animated number is decorative; the real value is text. */}
                <span className="sr-only">
                  {prefix} {value}
                  {suffix} {label}
                </span>
                <span
                  aria-hidden
                  className="mt-1 text-4xl font-bold leading-none tabular-nums text-[var(--action)] sm:text-6xl"
                >
                  <span
                    className="count-up"
                    style={{ "--target": value } as React.CSSProperties}
                  />
                  {suffix}
                </span>

                <span aria-hidden className="mt-3 flex-1 text-xs sm:text-sm text-[var(--foreground)]/80">
                  {label}
                </span>
                <span className="mt-3 text-xs text-[var(--foreground)]/40">
                  {company}
                </span>
              </AnimatedComponent>
            </li>
          ))}
        </ul>
      </div>
    </SectionTemplate>
  );
}
