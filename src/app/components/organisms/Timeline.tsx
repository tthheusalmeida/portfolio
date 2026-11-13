"use client";

import { useEffect, useRef } from "react";
import { isEven } from "@/utils/math";
import TimelineDate, { TimelineDateProps } from "../atoms/TimelineDate";
import { mergeClassNames } from "@/utils/classNames";
import AnimatedComponent from "../molecules/AnimatedComponent";

export interface TimelineItem {
  component: React.ReactNode;
  date: TimelineDateProps;
}

interface TimelineProps {
  items: Array<TimelineItem>;
}

// Fraction of the viewport height where the dot sits while scrolling.
const REFERENCE = 0.4;
// Scroll distance (px) over which the dot is born / dies at the ends.
const FADE = 48;

// A single dot follows the scroll down the central line and lights it up
// behind it: it is born when the timeline arrives and dies when it ends.
export default function Timeline({ items }: TimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!root || !fill || !dot) return;

    let ticking = false;

    // Only transform and opacity are written, so scrolling never triggers layout:
    // the fill is a full-height line scaled from its top.
    const update = () => {
      ticking = false;
      const { top, height } = root.getBoundingClientRect();
      const passed = window.innerHeight * REFERENCE - top; // px of the timeline above the reference line
      const y = Math.min(height, Math.max(0, passed));
      const life = Math.max(0, Math.min(1, passed / FADE, (height - passed) / FADE));

      fill.style.transform = `translateX(-50%) scaleY(${height > 0 ? y / height : 0})`;
      dot.style.opacity = String(life);
      dot.style.transform = `translate3d(-50%, ${y - dot.offsetHeight / 2}px, 0) scale(${life})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // The scroll listener only lives while the timeline is near the screen.
    let listening = false;
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      const method = on ? "addEventListener" : "removeEventListener";
      window[method]("scroll", onScroll);
      window[method]("resize", onScroll);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        listen(entry.isIntersecting);
        if (entry.isIntersecting) update();
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(root);
    update();

    return () => {
      io.disconnect();
      listen(false);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      <div
        aria-hidden
        className="absolute left-2 sm:left-1/2 top-0 h-full border-l-2 border-gray-300/40 -translate-x-1/2"
      />
      <div
        ref={fillRef}
        aria-hidden
        className="absolute left-2 sm:left-1/2 top-0 h-full w-[2px] origin-top bg-[var(--foreground)] will-change-transform"
        style={{ transform: "translateX(-50%) scaleY(0)" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        style={{ opacity: 0 }}
        className="absolute left-2 sm:left-1/2 top-0 z-10 size-4 sm:size-6 rounded-full bg-[var(--foreground)] shadow-[0_0_8px_rgba(255,255,255,0.6)] will-change-transform"
      />

      <div className="flex flex-col gap-16 sm:gap-20 relative">
        {items.map(({ component, date }, index) => {
          const cardOnLeft = isEven(index);

          return (
            <div
              key={`${date.start}-${index}`}
              className="group/row relative flex flex-col sm:flex-row sm:items-start pl-8 sm:pl-0"
            >
              <AnimatedComponent
                HTMLtag="div"
                className={mergeClassNames(
                  "w-full sm:w-1/2 mb-3 sm:mb-0 sm:pt-2 sm:self-stretch sm:items-start",
                  cardOnLeft
                    ? "sm:order-2 sm:pl-12"
                    : "sm:order-1 sm:pr-12 sm:flex sm:justify-end",
                )}
              >
                <TimelineDate
                  {...date}
                  align={cardOnLeft ? "left" : "right"}
                  className="relative z-[35] sm:sticky sm:top-24"
                />
              </AnimatedComponent>

              <AnimatedComponent
                HTMLtag="div"
                className={mergeClassNames(
                  "w-full sm:w-1/2 flex",
                  cardOnLeft
                    ? "sm:order-1 sm:pr-12 sm:justify-end"
                    : "sm:order-2 sm:pl-12 sm:justify-start",
                )}
              >
                {component}
              </AnimatedComponent>
            </div>
          );
        })}
      </div>
    </div>
  );
}
