import { mergeClassNames } from "@/utils/classNames";

interface CoverLightProps {
  imageSrc: string;
}

/**
 * Light spilling from the laptop screen onto the hero picture.
 * Must be rendered inside a `relative` wrapper that has the same size as the
 * image; every position below is a percentage of that wrapper.
 *
 * Layers (back to front):
 *  1. soft halo behind the image (ambient glow)
 *  2. cone-shaped beam from the screen edge towards the face
 *  3. rim light on the silhouette (face + hands), masked by the image itself
 *  4. hot core on the screen edge (the source)
 */
export default function CoverLight({ imageSrc }: CoverLightProps) {
  const silhouetteMask = {
    maskImage: `url(${imageSrc})`,
    WebkitMaskImage: `url(${imageSrc})`,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  } as const;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* 1. ambient halo */}
      <div
        className={mergeClassNames(
          "absolute top-[30%] left-[0%] w-[60%] aspect-square z-0",
          "animate-soft-pulse"
        )}
      >
        <div className="h-full w-full rounded-full bg-[var(--action)] opacity-[0.16] blur-[48px] sm:blur-[68px]" />
      </div>

      {/* 2. beam: the screen faces the user, so seen from the side its surface
          is the slanted right edge of the lid (top ~12%/50%, bottom ~22%/93%).
          The light leaves that whole edge and spreads towards the face.
          Blur sits on the outer element so it softens the clipped shape. */}
      <div className="absolute inset-0 z-20 mix-blend-screen animate-screen-flicker blur-[14px] sm:blur-[22px]">
        <div
          className="h-full w-full"
          style={{
            clipPath: "polygon(12% 50%, 22% 93%, 66% 76%, 64% 8%)",
            background:
              "linear-gradient(to right, color-mix(in srgb, var(--action) 69%, transparent) 10%, color-mix(in srgb, var(--action) 29%, transparent) 40%, transparent 68%)",
          }}
        />
      </div>

      {/* 3. rim light: only paints where the image is opaque */}
      <div
        className="absolute inset-0 z-20 mix-blend-screen animate-screen-flicker"
        style={{
          ...silhouetteMask,
          background: [
            // face / beard, lit from the left (the side facing the screen)
            "radial-gradient(ellipse 15% 20% at 41% 34%, color-mix(in srgb, var(--action) 69%, transparent), transparent 70%)",
            // hands + keyboard
            "radial-gradient(ellipse 22% 11% at 37% 83%, color-mix(in srgb, var(--action) 65%, transparent), transparent 70%)",
            // front of the hoodie, faint
            "radial-gradient(ellipse 18% 20% at 56% 60%, color-mix(in srgb, var(--action) 20%, transparent), transparent 70%)",
          ].join(","),
        }}
      />

      {/* 4. hot line along the screen edge (where the light is born) */}
      <div className="absolute inset-0 z-20 mix-blend-screen animate-screen-flicker blur-[5px]">
        <div
          className="h-full w-full"
          style={{
            clipPath: "polygon(12% 50%, 15% 50%, 25% 93%, 22% 93%)",
            background: "color-mix(in srgb, var(--action) 85%, white)",
            opacity: 0.81,
          }}
        />
      </div>
    </div>
  );
}
