import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function IzgaraPage() {
  return <SectionLayout section={getSectionBySlug("izgara")} />;
}
