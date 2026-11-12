// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { downloadCv } from "@/cv/downloadCv";
import { generateCv } from "@/cv/generateCv";
import { createPdfRenderer } from "@/cv/pdf/createPdfRenderer";

vi.mock("@/cv/generateCv", () => ({ generateCv: vi.fn() }));
vi.mock("@/cv/pdf/createPdfRenderer", () => ({ createPdfRenderer: vi.fn() }));

const blob = new Blob(["%PDF-"], { type: "application/pdf" });

beforeEach(() => {
  vi.mocked(createPdfRenderer).mockReturnValue({} as never);
  vi.mocked(generateCv).mockResolvedValue({ blob, fileName: "cv-test.pdf" });
  URL.createObjectURL = vi.fn(() => "blob:cv");
  URL.revokeObjectURL = vi.fn();
});
afterEach(() => vi.restoreAllMocks());

describe("downloadCv", () => {
  it("generates the CV in the given language and saves it with its file name", async () => {
    let saved: { href: string; download: string } | null = null;
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      saved = { href: this.href, download: this.download };
    });

    await downloadCv("pt");

    expect(generateCv).toHaveBeenCalledWith("pt", expect.anything());
    expect(createPdfRenderer).toHaveBeenCalledWith("/fonts/carlito");
    expect(saved).toEqual({ href: "blob:cv", download: "cv-test.pdf" });
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:cv");
    expect(document.querySelector("a[download]")).toBeNull();
  });

  it("does not save anything when the generation fails", async () => {
    vi.mocked(generateCv).mockRejectedValue(new Error("fail"));
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click");

    await expect(downloadCv("en")).rejects.toThrow("fail");
    expect(click).not.toHaveBeenCalled();
  });
});
