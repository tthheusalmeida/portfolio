"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { stripLocale } from "@/i18n/routes";
import { mergeClassNames } from "@/utils/classNames";

export default function Logo({ className }: { className?: string }) {
  const pathname = usePathname();
  const { path } = useLanguage();

  const handleClick = (e: React.MouseEvent) => {
    if (stripLocale(pathname) === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href={path("/")}
      onClick={handleClick}
      className={mergeClassNames(
        "flex items-center gap-2.5 cursor-pointer text-xl sm:text-2xl",
        className,
      )}
    >
      <span className="opacity-20">{"<"}</span>
      {/* <span className="mix-blend-difference text-[var(--color-foreground)]">
        Matheus Almeida
      </span> */}

      <span>
        <span className="opacity-20">{"/"}</span>
        <span className="opacity-20">{">"}</span>
      </span>
    </Link>
  );
}
