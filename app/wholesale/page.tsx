import { MockForm } from "@/components/forms/MockForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Become a Wholesaler", description: "Buy Deshio products in bulk for your shop. Share your details for wholesale pricing.", path: "/wholesale" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Become a Wholesaler" }]} />
      <Container className="max-w-3xl pb-12">
        <SectionHeading as="h1" title="Become a Wholesaler" eyebrowBn="পাইকারি ক্রেতা হোন" />
        <p className="-mt-2 mb-5 text-muted-foreground">Buy Deshio products in bulk for your shop. Share your details for wholesale pricing.</p>
        <MockForm submitLabel="Request wholesale pricing" successTitle="Request received" successBody="Our wholesale desk will contact you with the price list." fields={[{ name: "business", label: "Shop / business name", required: true }, { name: "name", label: "Contact person", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "city", label: "City / district", required: true }, { name: "volume", label: "Estimated monthly volume", options: ["Under ৳50,000", "৳50,000–2 lakh", "Over ৳2 lakh"] }]} />
      </Container>
    </>
  );
}
