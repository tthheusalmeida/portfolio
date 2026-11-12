import { Link, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CvContact, CvLabels } from "../../types";
import { colors } from "../theme";

const styles = StyleSheet.create({
  name: { fontSize: 22, fontWeight: 700, lineHeight: 1.15, marginBottom: 2 },
  link: { color: colors.link, textDecoration: "none", fontWeight: 700 },
  // Almost a title: extra room above and below.
  objective: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 12,
  },
});

interface HeaderProps {
  contact: CvContact;
  labels: Pick<CvLabels, "contact" | "email" | "portfolio" | "objective">;
}

export default function Header({ contact, labels }: HeaderProps) {
  return (
    <View>
      <Text style={styles.name}>{contact.name}</Text>
      <Text>{contact.location}</Text>
      <Text>
        {labels.contact}: {contact.phone}
      </Text>
      <Text>
        {labels.email}: {contact.email}
      </Text>
      <Link src={contact.linkedin} style={styles.link}>
        {contact.linkedin}
      </Link>
      <Text>
        {labels.portfolio}:{" "}
        <Link src={contact.portfolio} style={styles.link}>
          {contact.portfolio}
        </Link>
      </Text>
      <Text>{contact.availability}</Text>
      <Text style={styles.objective}>
        {labels.objective}: {contact.objective}
      </Text>
    </View>
  );
}
