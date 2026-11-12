import { Document, Page } from "@react-pdf/renderer";
import type { CvModel } from "../types";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Header from "./sections/Header";
import Languages from "./sections/Languages";
import MainResults from "./sections/MainResults";
import Summary from "./sections/Summary";
import { theme } from "./theme";

// Called as a function (not as <CvPdfDocument />) because the PDF renderer
// needs the <Document> element itself as its root.
export default function CvPdfDocument({ model }: { model: CvModel }) {
  const { labels, contact } = model;

  return (
    <Document
      title={`${contact.name} – ${contact.objective}`}
      author={contact.name}
      language={model.lang === "pt" ? "pt-BR" : "en-US"}
    >
      <Page size="A4" style={theme.page}>
        <Header contact={contact} labels={labels} />
        <Summary title={labels.summary} paragraphs={model.summary} />
        <MainResults title={labels.mainResults} results={model.mainResults} />
        <Education title={labels.education} items={model.education} />
        <Languages title={labels.languages} items={model.languages} />
        <Experience jobs={model.jobs} labels={labels} />
        <Certifications
          title={labels.certifications}
          items={model.certifications}
        />
      </Page>
    </Document>
  );
}
