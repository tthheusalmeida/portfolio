"use client";

import { useEffect, useRef } from "react";
import { onceInView } from "@/utils/reveal";

interface CountUpProps {
  value: number;
  duration?: number;
  delay?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Counts from 0 to `value` the first time it scrolls into view. Driven by
// requestAnimationFrame (not CSS @property), so it works on every mobile
// browser and is not cut short by the global reduced-motion rule. The final
// value is rendered by default (SSR / no JS) and the DOM is updated directly,
// so there are no re-renders per frame.
export default function CountUp({ value, duration = 2000, delay = 300 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    let timeout = 0;

    const cleanupObserver = onceInView(element, () => {
      element.textContent = "0";

      timeout = window.setTimeout(() => {
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          element.textContent = String(Math.round(value * easeOutCubic(progress)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
      }, delay);
    });

    return () => {
      cleanupObserver();
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [value, duration, delay]);

  return <span ref={ref}>{value}</span>;
}
