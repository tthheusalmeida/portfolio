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
    ({
      name,
      logo,
      role,
      type,
      description,
      achievements,
      highlights,
      start,
      end,
      src,
      alt,
    }) => {
      return {
        component: (
          <Balloon
            label={name}
            logo={logo}
            role={role}
            type={t(`experiences.type.${type}` as DictionaryKey)}
            description={description}
            achievements={
              Array.isArray(achievements) ? achievements : [achievements]
            }
            highlights={highlights}
            image={{ src, alt }}
            dateStart={start}
            dateEnd={end}
          />
        ),
        date: {
          start,
          end,
        },
      } satisfies TimelineItem;
    }
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
