"use client";

import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import TitleAndSubtitleSection from "@/app/components/molecules/TitleAndSubtitleSection";
import SectionTemplate from "./SectionTemplate";
import { useLanguage, useData } from "@/contexts/LanguageContext";
import Project from "@/app/components/molecules/Project";
import CTASection from "@/app/components/organisms/ContactSection";
import FiltersBar from "@/app/components/organisms/FiltersBar";
import { Category } from "@/data/project";
import { DictionaryKey } from "@/i18n/dictionary";
import { motion, AnimatePresence } from "motion/react";
import AnimatedComponent from "@/app/components/molecules/AnimatedComponent";

const CATEGORIES: Array<Category> = [
  "personal",
  "freelancer",
  "probono",
  "owner",
];

// Query-string name for each filter, so a filtered view can be shared.
const FILTER_PARAMS = {
  categories: "category",
  technologies: "technology",
} as const;

type FilterKey = keyof typeof FILTER_PARAMS;
type FilterState = Record<FilterKey, string>;

const EMPTY_FILTERS: FilterState = { categories: "", technologies: "" };

const createLabelValueObject = (
  labels: Array<string> | Set<string>,
  allLabel: string,
) => {
  const options = Array.from(labels, (label) => ({ label, value: label }));
  options.sort((a, b) => a.label.localeCompare(b.label));
  return [{ label: allLabel, value: "" }, ...options];
};

export default function ProjectsTemplate() {
  const { t, rich } = useLanguage();
  const DATA = useData();

  const technologies = useMemo(
    () => new Set(DATA.projects.flatMap((project) => project.technologies)),
    [DATA.projects],
  );

  const filters = useMemo(
    () => [
      {
        key: "categories" as const,
        title: t("projects.filter.categories"),
        options: [
          { label: t("projects.filter.all"), value: "" },
          ...CATEGORIES.filter((category) =>
            DATA.projects.some((project) =>
              project.categories.includes(category),
            ),
          ).map((category) => ({
            label: t(`projects.category.${category}` as DictionaryKey),
            value: category,
          })),
        ],
      },
      {
        key: "technologies" as const,
        title: t("projects.filter.technologies"),
        options: createLabelValueObject(technologies, t("projects.filter.all")),
      },
    ],
    [DATA.projects, technologies, t],
  );

  const [filterState, setFilterState] = useState<FilterState>(EMPTY_FILTERS);

  // Restore filters from the URL (client only, keeps the page static).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const restored = { ...EMPTY_FILTERS };

    filters.forEach(({ key, options }) => {
      const value = params.get(FILTER_PARAMS[key]) ?? "";
      if (options.some((option) => option.value === value)) {
        restored[key] = value;
      }
    });

    setFilterState(restored);
    // Only on mount: later changes are driven by the user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const filterKey = key as FilterKey;
    setFilterState((prev) => ({ ...prev, [filterKey]: value }));

    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(FILTER_PARAMS[filterKey], value);
    } else {
      url.searchParams.delete(FILTER_PARAMS[filterKey]);
    }
    window.history.replaceState(null, "", url);
  };

  const projectsView = useMemo(
    () =>
      DATA.projects.filter(
        (project) =>
          (!filterState.categories ||
            project.categories.includes(filterState.categories as Category)) &&
          (!filterState.technologies ||
            project.technologies.includes(filterState.technologies)),
      ),
    [DATA.projects, filterState],
  );

  return (
    <PageLayout>
      <SectionTemplate className="rounded-b-2xl">
        <TitleAndSubtitleSection
          title={t("projects.title")}
          subtitle={rich("projects.pageSubtitle")}
          className="my-16 sm:mt-28 sm:mb-12"
        >
          <div className="w-full flex justify-center">
            <FiltersBar
              filters={filters.map((filter) => ({
                ...filter,
                value: filterState[filter.key],
              }))}
              onChange={handleFilterChange}
            />
          </div>

          {projectsView.length ? (
            <AnimatedComponent
              HTMLtag="div"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
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
