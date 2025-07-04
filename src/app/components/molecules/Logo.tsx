import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2.5 cursor-pointer text-xl sm:text-2xl"
      >
        <span className="opacity-20">{"<"}</span>
        <span className="mix-blend-difference text-[var(--color-foreground)]">
          Matheus Almeida
        </span>
        <span className="opacity-20">{"/>"}</span>
      </Link>
    </>
  );
}
