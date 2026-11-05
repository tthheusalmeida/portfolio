import { mergeClassNames } from "@/utils/classNames";
import AnimatedComponent from "./AnimatedComponent";

interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  error?: string;
  counter?: React.ReactNode;
}

export default function Textarea({
  id,
  label,
  placeholder,
  required,
  value,
  onChange,
  onBlur,
  error,
  counter,
}: TextareaProps) {
  const errorId = `${id}-error`;

  return (
    <AnimatedComponent HTMLtag="div">
      <div className="flex items-baseline justify-between mb-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-200">
          <span>{label}</span> {required && "*"}
        </label>
        {counter}
      </div>
      <textarea
        id={id}
        name={id}
        rows={6}
        value={value}
        placeholder={placeholder}
        maxLength={500}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        onBlur={onBlur}
        className={mergeClassNames(
          "w-full px-2 py-2 rounded-md border-2 bg-[var(--color-background)]/60 text-gray-200",
          "placeholder:text-[var(--color-foreground)]/40 backdrop-blur-sm shadow-sm",
          "focus:outline-none focus:border-[var(--action)] transition-colors duration-300",
          "resize-none custom-scrollbar",
          error ? "border-red-400/70" : "border-[var(--color-foreground)]/25",
        )}
      ></textarea>
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
