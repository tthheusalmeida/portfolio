import type { MetadataRoute } from "next";
import { PAGES, absoluteUrl } from "@/i18n/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    (["pt", "en"] as const).map((lang) => ({
      url: absoluteUrl(lang, path),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: {
          "pt-BR": absoluteUrl("pt", path),
          en: absoluteUrl("en", path),
        },
      },
    }))
  );
}
