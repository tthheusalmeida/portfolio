import type { Lang } from "@/i18n/dictionary";

const FONT_BASE_URL = "/fonts/carlito";

function saveBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// The PDF engine is heavy, so it is only loaded when someone asks for the CV.
export async function downloadCv(lang: Lang): Promise<void> {
  const [{ generateCv }, { createPdfRenderer }] = await Promise.all([
    import("./generateCv"),
    import("./pdf/createPdfRenderer"),
  ]);

  const { blob, fileName } = await generateCv(
    lang,
    createPdfRenderer(FONT_BASE_URL),
  );
  saveBlob(blob, fileName);
}
