import { TrackOrder } from "@/components/account/TrackOrder";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getOrders } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Track Your Order", description: "Check your Deshio delivery status with your mobile number or invoice number.", path: "/track-order" });

export default async function TrackOrderPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Track Order" }]} />
      <Container className="max-w-2xl pb-12">
        <SectionHeading as="h1" title="Track Your Order" eyebrowBn="অর্ডার ট্র্যাক করুন" />
        <TrackOrder orders={await getOrders()} />
      </Container>
    </>
  );
}
