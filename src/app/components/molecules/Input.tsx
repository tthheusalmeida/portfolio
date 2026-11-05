import { mergeClassNames } from "@/utils/classNames";
import AnimatedComponent from "./AnimatedComponent";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  type?: "text" | "email";
  autoComplete?: string;
}

export default function Input({
  id,
  label,
  placeholder,
  required,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  autoComplete,
}: InputProps) {
  const errorId = `${id}-error`;

  return (
    <AnimatedComponent HTMLtag="div">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-200"
      >
        <span>{label}</span> {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        onBlur={onBlur}
        className={mergeClassNames(
          "w-full px-2 py-2 rounded-md border-2 bg-[var(--color-background)]/60 text-gray-200",
          "placeholder:text-[var(--color-foreground)]/40 backdrop-blur-sm shadow-sm",
          "focus:outline-none focus:border-[var(--action)] transition-colors duration-300",
          error ? "border-red-400/70" : "border-[var(--color-foreground)]/25",
        )}
      />
      <p
        id={errorId}
        aria-live="polite"
        className="mt-1 min-h-5 text-sm text-red-400"
      >
        {error}
      </p>
    </AnimatedComponent>
  );
}
