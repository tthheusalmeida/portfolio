import Timeline, { TimelineItem } from "./Timeline";
import TitleAndSubtitleSection from "../molecules/TitleAndSubtitleSection";
import SectionTemplate from "@/templates/SectionTemplate";
import Balloon from "./Balloon";
import VIEW from "@/data/view";

export default function WhereIWorkedSection() {
  const companies = VIEW.companies;

  const items = companies.map(
    ({ name, logo, role, description, achievements, start, end, src, alt }) => {
      return {
        component: (
          <Balloon
            label={name}
            logo={logo}
            role={role}
            description={description}
            achievements={
              Array.isArray(achievements) ? achievements : [achievements]
            }
            dateStart={start}
            dateEnd={end}
          />
        ),
        date: {
          start,
          end,
        },
        image: {
          src,
          alt,
        },
      } as TimelineItem;
    }
  );

  return (
    <SectionTemplate className="flex flex-col items-center">
      <TitleAndSubtitleSection
        title="Where I worked"
        subtitle={
          <>
            A summary of the <span className="font-bold">Roles</span>,{" "}
            <span className="font-bold">Responsibilities</span>, and{" "}
            <span className="font-bold">Experiences</span> that shaped my
            professional path.
          </>
        }
      >
        <div className="w-full mt-11">
          <Timeline items={items} />
        </div>
      </TitleAndSubtitleSection>
    </SectionTemplate>
  );
}
