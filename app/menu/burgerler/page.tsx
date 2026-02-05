import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function BurgerlerPage() {
  return <SectionLayout section={getSectionBySlug("burgerler")} />;
}
