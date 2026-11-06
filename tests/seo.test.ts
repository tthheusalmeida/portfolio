import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  pageMetadata,
  profilePageJsonLd,
  projectsJsonLd,
  siteJsonLd,
} from "@/seo/metadata";
import { DATA_BY_LANG } from "@/data";

const LANGS = ["pt", "en"] as const;

describe("social preview", () => {
  it.each(LANGS)("sets Open Graph and Twitter card images (%s)", (lang) => {
    for (const path of ["/", "/projects"] as const) {
      const meta = pageMetadata(lang, path);
      const og = meta.openGraph?.images as Array<{ url: string; width: number; height: number; alt: string }>;

      expect(og).toHaveLength(1);
      expect(og[0]).toMatchObject({ url: "/og-image.jpg", width: 1200, height: 630 });
      expect(og[0].alt).toBeTruthy();
      expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
      expect(meta.twitter?.title).toBe(meta.openGraph?.title);
    }
  });

  it("ships the image that the metadata points at", () => {
    expect(existsSync(join(process.cwd(), "public/og-image.jpg"))).toBe(true);
  });
});

describe("structured data", () => {
  it.each(LANGS)("links the page entities to the same person (%s)", (lang) => {
    const graph = siteJsonLd(lang)["@graph"];
    const person = graph.find((node) => node["@type"] === "Person");
    const site = graph.find((node) => node["@type"] === "WebSite");

    expect(person?.["@id"]).toBeTruthy();
    expect(site?.publisher).toEqual({ "@id": person?.["@id"] });
    expect(profilePageJsonLd(lang).mainEntity).toEqual({ "@id": person?.["@id"] });
    expect(projectsJsonLd(lang).author).toEqual({ "@id": person?.["@id"] });
  });

  it.each(LANGS)("lists every project once, in order (%s)", (lang) => {
    const items = projectsJsonLd(lang).mainEntity.itemListElement;
    const projects = DATA_BY_LANG[lang].projects;

    expect(items).toHaveLength(projects.length);
    items.forEach((entry, i) => {
      expect(entry.position).toBe(i + 1);
      expect(entry.item.name).toBe(projects[i].title);
      expect(entry.item.url).toBe(projects[i].link);
      expect(entry.item.description).not.toMatch(/\s{2,}|\n/);
    });
  });

  it("uses the language of each route", () => {
    expect(profilePageJsonLd("pt").inLanguage).toBe("pt-BR");
    expect(profilePageJsonLd("en").inLanguage).toBe("en");
  });
});
