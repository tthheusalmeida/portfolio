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

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-2 sm:left-1/2 top-0 h-full border-l-2 border-gray-300/40 -translate-x-1/2" />

      <div className="flex flex-col gap-16 sm:gap-20 relative">
        {items.map(({ component, date }, index) => {
          const cardOnLeft = isEven(index);

          return (
            <div
              key={`${date.start}-${index}`}
              className="group/row relative flex flex-col sm:flex-row sm:items-start pl-8 sm:pl-0"
            >
              <span
                aria-hidden
                className={mergeClassNames(
                  "absolute left-2 sm:left-1/2 top-3 sm:top-5 -translate-x-1/2 z-10",
                  "size-4 sm:size-6 rounded-full bg-gray-200",
                  "transition-all duration-300",
                  "group-has-[article:hover]/row:bg-[var(--action)] group-has-[article:hover]/row:scale-125",
                  "group-has-[article:hover]/row:drop-shadow-[0_0_6px_var(--action)]",
                  "group-has-[article:focus-within]/row:bg-[var(--action)] group-has-[article:focus-within]/row:scale-125",
                )}
              />

              <AnimatedComponent
                HTMLtag="div"
                className={mergeClassNames(
                  "w-full sm:w-1/2 mb-3 sm:mb-0 sm:pt-2",
                  cardOnLeft
                    ? "sm:order-2 sm:pl-12"
                    : "sm:order-1 sm:pr-12 sm:flex sm:justify-end",
                )}
              >
                <TimelineDate
                  {...date}
                  align={cardOnLeft ? "left" : "right"}
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
