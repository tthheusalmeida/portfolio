// Generates the AVIF versions of the site images and a manifest the image
// loader (src/utils/imageLoader.ts) reads. Run it after adding or changing a
// .webp in the folders below:  npm run images
//
// Quality policy: AVIF at quality 80 (4:4:4, PSNR 43-48 dB against the
// source, i.e. visually identical). A file is only replaced by its AVIF when
// that is clearly smaller; otherwise the original WebP is kept untouched.
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const OUT_DIR = join(PUBLIC, "optimized");
const MANIFEST = join(ROOT, "src/generated/images.json");

const FOLDERS = ["cover", "projects", "work", "educations", "certifications"];
const AVIF = { quality: 80, effort: 9, chromaSubsampling: "4:4:4" };
// Wide pictures also get a smaller variant for 1x screens and small viewports.
const SMALL_WIDTH = 640;
const WIDE_FROM = 800;
// Keep the AVIF only when it saves at least this share of the WebP size.
const MIN_SAVING = 0.1;

const hash = (buffer) =>
  createHash("sha1").update(buffer).digest("hex").slice(0, 8);

async function build(webpPath, publicPath, width, sourceWidth) {
  const original = await readFile(webpPath);
  const pipeline = sharp(original);
  if (width < sourceWidth) pipeline.resize({ width, kernel: "lanczos3" });

  const avif = await pipeline.avif(AVIF).toBuffer();
  const isFull = width === sourceWidth;
  // A resized variant is always worth it; the full size must beat the WebP.
  if (isFull && avif.length > original.length * (1 - MIN_SAVING)) {
    return { w: width, src: publicPath, bytes: original.length };
  }

  const name = publicPath.replace(/^\//, "").replace(/\.webp$/, "");
  const file = `${name}-${width}.${hash(avif)}.avif`;
  await mkdir(dirname(join(OUT_DIR, file)), { recursive: true });
  await writeFile(join(OUT_DIR, file), avif);
  return { w: width, src: `/optimized/${file}`, bytes: avif.length };
}

await rm(OUT_DIR, { recursive: true, force: true });
const manifest = {};

for (const folder of FOLDERS) {
  const names = (await readdir(join(PUBLIC, folder))).filter((f) =>
    f.endsWith(".webp"),
  );

  for (const file of names.sort()) {
    const publicPath = `/${folder}/${file}`;
    const webpPath = join(PUBLIC, folder, file);
    const { width, height } = await sharp(webpPath).metadata();
    const widths = width > WIDE_FROM ? [SMALL_WIDTH, width] : [width];

    const variants = [];
    for (const w of widths) {
      variants.push(await build(webpPath, publicPath, w, width));
    }
    manifest[publicPath] = { width, height, variants };

    const before = (await readFile(webpPath)).length;
    const list = variants
      .map((v) => `${v.w}w ${v.src.endsWith(".avif") ? "avif" : "webp"} ${v.bytes}`)
      .join(" | ");
    console.log(`${publicPath.padEnd(48)} webp ${before} -> ${list}`);
  }
}

await mkdir(dirname(MANIFEST), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
