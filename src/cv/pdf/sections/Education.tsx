import { Text, View } from "@react-pdf/renderer";
import type { CvEducation } from "../../types";
import { theme } from "../theme";
import Section from "./Section";

export default function Education({
  title,
  items,
}: {
  title: string;
  items: Array<CvEducation>;
}) {
  return (
    <Section title={title}>
      {items.map((item) => (
        <View key={item.title} style={theme.paragraph} wrap={false}>
          <Text>
            <Text style={theme.bold}>{item.title}</Text> – {item.institution} –{" "}
            {item.period}
          </Text>
        </View>
      ))}
    </Section>
  );
}
