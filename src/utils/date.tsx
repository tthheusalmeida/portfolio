import { Lang, dictionary } from "@/i18n/dictionary";

// Year the portfolio was created (first commit: Feb 2024).
export const PORTFOLIO_START_YEAR = 2024;

// "2024" in the first year, "2024–2026" afterwards.
export function getCopyrightYears(currentYear: number): string {
  return currentYear > PORTFOLIO_START_YEAR
    ? `${PORTFOLIO_START_YEAR}–${currentYear}`
    : `${PORTFOLIO_START_YEAR}`;
}

const LOCALES: Record<Lang, string> = { pt: "pt-BR", en: "en-US" };

export function formatedDateMonthYear(currentDate: string, lang: Lang = "en") {
  const [day, month, year] = currentDate.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(LOCALES[lang], {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatedDate(currentDate: string, lang: Lang = "en") {
  const [day, month, year] = currentDate.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(LOCALES[lang], {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function getCompactDuration(
  startStr: string,
  endStr: string,
  lang: Lang = "en",
): string {
  const dict = dictionary[lang];
  const [, startMonth, startYear] = startStr.split("/").map(Number);
  const [, endMonth, endYear] = endStr.split("/").map(Number);

  const totalStartMonths = startYear * 12 + (startMonth - 1);
  const totalEndMonths = endYear * 12 + (endMonth - 1);
  const diff = totalEndMonths - totalStartMonths;

  const years = Math.floor(diff / 12);
  const months = diff % 12;

  const yearStr =
    years > 0 ? `${years} ${years > 1 ? dict["date.years"] : dict["date.year"]}` : "";
  const monthStr =
    months > 0
      ? `${months} ${months > 1 ? dict["date.months"] : dict["date.month"]}`
      : "";

  return [yearStr, monthStr].filter(Boolean).join(", ");
}
