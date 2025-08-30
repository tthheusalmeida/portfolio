import { getCompactDuration, formatedDateMonthYear } from "@/utils/date";
import { GoMilestone } from "react-icons/go";
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
        "text-base sm:text-lg border-l-2 border-[var(--action)] ml-7 sm:ml-18 pl-4 pb-6",
        className
      )}
    >
      <div className="sm:mb-1 flex items-start sm:items-center gap-2">
        <GoMilestone
          size={16}
          className="sm:hidden inline text-[var(--action)] w-5 h-5 mt-1 shrink-0"
        />

        <GoMilestone
          size={18}
          className="sm:inline hidden text-[var(--action)] w-5 h-5 mt-1 shrink-0"
        />
        <h3 className="font-semibold">{role}</h3>
      </div>

      <div className="text-[var(--color-foreground)]/40 text-xs sm:text-base">
        <p className="flex items-center gap-2 py-1">
          <span>{university}</span>

          <span className="w-1 h-1 bg-[var(--color-foreground)]/40 rounded-full" />

          <span>{getCompactDuration(start, end)}</span>
        </p>
        <p className="italic">
          {formatedDateMonthYear(start)} - {formatedDateMonthYear(end)}
        </p>
      </div>

      <p className="mt-2 leading-relaxed text-gray-200 text-xs sm:text-base">
        {description}
      </p>
    </AnimatedComponent>
  );
}
