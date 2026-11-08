import { JourneySection } from "@/components/home/JourneySection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "About Us", description: "The story of Deshio: Bangladeshi craft, worn and handed down.", path: "/about" });

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "About Us" }]} />
      <h1 className="sr-only">About Deshio</h1>
      <JourneySection />
      <TrustStrip />
    </>
  );
}
