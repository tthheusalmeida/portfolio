import { describe, expect, it } from "vitest";
import { fillMessageTemplate, withWhatsAppText } from "@/utils/whatsapp";

const LINK = "https://wa.me/5538999460104?text=Hi! I’m looking for help";

describe("withWhatsAppText", () => {
  it("keeps the number and replaces the pre-filled message", () => {
    const url = new URL(withWhatsAppText(LINK, "Hello there"));

    expect(url.origin + url.pathname).toBe("https://wa.me/5538999460104");
    expect(url.searchParams.get("text")).toBe("Hello there");
  });

  it("encodes line breaks, accents and symbols", () => {
    const text = "Olá! Sou João & cia\nlinha 2 #1";
    const url = new URL(withWhatsAppText(LINK, text));

    expect(url.searchParams.get("text")).toBe(text);
    expect(url.search).not.toContain("\n");
    expect(url.search).not.toContain("&cia");
  });
});

describe("fillMessageTemplate", () => {
  it("fills name, email and message, trimming them", () => {
    expect(
      fillMessageTemplate("Hi! I'm {name} ({email}). {message}", {
        name: " Ana ",
        email: "ana@mail.com ",
        message: " Let's talk ",
      }),
    ).toBe("Hi! I'm Ana (ana@mail.com). Let's talk");
  });
});
