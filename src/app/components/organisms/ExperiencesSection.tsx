"use client";

import Timeline, { TimelineItem } from "./Timeline";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";
import Balloon from "./Balloon";
import { useLanguage, useData } from "@/contexts/LanguageContext";
import { DictionaryKey } from "@/i18n/dictionary";

export default function Experiences() {
  const { t, rich } = useLanguage();
  const companies = useData().experiences;

  const items = companies.map(
    ({ name, logo, roles, description, achievements, highlights, src, alt }) =>
      ({
        component: (
          <Balloon
            label={name}
            logo={logo}
            roles={roles.map((role) => ({
              ...role,
              type: t(`experiences.type.${role.type}` as DictionaryKey),
            }))}
            description={description}
            achievements={achievements}
            highlights={highlights}
            image={{ src, alt }}
          />
        ),
        date: {
          start: roles[roles.length - 1].start,
          end: roles[0].end,
        },
      }) satisfies TimelineItem,
  );

  return (
    <SectionTemplate id="experiences" className="flex flex-col items-center">
      <TitleAndSubtitleSection
        title={t("experiences.title")}
        subtitle={rich("experiences.subtitle")}
      >
        <div className="w-full mt-11">
          <Timeline items={items} />
        </div>
      </TitleAndSubtitleSection>
    </SectionTemplate>
  );
}
