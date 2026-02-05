import SectionLayout from "../SectionLayout";
import { getSectionBySlug } from "../sections";

export default function AtistirmaliklarPage() {
  return <SectionLayout section={getSectionBySlug("atistirmaliklar")} />;
}
