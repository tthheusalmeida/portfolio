import { Text } from "@react-pdf/renderer";
import type { CvLanguage } from "../../types";
import { theme } from "../theme";
import Section from "./Section";

export default function Languages({
  title,
  items,
}: {
  title: string;
  items: Array<CvLanguage>;
}) {
  return (
    <Section title={title}>
      {items.map((item) => (
        <Text key={item.name}>
          <Text style={theme.bold}>{item.name}</Text> — {item.level}
        </Text>
      ))}
    </Section>
  );
}
