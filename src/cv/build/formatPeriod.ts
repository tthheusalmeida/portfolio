import type { Lang } from "@/i18n/dictionary";
import { formatedDateMonthYear } from "@/utils/date";

// "Apr 2025 to Present"; `end` null means the role is still ongoing.
export function formatPeriod(
  start: string,
  end: string | null,
  openEndLabel: string,
  separator: string,
  lang: Lang,
): string {
  const from = formatedDateMonthYear(start, lang);
  const to = end ? formatedDateMonthYear(end, lang) : openEndLabel;
  return `${from} ${separator} ${to}`;
}
