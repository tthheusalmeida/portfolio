import { describe, expect, it } from "vitest";
import { fitToPages } from "@/cv/fit/fitToPages";
import type { CvJob, CvModel } from "@/cv/types";

function job(company: string, bullets: number): CvJob {
  return {
    company,
    position: "Engineer",
    period: "",
    bullets: Array.from({ length: bullets }, (_, i) => `${company}-${i}`),
    technologies: [],
  };
}

function model(jobs: CvJob[]): CvModel {
  return {
    lang: "en",
    fileName: "cv.pdf",
    labels: {} as CvModel["labels"],
    contact: {} as CvModel["contact"],
    summary: [],
    mainResults: [],
    jobs,
    education: [],
    languages: [],
    certifications: [],
  };
}

// One page per 10 bullets, so the result is easy to predict.
const total = (m: CvModel) => m.jobs.reduce((s, j) => s + j.bullets.length, 0);
const pagesOf = async (m: CvModel) => Math.ceil(total(m) / 10);

describe("fitToPages", () => {
  it("returns the same bullets when the CV already fits", async () => {
    const input = model([job("new", 5), job("old", 5)]);
    const result = await fitToPages(input, pagesOf, {
      maxPages: 1,
      maxBullets: 9,
      minBullets: 2,
    });
    expect(result).toEqual(input);
  });

  it("keeps only the most relevant bullets of each job (hard cap)", async () => {
    const input = model([job("new", 5)]);
    const result = await fitToPages(input, async () => 1, {
      maxPages: 1,
      maxBullets: 3,
      minBullets: 2,
    });
    expect(result.jobs[0].bullets).toEqual(["new-0", "new-1", "new-2"]);
  });

  it("trims the oldest job first and keeps its most relevant bullets", async () => {
    const input = model([job("new", 5), job("mid", 5), job("old", 5)]);
    const result = await fitToPages(input, pagesOf, { maxPages: 1, maxBullets: 9, minBullets: 2 });

    expect(result.jobs.map((j) => j.bullets.length)).toEqual([5, 3, 2]);
    expect(result.jobs[2].bullets).toEqual(["old-0", "old-1"]);
  });

  it("goes below the minimum only when nothing else can be trimmed", async () => {
    const input = model([job("new", 5), job("old", 5)]);
    const result = await fitToPages(input, pagesOf, { maxPages: 1, maxBullets: 9, minBullets: 3 });

    expect(total(result)).toBe(10);
    expect(result.jobs.map((j) => j.bullets.length)).toEqual([5, 5]);

    const tight = await fitToPages(input, pagesOf, { maxPages: 1, maxBullets: 9, minBullets: 6 });
    expect(total(tight)).toBe(10);
  });

  it("stops when no bullet is left to remove", async () => {
    const input = model([job("only", 2)]);
    const result = await fitToPages(input, async () => 99, {
      maxPages: 1,
      maxBullets: 9,
      minBullets: 2,
    });
    expect(result.jobs[0].bullets).toHaveLength(1);
  });
});
