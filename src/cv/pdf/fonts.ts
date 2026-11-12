import { Font } from "@react-pdf/renderer";
import { FONT_FAMILY } from "./theme";

const WEIGHTS = [400, 700] as const;

let registeredBase: string | null = null;

// `baseUrl` is a URL in the browser ("/fonts/carlito") or a folder in Node.
export function registerCvFonts(baseUrl: string): void {
  if (registeredBase === baseUrl) return;

  Font.register({
    family: FONT_FAMILY,
    fonts: WEIGHTS.map((fontWeight) => ({
      src: `${baseUrl}/carlito-latin-${fontWeight}-normal.woff`,
      fontWeight,
    })),
  });
  // Never split words with hyphens: it breaks keyword matching in ATS.
  Font.registerHyphenationCallback((word) => [word]);

  registeredBase = baseUrl;
}
