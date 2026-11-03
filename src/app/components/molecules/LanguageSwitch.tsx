"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Lang } from "@/i18n/dictionary";
import { mergeClassNames } from "@/utils/classNames";

const LANGUAGES: Array<{ value: Lang; label: string }> = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
];

export default function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center text-sm font-semibold">
      {LANGUAGES.map(({ value, label }, index) => (
        <div key={value} className="flex items-center">
          {index > 0 && <span className="opacity-20">/</span>}
          <button
            type="button"
            onClick={() => setLang(value)}
            aria-pressed={lang === value}
            className={mergeClassNames(
              "px-2 py-1 cursor-pointer transition-colors duration-200",
              lang === value
                ? "text-[var(--action)]"
                : "text-[var(--color-foreground)]/40 hover:text-[var(--color-foreground)]"
            )}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}
