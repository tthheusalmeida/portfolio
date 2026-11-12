import type { ExperienceInterface } from "@/data/experience";

const MONTHS_PER_YEAR = 12;

function parse(date: string) {
  const [, month, year] = date.split("/").map(Number);
  return year * MONTHS_PER_YEAR + (month - 1);
}

// Whole years between the oldest role start and `now`.
export function yearsOfExperience(
  experiences: ReadonlyArray<ExperienceInterface>,
  now: Date = new Date(),
): number {
  const starts = experiences.flatMap((e) => e.roles.map((r) => parse(r.start)));
  if (starts.length === 0) return 0;

  const current = now.getFullYear() * MONTHS_PER_YEAR + now.getMonth();
  return Math.floor((current - Math.min(...starts)) / MONTHS_PER_YEAR);
}
