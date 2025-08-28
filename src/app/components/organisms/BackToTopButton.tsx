"use client";

import { mergeClassNames } from "@/utils/classNames";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function MoveToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={mergeClassNames(
        "fixed bottom-6 right-6 z-50 p-5 sm:p-3",
        "rounded-full shadow-lg transition-all duration-300",
        "bg-stone-800 hover:bg-stone-800/50",
        " text-[var(--action)]",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <FaArrowUp size={18} />
    </button>
  );
}
