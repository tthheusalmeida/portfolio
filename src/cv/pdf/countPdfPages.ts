// Counts page objects ("/Type /Page") in a PDF. Page dictionaries are written
// uncompressed by the renderer, so a text scan is enough and avoids pulling
// a PDF parser into the bundle.
export function countPdfPages(bytes: ArrayBuffer): number {
  const text = new TextDecoder("latin1").decode(bytes);
  return text.match(/\/Type\s*\/Page(?![s\w])/g)?.length ?? 0;
}
