import { FaWhatsapp } from "react-icons/fa";

interface SendFailureNoticeProps {
  message: string;
  hint: string;
  buttonLabel: string;
  whatsappHref: string;
}

export default function SendFailureNotice({
  message,
  hint,
  buttonLabel,
  whatsappHref,
}: SendFailureNoticeProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-lg border border-red-400/40 bg-red-400/10 p-4 text-sm text-gray-200"
    >
      <p className="font-medium text-red-300">{message}</p>
      <p>{hint}</p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 self-start rounded-sm bg-[var(--action)] px-4 py-2 font-medium text-[var(--color-background)] transition-colors duration-200 hover:bg-[var(--action)]/80"
      >
        <FaWhatsapp size={20} aria-hidden="true" />
        {buttonLabel}
      </a>
    </div>
  );
}
