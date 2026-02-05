import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function CorbalarPage() {
  return <SectionLayout section={getSectionBySlug("corbalar")} />;
}
