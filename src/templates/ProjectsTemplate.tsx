"use client";

import { useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import TitleAndSubtitleSection from "@/app/components/molecules/TitleAndSubtitleSection";
import SectionTemplate from "./SectionTemplate";
import VIEW from "@/data/view";
import Project from "@/app/components/molecules/Project";
import CTASection from "@/app/components/organisms/CTASection";
import FiltersBar from "@/app/components/organisms/FiltersBar";
import { useMemo } from "react";
import { ProjectView } from "@/data/view";

const createLabelValueObject = (labels: Array<string> | Set<string>) => {
  const labelsArray = [{ label: "All", value: "" }];

  labels.forEach((label) => labelsArray.push({ label: label, value: label }));

  labelsArray.sort((a, b) => (a.label >= b.label ? 1 : -1));
  return labelsArray;
};

export default function ProjectsTemplate() {
  const technologies = new Set<string>();
  VIEW.projects.forEach((project) =>
    project.technologies.forEach((technology) => technologies.add(technology))
  );

  const filters = [
    {
      key: "categories",
      options: [
        { label: "All", value: "" },
        { label: "Personal", value: "personal" },
        { label: "Freelancer", value: "freelancer" },
        { label: "Pro bono", value: "probono" },
      ],
    },
    {
      key: "technologies",
      options: createLabelValueObject(technologies),
    },
  ];

  const initialFilterState = filters.reduce((acc, { key }) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);
  const [filterState, setFilterState] = useState(initialFilterState);
  const filtersKeys = filters.map(({ key }) => key as keyof ProjectView);

  const handleFilterChange = (label: string, value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const projectsView = useMemo(() => {
    let filteredProjects = [...VIEW.projects];

    filtersKeys.forEach((key) => {
      const filterValue = filterState[key];
      if (filterValue) {
        filteredProjects = filteredProjects.filter((project) => {
          const field = project[key];
          if (Array.isArray(field)) {
            return field.includes(filterValue);
          } else {
            return field === filterValue;
          }
        });
      }
    });

    return filteredProjects;
  }, [filterState, filtersKeys]);

  return (
    <PageLayout>
      <SectionTemplate>
        <TitleAndSubtitleSection
          title="Projects"
          subtitle={
            <>
              A collection of <span className="font-bold">freelance</span>,{" "}
              <span className="font-bold">personal</span>, and{" "}
              <span className="font-bold">pro bono</span> projects that shaped
              my journey
            </>
          }
          className="my-16 sm:mt-28 sm:mb-12"
        >
          <div className="w-full flex justify-center">
            <FiltersBar filters={filters} onChange={handleFilterChange} />
          </div>

          <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projectsView.map((project, index) => (
              <Project key={index} {...project} className="w-full" />
            ))}
          </div>
        </TitleAndSubtitleSection>

        <CTASection />
      </SectionTemplate>
    </PageLayout>
  );
}
