import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function MakarnalarPage() {
  return <SectionLayout section={getSectionBySlug("makarnalar")} />;
}
