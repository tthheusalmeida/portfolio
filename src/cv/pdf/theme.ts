import { StyleSheet } from "@react-pdf/renderer";

// Plain, single-column, black on white: what ATS parsers read best. Carlito
// is metric-compatible with Calibri, the font of the reference CV.
export const FONT_FAMILY = "Carlito";

export const colors = {
  text: "#000000",
  rule: "#262626",
  link: "#1F3864",
};

export const theme = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 40,
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    lineHeight: 1.17,
    color: colors.text,
  },
  section: { marginTop: 9 },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    textTransform: "uppercase",
    paddingBottom: 1.5,
    marginBottom: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.rule,
  },
  bold: { fontWeight: 700 },
  paragraph: { marginBottom: 4 },
});
