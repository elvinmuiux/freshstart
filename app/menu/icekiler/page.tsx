import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function IcekilerPage() {
  return <SectionLayout section={getSectionBySlug("icekiler")} />;
}
