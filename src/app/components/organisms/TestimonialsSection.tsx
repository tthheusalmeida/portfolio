"use client";

import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";
import Testimonial from "../molecules/Testimonial";
import { useLanguage, useData } from "@/contexts/LanguageContext";

import { FaArrowRight } from "react-icons/fa6";

export default function TestimonialsSection() {
  const { t, rich } = useLanguage();
  const testimonials = useData().testimonials.filter(
    ({ featured }) => featured,
  );
  return (
    <SectionTemplate
      id="testimonials"
      className="flex flex-col items-center sm:rounded-b-2xl"
    >
      <TitleAndSubtitleSection
        title={t("testimonials.title")}
        subtitle={rich("testimonials.subtitle")}
      >
        <div className="mt-11 grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          {testimonials.map(
            ({ name, role, descriptions, highlight, relationship }) => (
              <Testimonial
                key={name}
                label={name}
                role={role}
                description={descriptions}
                highlight={highlight}
                relationship={relationship}
              />
            ),
          )}
        </div>

        <a
          href="https://www.linkedin.com/in/dev-almeida-matheus/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "self-end mt-11 w-46 px-4 py-2 rounded-sm",
            "inline-flex items-center justify-center gap-1",
            "text-sm font-medium transition-colors duration-200",
            "bg-[var(--action)] text-[var(--color-background)] hover:bg-[var(--action)]/80",
          ].join(" ")}
        >
          {t("testimonials.link")}
          <FaArrowRight className="animate-arrow-bounce" size={18} />
        </a>
      </TitleAndSubtitleSection>
    </SectionTemplate>
  );
}
