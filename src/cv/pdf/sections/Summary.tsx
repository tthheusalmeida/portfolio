import { Text } from "@react-pdf/renderer";
import { theme } from "../theme";
import Section from "./Section";

export default function Summary({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: Array<string>;
}) {
  return (
    <Section title={title}>
      {paragraphs.map((paragraph) => (
        <Text key={paragraph} style={theme.paragraph}>
          {paragraph}
        </Text>
      ))}
    </Section>
  );
}
