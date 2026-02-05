import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function AnaYemeklerPage() {
  return <SectionLayout section={getSectionBySlug("ana-yemekler")} />;
}
