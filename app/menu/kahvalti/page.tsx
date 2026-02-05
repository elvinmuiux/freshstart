import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function KahvaltiPage() {
  return <SectionLayout section={getSectionBySlug("kahvalti")} />;
}
