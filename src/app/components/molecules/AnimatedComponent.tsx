"use client";

import { createElement, useEffect, useRef } from "react";
import { mergeClassNames } from "@/utils/classNames";
import { onceInView } from "@/utils/reveal";

interface AnimatedComponentProps {
  HTMLtag: keyof React.JSX.IntrinsicElements;
  children?: React.ReactNode;
  forceView?: boolean;
  disableAnimation?: boolean;
  className?: string;
  delay?: number;
  slideUp?: boolean;
}

// Reveal-on-scroll done in CSS. The element renders hidden
// (`data-reveal="pending"`), a shared observer flips it to "in" when it
// enters the viewport (a CSS transition does the animation) and to "done"
// afterwards, so the reveal rules stop overriding the element's own styles.
// See the `[data-reveal]` rules in globals.css.
export default function AnimatedComponent({
  children,
  className,
  HTMLtag,
  forceView = false,
  disableAnimation = false,
  delay = 0,
  slideUp = false,
  ...rest
}: AnimatedComponentProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || disableAnimation) return;

    const reveal = () => {
      element.dataset.reveal = "in";

      const finish = (event: TransitionEvent) => {
        if (event.target !== element) return;
        element.dataset.reveal = "done";
        element.removeEventListener("transitionend", finish);
      };
      element.addEventListener("transitionend", finish);
    };

    if (forceView) {
      const frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    }

    return onceInView(element, reveal);
  }, [forceView, disableAnimation]);

  return createElement(
    HTMLtag,
    {
      ref,
      className: mergeClassNames(className),
      ...(!disableAnimation && {
        "data-reveal": "pending",
        "data-reveal-from": slideUp ? "top" : undefined,
        style: delay ? { "--reveal-delay": `${delay}s` } : undefined,
      }),
      ...rest,
    },
    children,
  );
}
