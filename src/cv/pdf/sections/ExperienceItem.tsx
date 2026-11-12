import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CvJob, CvLabels } from "../../types";
import { theme } from "../theme";
import Bullet from "./Bullet";

const styles = StyleSheet.create({
  job: { marginBottom: 14 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  company: { ...theme.bold, flex: 1 },
  period: { ...theme.bold },
  position: { ...theme.bold, marginBottom: 2 },
  // Plain text (no marker), so it is not read as one more delivered result.
  technologies: { marginTop: 2 },
});

interface ExperienceItemProps {
  job: CvJob;
  labels: Pick<CvLabels, "enterprise" | "position" | "technologies">;
}

export default function ExperienceItem({ job, labels }: ExperienceItemProps) {
  return (
    // A job is never split between two pages.
    <View style={styles.job} wrap={false}>
      <View>
        <View style={styles.headerRow}>
          <Text style={styles.company}>
            {labels.enterprise}: {job.company}
          </Text>
          <Text style={styles.period}>{job.period}</Text>
        </View>
        <Text style={styles.position}>
          {labels.position}: {job.position}
        </Text>
      </View>
      {job.bullets.map((bullet) => (
        <Bullet key={bullet}>{bullet}</Bullet>
      ))}
      {job.technologies.length > 0 && (
        <Text style={styles.technologies}>
          <Text style={theme.bold}>{labels.technologies}: </Text>
          {job.technologies.join(" | ")}
        </Text>
      )}
    </View>
  );
}
