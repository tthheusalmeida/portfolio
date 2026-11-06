import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "@/generated/images.json";
import imageLoader, { resolveImage } from "@/utils/imageLoader";

const PUBLIC = join(process.cwd(), "public");
// Keep in sync with FOLDERS in scripts/optimize-images.mjs.
const FOLDERS = ["cover", "projects", "work", "educations", "certifications"];

const entries = Object.entries(manifest) as Array<
  [string, { width: number; variants: Array<{ w: number; src: string }> }]
>;

describe("image manifest (run `npm run images` when this fails)", () => {
  it("covers every .webp in the optimized folders", () => {
    const expected = FOLDERS.flatMap((folder) =>
      readdirSync(join(PUBLIC, folder))
        .filter((file) => file.endsWith(".webp"))
        .map((file) => `/${folder}/${file}`),
    );

    expect(Object.keys(manifest).sort()).toEqual(expected.sort());
  });

  it("points only at files that exist", () => {
    for (const [, entry] of entries) {
      for (const variant of entry.variants) {
        expect(existsSync(join(PUBLIC, variant.src)), variant.src).toBe(true);
      }
    }
  });

  it("always has a variant at the original size (no upscaling, no downscaling)", () => {
    for (const [src, entry] of entries) {
      expect(entry.variants.some((v) => v.w === entry.width), src).toBe(true);
      expect(Math.max(...entry.variants.map((v) => v.w)), src).toBe(entry.width);
    }
  });
});

describe("image loader", () => {
  const wide = entries.find(([, entry]) => entry.variants.length > 1);

  it("serves the smallest variant that is wide enough", () => {
    expect(wide).toBeDefined();
    const [src, entry] = wide!;
    const [small, full] = [...entry.variants].sort((a, b) => a.w - b.w);

    const file = (width: number) => resolveImage(src, width).split("?")[0];

    expect(file(small.w - 1)).toBe(small.src);
    expect(file(small.w)).toBe(small.src);
    expect(file(small.w + 1)).toBe(full.src);
  });

  it("never goes past the biggest variant", () => {
    const [src, entry] = wide!;
    const full = entry.variants.find((v) => v.w === entry.width)!;

    const url = imageLoader({ src, width: 4000 });
    expect(url.split("?")[0]).toBe(full.src);
  });

  it("never returns the exact URL it was given (next/image dev warning)", () => {
    expect(resolveImage("/cover/aws.svg", 64)).toBe("/cover/aws.svg?v=1");
    expect(resolveImage("https://example.com/a.png?x=1", 64)).toBe(
      "https://example.com/a.png?x=1&v=1",
    );

    for (const [src, entry] of entries) {
      for (const variant of entry.variants) {
        expect(resolveImage(src, variant.w), src).not.toBe(src);
      }
    }
  });
});
