// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Modal from "@/app/components/molecules/Modal";
import { LanguageProvider } from "@/contexts/LanguageContext";

afterEach(cleanup);

function Harness({ onClose = () => {} }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <LanguageProvider lang="en">
      <button onClick={() => setOpen(true)}>open menu</button>
      <Modal
        isOpen={open}
        title="Menu"
        onClose={() => {
          onClose();
          setOpen(false);
        }}
      >
        <a href="#one">first link</a>
        <a href="#two">second link</a>
      </Modal>
    </LanguageProvider>
  );
}

async function openModal(onClose?: () => void) {
  render(<Harness onClose={onClose} />);
  const opener = screen.getByRole("button", { name: "open menu" });
  await userEvent.click(opener);
  return { opener, dialog: screen.getByRole("dialog") };
}

describe("Modal accessibility", () => {
  it("is announced as a modal dialog with a name", async () => {
    const { dialog } = await openModal();

    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("aria-label")).toBe("Menu");
  });

  it("moves the focus into the dialog when it opens", async () => {
    const { dialog } = await openModal();

    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Close" }),
    );
  });

  it("keeps Tab and Shift+Tab inside the dialog", async () => {
    await openModal();
    const close = screen.getByRole("button", { name: "Close" });
    const last = screen.getByRole("link", { name: "second link" });

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(last);

    await userEvent.tab();
    expect(document.activeElement).toBe(close);
  });

  it("closes with Escape and gives the focus back to the opener", async () => {
    const onClose = vi.fn();
    const { opener } = await openModal(onClose);

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(opener);
  });
});
