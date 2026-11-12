import type { Lang } from "@/i18n/dictionary";
import type { ExperienceInterface } from "@/data/experience";
import type { CvExperienceContent } from "../content/experienceContent";
import type { CvJob } from "../types";
import { formatPeriod } from "./formatPeriod";

// Content for a role: what was written for the CV or, when nothing was, the
// achievements of the portfolio (only for the most recent role, so they are
// not repeated under every role of the same company).
function roleContent(
  experience: ExperienceInterface,
  content: CvExperienceContent | undefined,
  roleIndex: number,
) {
  const written = content?.roles[roleIndex];
  if (written) return { technologies: [], ...written };

  return {
    bullets: roleIndex === 0 ? experience.achievements : [],
    technologies: [],
  };
}

// One CV entry per role of the experience.
export function buildJobsOfExperience(
  experience: ExperienceInterface,
  content: CvExperienceContent | undefined,
  openEndLabel: string,
  periodSeparator: string,
  lang: Lang,
): Array<CvJob> {
  return experience.roles.map((role, index) => ({
    company: content?.company ?? experience.name,
    position: role.role,
    period: formatPeriod(
      role.start,
      role.end,
      openEndLabel,
      periodSeparator,
      lang,
    ),
    ...roleContent(experience, content, index),
  }));
}

// Experiences are already stored from the most recent to the oldest.
export function buildJobs(
  experiences: ReadonlyArray<ExperienceInterface>,
  contents: Record<string, CvExperienceContent>,
  openEndLabel: string,
  periodSeparator: string,
  lang: Lang,
): Array<CvJob> {
  return experiences
    .filter((experience) => !contents[experience.name]?.hidden)
    .flatMap((experience) =>
      buildJobsOfExperience(
        experience,
        contents[experience.name],
        openEndLabel,
        periodSeparator,
        lang,
      ),
    );
}
