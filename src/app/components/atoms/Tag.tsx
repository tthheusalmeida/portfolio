import { mergeClassNames } from "@/utils/classNames";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={mergeClassNames(
        "px-3 py-1",
        "text-xs font-normal capitalize select-none",
        "rounded-full transition-all duration-200",
        "bg-[var(--color-foreground)]/25",
        "hover:bg-[var(--color-foreground)]/10",
        className
      )}
    >
      {children}
    </span>
  );
}
