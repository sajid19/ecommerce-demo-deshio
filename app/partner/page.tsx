import { MockForm } from "@/components/forms/MockForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Become Our Partner", description: "Interested in partnering with Deshio? Tell us about your idea.", path: "/partner" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Become Our Partner" }]} />
      <Container className="max-w-3xl pb-12">
        <SectionHeading as="h1" title="Become Our Partner" eyebrowBn="অংশীদার হোন" />
        <p className="-mt-2 mb-5 text-muted-foreground">Interested in partnering with Deshio? Tell us about your idea.</p>
        <MockForm submitLabel="Send partnership request" successTitle="Request sent" successBody="Our partnerships team will get back to you." fields={[{ name: "name", label: "Name", required: true }, { name: "organisation", label: "Organisation" }, { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "email", label: "Email", type: "email" }, { name: "proposal", label: "Partnership idea", textarea: true, required: true }]} />
      </Container>
    </>
  );
}
