"use client";

import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DATA_BY_LANG } from "@/data";
import HighlightText from "@/app/components/atoms/HighlightText";
import {
  DEFAULT_LANG,
  DictionaryKey,
  Lang,
  dictionary,
} from "@/i18n/dictionary";

const STORAGE_KEY = "lang";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: DictionaryKey) => string;
  rich: (key: DictionaryKey) => React.ReactNode;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (key) => dictionary[DEFAULT_LANG][key],
  rich: (key) => dictionary[DEFAULT_LANG][key],
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LanguageContextType>(
    () => ({
      lang,
      setLang,
      t: (key) => dictionary[lang][key],
      rich: (key) => renderRich(dictionary[lang][key]),
    }),
    [lang, setLang],
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
