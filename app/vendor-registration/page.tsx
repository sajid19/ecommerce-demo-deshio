import { MockForm } from "@/components/forms/MockForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Supplier / Vendor Registration", description: "Craftspeople and suppliers: register your business to be considered for the Deshio catalogue.", path: "/vendor-registration" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Supplier / Vendor Registration" }]} />
      <Container className="max-w-3xl pb-12">
        <SectionHeading as="h1" title="Supplier / Vendor Registration" eyebrowBn="সরবরাহকারী নিবন্ধন" />
        <p className="-mt-2 mb-5 text-muted-foreground">Craftspeople and suppliers: register your business to be considered for the Deshio catalogue.</p>
        <MockForm submitLabel="Register" successTitle="Registration received" successBody="Our sourcing team will review and contact you." fields={[{ name: "business", label: "Business name", required: true }, { name: "contact", label: "Contact person", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "email", label: "Email", type: "email" }, { name: "products", label: "What do you supply?", textarea: true, required: true }]} />
      </Container>
    </>
  );
}
