"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lang } from "@/i18n/dictionary";
import { localizedPath, stripLocale } from "@/i18n/routes";
import { mergeClassNames } from "@/utils/classNames";

const LANGUAGES: Array<{ value: Lang; label: string; name: string }> = [
  { value: "pt", label: "PT", name: "Português" },
  { value: "en", label: "EN", name: "English" },
];

// Each language is its own static page (/ and /en/), so switching is a link:
// crawlers can follow it and the current section/page is preserved.
export default function LanguageSwitch() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const currentPath = stripLocale(pathname);

  return (
    <nav
      aria-label={t("a11y.language")}
      className="flex items-center text-sm font-semibold"
    >
      {LANGUAGES.map(({ value, label, name }, index) => (
        <div key={value} className="flex items-center">
          {index > 0 && <span className="opacity-20">/</span>}
          <a
            href={localizedPath(value, currentPath)}
            hrefLang={value === "pt" ? "pt-BR" : "en"}
            lang={value === "pt" ? "pt-BR" : "en"}
            title={name}
            aria-current={lang === value ? "true" : undefined}
            className={mergeClassNames(
              "px-2 py-1 cursor-pointer transition-colors duration-200",
              lang === value
                ? "text-[var(--action)]"
                : "text-[var(--color-foreground)]/40 hover:text-[var(--color-foreground)]"
            )}
          >
            {label}
          </a>
        </div>
      ))}
    </nav>
  );
}
