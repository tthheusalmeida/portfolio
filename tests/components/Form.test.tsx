// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Form from "@/app/components/organisms/Form";
import { Toast } from "@/app/components/organisms/Toast";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { dictionary, type Lang } from "@/i18n/dictionary";
import { sendEmail } from "@/services/sendEmail";

vi.mock("@/services/sendEmail", () => ({ sendEmail: vi.fn() }));
vi.mock("@/app/components/organisms/Toast", () => ({
  Toast: { error: vi.fn(), success: vi.fn(), info: vi.fn(), loading: vi.fn() },
}));

const send = vi.mocked(sendEmail);

function renderForm(lang: Lang = "en") {
  const t = dictionary[lang];
  render(
    <LanguageProvider lang={lang}>
      <Form />
    </LanguageProvider>,
  );
  const field = (key: "form.name" | "form.email" | "form.message") =>
    screen.getByLabelText(new RegExp(t[key])) as HTMLInputElement;

  return {
    t,
    name: field("form.name"),
    email: field("form.email"),
    message: field("form.message"),
    submit: screen.getByRole("button", { name: new RegExp(t["form.send"]) }),
  };
}

async function fillValid(ui: ReturnType<typeof renderForm>) {
  await userEvent.type(ui.name, "Ana Souza");
  await userEvent.type(ui.email, "ana@mail.com");
  await userEvent.type(ui.message, "I need a developer & a plan");
}

beforeEach(() => vi.clearAllMocks());
afterEach(cleanup);

describe("contact Form", () => {
  it("shows validation errors and does not send an invalid form", async () => {
    const ui = renderForm();

    await userEvent.type(ui.name, "Al");
    await userEvent.type(ui.email, "not-an-email");
    await userEvent.click(ui.submit);

    expect(screen.getByText(ui.t["form.error.name"])).toBeTruthy();
    expect(screen.getByText(ui.t["form.error.email"])).toBeTruthy();
    expect(screen.getByText(ui.t["form.error.messageShort"])).toBeTruthy();
    expect(send).not.toHaveBeenCalled();
  });

  it("sends the e-mail, confirms and clears the fields", async () => {
    send.mockResolvedValue({ success: true });
    const ui = renderForm();

    await fillValid(ui);
    await userEvent.click(ui.submit);

    await waitFor(() => expect(Toast.success).toHaveBeenCalledWith(ui.t["form.success"]));
    expect(send).toHaveBeenCalledWith({
      name: "Ana Souza",
      from: "ana@mail.com",
      message: "I need a developer & a plan",
      type: "portfolio_job_offer",
      to: "dev.almeida.matheus@gmail.com",
    });
    expect(ui.name.value).toBe("");
    expect(ui.email.value).toBe("");
    expect(ui.message.value).toBe("");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it.each([
    ["the service answers without success", () => send.mockResolvedValue({ success: false }), "form.fail"],
    ["the request throws", () => send.mockRejectedValue(new Error("Timeout")), "form.unexpected"],
  ] as const)(
    "when %s, shows the error and a WhatsApp button with what was typed",
    async (_case, arrange, messageKey) => {
      arrange();
      const ui = renderForm();

      await fillValid(ui);
      await userEvent.click(ui.submit);

      const alert = await screen.findByRole("alert");
      expect(alert.textContent).toContain(ui.t[messageKey]);
      expect(alert.textContent).toContain(ui.t["form.whatsapp.hint"]);

      const link = screen.getByRole("link", {
        name: ui.t["form.whatsapp.button"],
      }) as HTMLAnchorElement;
      const url = new URL(link.href);
      expect(url.origin + url.pathname).toBe("https://wa.me/5538999460104");
      expect(url.searchParams.get("text")).toBe(
        "Hi! I'm Ana Souza (ana@mail.com). I need a developer & a plan",
      );

      // What the visitor typed is kept, so nothing has to be retyped.
      expect(ui.name.value).toBe("Ana Souza");
      expect(ui.message.value).toBe("I need a developer & a plan");
      expect(Toast.success).not.toHaveBeenCalled();
    },
  );

  it("uses the Portuguese texts and message on the Portuguese page", async () => {
    send.mockResolvedValue({ success: false });
    const ui = renderForm("pt");

    await fillValid(ui);
    await userEvent.click(ui.submit);

    await screen.findByRole("alert");
    const link = screen.getByRole("link", {
      name: ui.t["form.whatsapp.button"],
    }) as HTMLAnchorElement;
    expect(new URL(link.href).searchParams.get("text")).toBe(
      "Olá! Sou Ana Souza (ana@mail.com). I need a developer & a plan",
    );
  });

  it("clears the previous error when the visitor tries again successfully", async () => {
    send.mockResolvedValueOnce({ success: false }).mockResolvedValueOnce({ success: true });
    const ui = renderForm();

    await fillValid(ui);
    await userEvent.click(ui.submit);
    await screen.findByRole("alert");

    await userEvent.click(ui.submit);
    await waitFor(() => expect(Toast.success).toHaveBeenCalled());
    expect(screen.queryByRole("alert")).toBeNull();
  });
});
