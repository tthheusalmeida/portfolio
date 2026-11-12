import type { CvCertification } from "../../types";
import Bullet from "./Bullet";
import Section from "./Section";

export default function Certifications({
  title,
  items,
}: {
  title: string;
  items: Array<CvCertification>;
}) {
  return (
    <Section title={title}>
      {items.map((item) => (
        <Bullet key={item.title}>
          {item.title} ({item.issuer}) – {item.date}
        </Bullet>
      ))}
    </Section>
  );
}
