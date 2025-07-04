interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(
  payload: EmailPayload
): Promise<{ success: boolean }> {
  const controller = new AbortController();
  const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
    controller.abort();
  }, 120000);

  try {
    const response: Response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        "Oops! We had a little trouble getting a response from the server. How about trying us on WhatsApp? We’re ready to help you there!"
      );
    }

    const data = (await response.json()) as { success: boolean };
    return data;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Timeout: Request takes too much time");
    }
    throw error;
  }
}
