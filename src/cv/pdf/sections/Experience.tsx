import type { CvJob, CvLabels } from "../../types";
import ExperienceItem from "./ExperienceItem";
import Section from "./Section";

export default function Experience({
  jobs,
  labels,
}: {
  jobs: Array<CvJob>;
  labels: CvLabels;
}) {
  return (
    <Section title={labels.experience}>
      {jobs.map((job) => (
        <ExperienceItem
          key={job.company + job.position + job.period}
          job={job}
          labels={labels}
        />
      ))}
    </Section>
  );
}
