import type { CvJob, CvModel } from "../types";

export interface FitOptions {
  maxPages: number;
  // Hard cap: only the most relevant bullets of each job are shown.
  maxBullets: number;
  // Bullets every job keeps for as long as possible when trimming for space.
  minBullets: number;
}

export const DEFAULT_FIT_OPTIONS: FitOptions = {
  maxPages: 2,
  maxBullets: 3,
  minBullets: 2,
};

function capBullets(model: CvModel, maxBullets: number): CvModel {
  return {
    ...model,
    jobs: model.jobs.map((job) => ({
      ...job,
      bullets: job.bullets.slice(0, maxBullets),
    })),
  };
}

export type PageCounter = (model: CvModel) => Promise<number>;

// Finds the job that should lose a bullet: the oldest one still above
// `floor`. Recent roles are the most valuable, so they are trimmed last.
function findJobToTrim(jobs: ReadonlyArray<CvJob>, floor: number): number {
  for (let i = jobs.length - 1; i >= 0; i--) {
    if (jobs[i].bullets.length > floor) return i;
  }
  return -1;
}

function dropLastBullet(model: CvModel, jobIndex: number): CvModel {
  return {
    ...model,
    jobs: model.jobs.map((job, i) =>
      i === jobIndex ? { ...job, bullets: job.bullets.slice(0, -1) } : job,
    ),
  };
}

// Keeps the `maxBullets` most relevant bullets of each job (they are already
// ordered by relevance) and, if the CV still exceeds `maxPages`, removes more:
// first every job is brought down to `minBullets`, oldest first; only then
// the floor is lowered towards 1.
export async function fitToPages(
  model: CvModel,
  countPages: PageCounter,
  { maxPages, maxBullets, minBullets }: FitOptions = DEFAULT_FIT_OPTIONS,
): Promise<CvModel> {
  let current = capBullets(model, maxBullets);
  let floor = minBullets;

  while ((await countPages(current)) > maxPages) {
    let target = findJobToTrim(current.jobs, floor);

    while (target === -1 && floor > 1) {
      floor -= 1;
      target = findJobToTrim(current.jobs, floor);
    }
    if (target === -1) break; // nothing left to trim

    current = dropLastBullet(current, target);
  }

  return current;
}
