import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function PizzaPage() {
  return <SectionLayout section={getSectionBySlug("pizza")} />;
}
