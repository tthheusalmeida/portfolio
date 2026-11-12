import { StyleSheet, Text } from "@react-pdf/renderer";
import { theme } from "../theme";
import Bullet from "./Bullet";

const styles = StyleSheet.create({
  title: { ...theme.bold, marginTop: 3, marginBottom: 2 },
});

export default function MainResults({
  title,
  results,
}: {
  title: string;
  results: Array<string>;
}) {
  return (
    <>
      <Text style={styles.title}>{title.toUpperCase()}:</Text>
      {results.map((result) => (
        <Bullet key={result}>{result}</Bullet>
      ))}
    </>
  );
}
