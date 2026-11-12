// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DownloadCvButton from "@/app/components/molecules/DownloadCvButton";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { downloadCv } from "@/cv/downloadCv";
import { Toast } from "@/app/components/organisms/Toast";
import { dictionary, type Lang } from "@/i18n/dictionary";

vi.mock("@/cv/downloadCv", () => ({ downloadCv: vi.fn() }));
vi.mock("@/app/components/organisms/Toast", () => ({
  Toast: { error: vi.fn(), success: vi.fn(), info: vi.fn(), loading: vi.fn() },
}));

const download = vi.mocked(downloadCv);

function renderButton(lang: Lang = "en") {
  render(
    <LanguageProvider lang={lang}>
      <DownloadCvButton />
    </LanguageProvider>,
  );
  return screen.getByRole("button") as HTMLButtonElement;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(cleanup);

describe("DownloadCvButton", () => {
  it.each(["en", "pt"] as const)(
    "shows the %s label and asks for the CV in that language",
    async (lang) => {
      download.mockResolvedValue();
      const button = renderButton(lang);

      expect(button.textContent).toContain(dictionary[lang]["cover.cv"]);
      await userEvent.click(button);

      expect(download).toHaveBeenCalledTimes(1);
      expect(download).toHaveBeenCalledWith(lang);
    },
  );

  it("is disabled while the CV is being generated and works again after", async () => {
    let finish: () => void = () => {};
    download.mockReturnValue(new Promise<void>((resolve) => (finish = resolve)));
    const button = renderButton();

    await userEvent.click(button);
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");

    // A second click while busy must not start another generation.
    await userEvent.click(button);
    expect(download).toHaveBeenCalledTimes(1);

    finish();
    await waitFor(() => expect(button.disabled).toBe(false));
  });

  it("warns the visitor when the CV cannot be generated", async () => {
    download.mockRejectedValue(new Error("boom"));
    const button = renderButton("pt");

    await userEvent.click(button);

    await waitFor(() =>
      expect(Toast.error).toHaveBeenCalledWith(dictionary.pt["cover.cvError"]),
    );
    expect(button.disabled).toBe(false);
  });
});
