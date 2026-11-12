import { Text, View } from "@react-pdf/renderer";
import { theme } from "../theme";

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={theme.section}>
      <Text style={theme.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}
