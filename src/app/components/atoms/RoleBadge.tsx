import { mergeClassNames } from "@/utils/classNames";

interface RoleBadgeProps {
  children: string;
  className?: string;
}

// Single-line badge: long roles are truncated instead of wrapping, so the
// card height does not jump. The full text stays in the DOM (and in `title`).
export default function RoleBadge({ children, className }: RoleBadgeProps) {
  return (
    <span
      title={children}
      className={mergeClassNames(
        "block max-w-full truncate whitespace-nowrap",
        "px-2.5 py-1 rounded",
        "text-xs font-bold text-[var(--background)] bg-[var(--action)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
