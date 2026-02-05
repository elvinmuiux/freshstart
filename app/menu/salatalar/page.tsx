import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function SalatalarPage() {
  return <SectionLayout section={getSectionBySlug("salatalar")} />;
}
