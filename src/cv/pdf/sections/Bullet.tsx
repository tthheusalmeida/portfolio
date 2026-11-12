import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 3 },
  marker: { width: 11 },
  text: { flex: 1 },
});

export default function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.row} wrap={false}>
      <Text style={styles.marker}>•</Text>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
