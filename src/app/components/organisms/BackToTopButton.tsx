"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import { NAVIGATION_TAB_INDEX, scrollIntoSection } from "./NavigationTabs";
import { useTabs } from "@/contexts/TabsContext";
import { useLanguage } from "@/contexts/LanguageContext";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_AFTER_PX = 480;
const NEAR_END = 0.93;

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const { setActiveTab, setIsOnClickScrolling } = useTabs();
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, y / max) : 0;

      ringRef.current?.style.setProperty(
        "stroke-dashoffset",
        String(CIRCUMFERENCE * (1 - progress))
      );
      setIsVisible(y > SHOW_AFTER_PX);
      setIsNearEnd(progress > NEAR_END);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    setActiveTab(NAVIGATION_TAB_INDEX.HOME);
    setIsOnClickScrolling(true);
    scrollIntoSection(NAVIGATION_TAB_INDEX.HOME);

    setTimeout(() => setIsOnClickScrolling(false), 1200);
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={t("a11y.backToTop")}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-[88px] right-7 z-40 flex items-center justify-center
        w-11 h-11 rounded-full shadow-lg cursor-pointer
        transition-[opacity,transform,visibility,background-color,color] duration-300
        ${isNearEnd ? "bg-[var(--action)] text-stone-900" : "bg-stone-800 text-[var(--action)]"}
        ${
          isVisible
            ? "opacity-100 visible translate-y-0 hover:-translate-y-0.5"
            : "opacity-0 invisible translate-y-2.5 pointer-events-none"
        }`}
    >
      <svg
        viewBox="0 0 44 44"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full -rotate-90"
      >
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          strokeWidth={3}
          className="stroke-stone-600"
        />
        <circle
          ref={ringRef}
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          className={`transition-[stroke-dashoffset] duration-150 ease-linear ${
            isNearEnd ? "stroke-stone-900" : "stroke-[var(--action)]"
          }`}
        />
      </svg>
      <FaArrowUp size={16} className="relative" />
    </button>
  );
}
