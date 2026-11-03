import { describe, expect, it } from "vitest";
import { DATA_BY_LANG } from "@/data";
import * as pt from "@/data/pt";
import { dictionary } from "@/i18n/dictionary";
import { localizedPath, stripLocale } from "@/i18n/routes";
import { getCopyrightYears } from "@/utils/date";

const en = DATA_BY_LANG.en;

describe("Portuguese data stays aligned with the English data", () => {
  it("has one override per item (translations are matched by index)", () => {
    expect(pt.experiences).toHaveLength(en.experiences.length);
    expect(pt.educations).toHaveLength(en.educations.length);
    expect(pt.certifications).toHaveLength(en.certifications.length);
    expect(pt.testimonials).toHaveLength(en.testimonials.length);
    expect(pt.projects).toHaveLength(en.projects.length);
    expect(pt.softSkills).toHaveLength(en.softSkills.length);
  });

  it("has the same number of achievements per experience", () => {
    pt.experiences.forEach((item, i) => {
      expect(item.achievements).toHaveLength(en.experiences[i].achievements.length);
    });
  });

  it("has the same number of education activities", () => {
    pt.educations.forEach((item, i) => {
      expect(item.experiences).toHaveLength(en.educations[i].experiences.length);
    });
  });

  it("only translates descriptions that exist in English", () => {
    pt.experiences.forEach((item, i) => {
      if ("description" in item) {
        expect(en.experiences[i].description).not.toBeNull();
      }
    });
  });
});

describe("dictionary", () => {
  it("has the same keys in every language and no empty text", () => {
    expect(Object.keys(dictionary.pt).sort()).toEqual(
      Object.keys(dictionary.en).sort()
    );
    Object.values(dictionary).forEach((texts) =>
      Object.values(texts).forEach((text) => expect(text.trim()).not.toBe(""))
    );
  });
});

describe("routes", () => {
  it("keeps Portuguese at the root and English under /en", () => {
    expect(localizedPath("pt", "/")).toBe("/");
    expect(localizedPath("pt", "/projects")).toBe("/projects/");
    expect(localizedPath("en", "/")).toBe("/en/");
    expect(localizedPath("en", "/projects")).toBe("/en/projects/");
  });

  it("strips the locale prefix and trailing slash", () => {
    expect(stripLocale("/")).toBe("/");
    expect(stripLocale("/projects/")).toBe("/projects");
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/")).toBe("/");
    expect(stripLocale("/en/projects/")).toBe("/projects");
  });
});

describe("copyright", () => {
  it("shows a range from the creation year to the current year", () => {
    expect(getCopyrightYears(2024)).toBe("2024");
    expect(getCopyrightYears(2026)).toBe("2024–2026");
  });
});
