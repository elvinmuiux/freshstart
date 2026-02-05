import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function GozlemeCesitleriPage() {
  return <SectionLayout section={getSectionBySlug("gozleme-cesitleri")} />;
}
