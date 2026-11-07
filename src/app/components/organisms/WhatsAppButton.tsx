"use client";

import { FaWhatsapp } from "react-icons/fa";

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
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center
        w-[52px] h-[52px] rounded-full shadow-lg
        bg-[var(--action)] text-stone-900
        transition-colors duration-300 hover:bg-stone-800 hover:text-[var(--action)]"
    >
      <span
        aria-hidden="true"
        className="wa-pulse absolute inset-0 -z-10 rounded-full bg-[var(--action)] opacity-0"
      />
      <FaWhatsapp size={26} aria-hidden="true" className="wa-icon" />
    </a>
  );
}
