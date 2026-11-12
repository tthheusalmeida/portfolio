import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { buildCvModel } from "@/cv/build/buildCvModel";
import { generateCv } from "@/cv/generateCv";
import { countPdfPages } from "@/cv/pdf/countPdfPages";
import { createPdfRenderer } from "@/cv/pdf/createPdfRenderer";
import { DATA_BY_LANG } from "@/data";

const FONTS = path.resolve(__dirname, "../../public/fonts/carlito");

describe("buildCvModel", () => {
  it("has one entry per role, in both languages", () => {
    for (const lang of ["en", "pt"] as const) {
      const roles = DATA_BY_LANG[lang].experiences.flatMap((e) => e.roles);
      const model = buildCvModel(lang);
      expect(model.jobs).toHaveLength(roles.length);
      expect(model.summary.join(" ")).not.toContain("{years}");
    }
  });

  it("uses the wording written for the CV, most relevant bullet first", () => {
    const blip = buildCvModel("en").jobs.find((j) => j.company === "Take Blip");
    expect(blip?.bullets[0]).toContain("generative AI");
    expect(blip?.technologies).toContain("Vue.js");
  });

  it("shows the ongoing postgraduate degree as in progress", () => {
    expect(buildCvModel("en").education.at(-1)?.period).toMatch(/In progress$/);
    expect(buildCvModel("pt").education.at(-1)?.period).toMatch(/Em andamento$/);
  });
});

describe("generateCv", () => {
  it.each(["en", "pt"] as const)(
    "renders the %s CV in at most 2 pages",
    async (lang) => {
      const renderer = createPdfRenderer(FONTS);
      const { blob, fileName } = await generateCv(lang, renderer);
      const bytes = await blob.arrayBuffer();

      expect(new TextDecoder().decode(bytes.slice(0, 5))).toBe("%PDF-");
      expect(countPdfPages(bytes)).toBeLessThanOrEqual(2);

      const out = process.env.CV_OUT_DIR;
      if (out) {
        mkdirSync(out, { recursive: true });
        writeFileSync(path.join(out, fileName), Buffer.from(bytes));
      }
    },
    60_000,
  );
});
