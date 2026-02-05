import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function BowlsPage() {
  return <SectionLayout section={getSectionBySlug("bowls")} />;
}
