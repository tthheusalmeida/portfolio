"use client";

import { useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import TitleAndSubtitleSection from "@/app/components/molecules/TitleAndSubtitleSection";
import SectionTemplate from "./SectionTemplate";
import { useLanguage, useData } from "@/contexts/LanguageContext";
import Project from "@/app/components/molecules/Project";
import CTASection from "@/app/components/organisms/ContactSection";
import FiltersBar from "@/app/components/organisms/FiltersBar";
import { useMemo } from "react";
import { ProjectInterface } from "@/data/project";
import { motion, AnimatePresence } from "motion/react";
import AnimatedComponent from "@/app/components/molecules/AnimatedComponent";

const createLabelValueObject = (
  labels: Array<string> | Set<string>,
  allLabel: string
) => {
  const labelsArray = Array<{ label: string; value: string }>();

  labels.forEach((label) => labelsArray.push({ label: label, value: label }));

  labelsArray.sort((a, b) => (a.label >= b.label ? 1 : -1));
  return [{ label: allLabel, value: "" }, ...labelsArray];
};

export default function ProjectsTemplate() {
  const { t, rich } = useLanguage();
  const DATA = useData();
  const technologies = new Set<string>();
  DATA.projects.forEach((project) =>
    project.technologies.forEach((technology) => technologies.add(technology))
  );

  const filters = [
    {
      key: "categories",
      title: t("projects.filter.categories"),
      options: [
        { label: t("projects.filter.all"), value: "" },
        { label: t("projects.category.personal"), value: "personal" },
        { label: t("projects.category.freelancer"), value: "freelancer" },
        { label: t("projects.category.probono"), value: "probono" },
      ],
    },
    {
      key: "technologies",
      title: t("projects.filter.technologies"),
      options: createLabelValueObject(technologies, t("projects.filter.all")),
    },
  ];

  const initialFilterState = filters.reduce((acc, { key }) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);
  const [filterState, setFilterState] = useState(initialFilterState);
  const filtersKeys = filters.map(({ key }) => key as keyof ProjectInterface);

  const handleFilterChange = (label: string, value: string) => {
    setFilterState((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const projectsView = useMemo(() => {
    let filteredProjects = [...DATA.projects];

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
  }, [DATA.projects, filterState, filtersKeys]);

  return (
    <PageLayout>
      <SectionTemplate className="rounded-b-2xl">
        <TitleAndSubtitleSection
          title={t("projects.title")}
          subtitle={rich("projects.pageSubtitle")}
          className="my-16 sm:mt-28 sm:mb-12"
        >
          <div className="w-full flex justify-center">
            <FiltersBar filters={filters} onChange={handleFilterChange} />
          </div>

          {projectsView.length ? (
            <AnimatedComponent
              HTMLtag="div"
              className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-2 gap-4"
              forceView
            >
              <AnimatePresence>
                {projectsView.map((project) => (
                  <motion.div
                    layout
                    key={`${project.title}`}
                    initial={{
                      opacity: 0,
                      transform: "scale(0.95) translateY(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      transform: "scale(1) translateY(0)",
                    }}
                    exit={{
                      opacity: 0,
                      transform: "scale(0.95) translateY(-10px)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    <Project {...project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </AnimatedComponent>
          ) : (
            <AnimatedComponent
              HTMLtag="span"
              className="w-full flex justify-center text-center"
            >
              {t("projects.empty")}
            </AnimatedComponent>
          )}
        </TitleAndSubtitleSection>
      </SectionTemplate>
      <CTASection />
    </PageLayout>
  );
}
