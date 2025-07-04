"use client";

import { mergeClassNames } from "@/utils/classNames";
import { VscLoading } from "react-icons/vsc";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "normal";
  shadow?: boolean;
  isFull?: boolean;
  isLoading?: boolean;
}

const buttonVariants = {
  primary: "bg-gray-200 text-black hover:enabled:bg-gray-200/80",
  secondary: "bg-gray-200/10 text-gray-200 hover:enabled:bg-gray-200/20",
};

const isLodingVariants = {
  primary: "animate-spin text-white",
  secondary: "animate-spin text-white",
};

const sizeVariants = {
  small: "px-2 py-1 gap-2",
  normal: "px-4 py-2 gap-4",
};

export default function Button({
  children,
  className,
  variant,
  shadow = false,
  isFull = true,
  isLoading = false,
  size = "normal",
  ...rest
}: ButtonProps) {
  const componentClasses = [
    "flex relative inline-flex justify-center items-center",
    sizeVariants[size],
    "text-sm font-medium",
    "transition-all duration-200 cursor-pointer",
    "disabled:cursor-not-allowed",
    "rounded-sm",
    isFull ? "w-full" : "",
    shadow ? "shadow-md" : "",
    variant ? buttonVariants[variant] : "",
    className ?? "",
  ].join(" ");

  const childrenClasses = [
    "flex items-center gap-4",
    "select-none",
    isLoading ? "invisible" : "visible",
  ].join(" ");

  const loadingClasses = [
    "absolute",
    "left-1/2 -translate-x-1/2",
    variant ? isLodingVariants[variant] : "",
  ].join(" ");

  return (
    <button className={`${mergeClassNames(componentClasses)} `} {...rest}>
      <span className={childrenClasses}>{children}</span>
      {isLoading && <VscLoading size={20} className={loadingClasses} />}
    </button>
  );
}
