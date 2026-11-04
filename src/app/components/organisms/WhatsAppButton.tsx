"use client";

import Image from "next/image";

import { useData, useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const link = useData().socialMedia.find(
    (item) => item.name === "whatsapp"
  )?.link;

  if (!link) return null;

  return (
    <a
      href={encodeURI(link)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("a11y.whatsapp")}
      className="fixed bottom-6 right-6 z-20 flex items-center justify-center
        w-[52px] h-[52px] rounded-full bg-[#25d366] shadow-lg
        transition-colors duration-300 hover:bg-[var(--action)]"
    >
      <span
        aria-hidden="true"
        className="wa-pulse absolute inset-0 -z-10 rounded-full bg-[#25d366] opacity-0"
      />
      <Image
        src="/whatsapp.png"
        width={26}
        height={26}
        alt=""
        aria-hidden="true"
        className="wa-icon"
      />
    </a>
  );
}
