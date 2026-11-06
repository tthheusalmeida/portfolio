import manifest from "@/generated/images.json";

interface Variant {
  w: number;
  src: string;
}

const VARIANTS = manifest as Record<
  string,
  { width: number; height: number; variants: Variant[] }
>;

// Appended to files served as they are (SVGs, PNGs, WebPs that AVIF did not
// beat). next/image warns in development when a custom loader returns the
// same URL it was given; this also gives those non-hashed files a version to
// bump when one of them is replaced.
const PASSTHROUGH_VERSION = "v=1";

function passthrough(src: string): string {
  return `${src}${src.includes("?") ? "&" : "?"}${PASSTHROUGH_VERSION}`;
}

// Picks the smallest pre-generated variant that is at least `width` px wide
// (or the biggest one when none is). Files that are not in the manifest, such
// as SVGs and external images, are served as they are.
export function resolveImage(src: string, width: number): string {
  const entry = VARIANTS[src];
  if (!entry) return passthrough(src);

  const sorted = [...entry.variants].sort((a, b) => a.w - b.w);
  const match = sorted.find((variant) => variant.w >= width);
  const { src: file } = match ?? sorted[sorted.length - 1];

  // Generated AVIFs carry a content hash in their name; the original files do not.
  return file.startsWith("/optimized/") ? file : passthrough(file);
}

// next/image loader. The site is a static export, so there is no image
// server: variants are generated ahead of time by `npm run images`.
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  return resolveImage(src, width);
}
