import EducationExtraCurricular from "../molecules/EducationExperience";
import { VscMortarBoard } from "react-icons/vsc";
import { formatedDate } from "@/utils/date";
import { EducationView } from "@/data/view";

export default function Education({
  title,
  abbreviation,
  university,
  start,
  end,
  experiences,
}: EducationView) {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] sm:p-6 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start pb-2 mb-4">
        <div className="flex gap-2">
          <VscMortarBoard size={24} className="mt-1 text-[var(--action)]" />
          <div className="flex flex-col items-baseline">
            <h2 className="text-xl font-semibold">
              <span className="font-bold">({abbreviation}) </span>
              {title}
            </h2>
            <p className="text-[var(--color-foreground)]/40">
              {university.name} ({university.abbreviation})
            </p>
            <p className="text-[var(--color-foreground)]/40 italic">
              {university.originalName}
            </p>
          </div>
        </div>
        <span className="ml-8 sm:m-0 text-[var(--color-foreground)]/40 text-sm mt-1">
          {formatedDate(start)} - {formatedDate(end)}
        </span>
      </div>

      {/* Experiences */}
      <div className="border-l-2 border-[var(--action)] ml-8 pl-4 space-y-6 relative">
        {experiences.map((exp, index) => (
          <EducationExtraCurricular
            role={exp.role}
            start={exp.start}
            end={exp.end}
            description={exp.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
