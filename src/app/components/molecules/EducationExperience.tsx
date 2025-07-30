import { getCompactDuration, formatedDateMonthYear } from "@/utils/date";
import { BiBriefcase } from "react-icons/bi";
import AnimatedComponent from "./AnimatedComponent";
import { mergeClassNames } from "@/utils/classNames";

interface EducationExtraCurricularProps {
  role: string;
  start: string;
  end: string;
  description: string;
  className?: string;
  university: string;
}

export default function EducationExtraCurricular({
  role,
  description,
  start,
  end,
  className,
  university,
}: EducationExtraCurricularProps) {
  return (
    <AnimatedComponent
      HTMLtag="div"
      className={mergeClassNames(
        "text-md border-l-2 border-[var(--action)] ml-8 pl-4 pb-6",
        className
      )}
    >
      <div className="sm:mb-1 flex items-start sm:items-center gap-2">
        <BiBriefcase
          size={18}
          className="text-[var(--action)] w-5 h-5 shrink-0 mt-1 sm:mt-0"
        />
        <h3 className="font-semibold">{role}</h3>
      </div>

      <div className="text-[var(--color-foreground)]/40">
        <p className="flex items-center gap-2 py-1">
          <span>{university}</span>

          <span className="w-1 h-1 bg-[var(--color-foreground)]/40 rounded-full" />

          <span>{getCompactDuration(start, end)}</span>
        </p>
        <p className="italic">
          {formatedDateMonthYear(start)} - {formatedDateMonthYear(end)}
        </p>
      </div>

      <p className="mt-2 leading-relaxed text-gray-200">{description}</p>
    </AnimatedComponent>
  );
}
