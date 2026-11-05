"use client";

import { FaExternalLinkAlt } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatedDateMonthYear } from "@/utils/date";

import Image from "next/image";
import Tag from "../atoms/Tag";
import CertificationStamp from "../atoms/CertificationStamp";
import AnimatedComponent from "./AnimatedComponent";
import { CertificationInterface } from "@/data/certification";

export default function Certification({
  title,
  issuer,
  date,
  link,
  skills,
}: CertificationInterface) {
  const { lang } = useLanguage();

  return (
    <AnimatedComponent
      HTMLtag="article"
      className="group/card relative w-full max-w-xl p-4 sm:p-6 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-3xl"
    >
      <CertificationStamp className="absolute top-3 right-3 w-[4.8rem] sm:w-[6.4rem] pointer-events-none" />

      <div className="flex gap-4 items-start pr-[5.5rem] sm:pr-28">
        {issuer.image && (
          <Image
            src={issuer.image}
            width={56}
            height={56}
            alt={issuer.name}
            className="size-12 sm:size-14 shrink-0 rounded-full bg-white object-contain"
          />
        )}

        <div className="flex flex-col items-start gap-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold leading-snug">
            {title}
          </h3>

          <p className="flex items-center gap-2 text-xs sm:text-sm text-[var(--foreground)]/60">
            <span>{issuer.name}</span>
            <span aria-hidden className="size-1 rounded-full bg-[var(--foreground)]/40" />
            <span>{formatedDateMonthYear(date, lang)}</span>
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-2">
          {skills.map((item) => (
            <li key={item} className="flex">
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={title}
          className="shrink-0 text-[var(--action)]"
        >
          <FaExternalLinkAlt size={18} aria-hidden />
        </a>
      </div>
    </AnimatedComponent>
  );
}
