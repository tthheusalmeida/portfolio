"use client";

import { createContext, Fragment, useContext, useMemo } from "react";
import { DATA_BY_LANG } from "@/data";
import { localizedPath } from "@/i18n/routes";
import HighlightText from "@/app/components/atoms/HighlightText";
import {
  DEFAULT_LANG,
  DictionaryKey,
  Lang,
  dictionary,
} from "@/i18n/dictionary";

type LanguageContextType = {
  lang: Lang;
  t: (key: DictionaryKey) => string;
  rich: (key: DictionaryKey) => React.ReactNode;
  // Localized URL of a page: path("/projects") -> "/en/projects/" in English.
  path: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: DEFAULT_LANG,
  t: (key) => dictionary[DEFAULT_LANG][key],
  rich: (key) => dictionary[DEFAULT_LANG][key],
  path: (path) => localizedPath(DEFAULT_LANG, path),
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function renderRich(text: string) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line
        .split(/\*\*(.+?)\*\*/g)
        .map((part, j) =>
          j % 2 ? <HighlightText key={j}>{part}</HighlightText> : part,
        )}
    </Fragment>
  ));
}

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const value = useMemo<LanguageContextType>(
    () => ({
      lang,
      t: (key) => dictionary[lang][key],
      rich: (key) => renderRich(dictionary[lang][key]),
      path: (path) => localizedPath(lang, path),
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useData() {
  const { lang } = useLanguage();
  return DATA_BY_LANG[lang];
}
