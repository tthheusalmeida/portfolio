"use client";

import { mergeClassNames } from "@/utils/classNames";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface AnimatedComponentProps {
  HTMLtag: keyof typeof motion;
  children?: React.ReactNode;
  forceView?: boolean;
  disableAnimation?: boolean;
  className?: string;
  delay?: number;
}

export default function AnimatedComponent({
  children,
  className,
  HTMLtag,
  forceView = false,
  disableAnimation = false,
  delay = 0,
  ...rest
}: AnimatedComponentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const MotionComponent = motion[HTMLtag] as React.ElementType;
  const shouldAnimate = !disableAnimation && (forceView || isInView);

  return (
    <MotionComponent
      ref={ref}
      {...(!disableAnimation && {
        initial: { opacity: 0, y: 40, scale: 0.8 },
        animate: shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined,
        transition: { duration: 0.4, delay, ease: "easeOut" },
      })}
      className={mergeClassNames(className)}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
