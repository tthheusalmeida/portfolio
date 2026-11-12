import type { Lang } from "@/i18n/dictionary";
import { buildCvModel } from "./build/buildCvModel";
import {
  DEFAULT_FIT_OPTIONS,
  fitToPages,
  type FitOptions,
} from "./fit/fitToPages";
import type { CvRenderer } from "./pdf/createPdfRenderer";

export interface GeneratedCv {
  blob: Blob;
  fileName: string;
}

// Use case: portfolio data -> CV model -> trimmed to fit -> PDF.
export async function generateCv(
  lang: Lang,
  renderer: CvRenderer,
  fitOptions: FitOptions = DEFAULT_FIT_OPTIONS,
): Promise<GeneratedCv> {
  const model = await fitToPages(
    buildCvModel(lang),
    renderer.countPages,
    fitOptions,
  );

  return { blob: await renderer.render(model), fileName: model.fileName };
}
