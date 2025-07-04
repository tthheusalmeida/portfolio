interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(payload: EmailPayload) {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error("Timeout: Request takes too much time")),
      500
    )
  );

  const fetchPromise = fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Erro na resposta do servidor");
    }
    const data = await response.json();
    return data as { success: boolean };
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}
