"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Button from "./Button";

interface RouterButtonProps {
  children: React.ReactNode;
  path: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function RouterButton({
  children,
  path,
  className,
  variant = "primary",
}: RouterButtonProps) {
  const router = useRouter();
  const { path: localePath } = useLanguage();

  if (!router) {
    return;
  }

  const handleOnClick = () => {
    router.push(localePath(`/${path}`));
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => handleOnClick()}
    >
      {children}
    </Button>
  );
}
