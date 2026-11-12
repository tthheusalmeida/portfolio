// Returns `link` (a wa.me link) with its pre-filled message replaced by `text`.
// The text is URL-encoded, so any character is safe.
export function withWhatsAppText(link: string, text: string): string {
  const url = new URL(link);
  url.searchParams.set("text", text);
  return url.toString();
}

// Fills "{name}", "{email}" and "{message}" in a message template.
export function fillMessageTemplate(
  template: string,
  values: { name: string; email: string; message: string },
): string {
  return template
    .replace("{name}", values.name.trim())
    .replace("{email}", values.email.trim())
    .replace("{message}", values.message.trim());
}
