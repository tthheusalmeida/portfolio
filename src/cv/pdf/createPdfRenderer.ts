import { pdf } from "@react-pdf/renderer";
import type { CvModel } from "../types";
import CvPdfDocument from "./CvPdfDocument";
import { countPdfPages } from "./countPdfPages";
import { registerCvFonts } from "./fonts";

export interface CvRenderer {
  render(model: CvModel): Promise<Blob>;
  countPages(model: CvModel): Promise<number>;
}

export function createPdfRenderer(fontBaseUrl: string): CvRenderer {
  registerCvFonts(fontBaseUrl);

  const render = (model: CvModel) =>
    pdf(CvPdfDocument({ model })).toBlob();

  return {
    render,
    countPages: async (model) =>
      countPdfPages(await (await render(model)).arrayBuffer()),
  };
}
