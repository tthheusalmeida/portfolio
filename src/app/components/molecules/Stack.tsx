import { mergeClassNames } from "@/utils/classNames";
import SVGGlow from "./SVGGlow";
import VIEW from "@/data/view";

interface StackProps {
  className?: string;
}

export default function Stack({ className }: StackProps) {
  const items = VIEW.stack;

  return (
    <div
      className={mergeClassNames(
        "flex flex-col gap-4 items-center sm:items-start ",
        className
      )}
    >
      <span className="text-base">My favorite stack</span>

      <div className="flex gap-4">
        {items.map(({ name, color }, index) => (
          <SVGGlow
            key={index}
            label={name}
            src={`/cover/${name}.svg`}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}
