import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function EkmekArasiPage() {
  return <SectionLayout section={getSectionBySlug("ekmek-arasi")} />;
}
