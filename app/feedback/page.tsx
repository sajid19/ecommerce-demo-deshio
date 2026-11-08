import { MockForm } from "@/components/forms/MockForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Customer Feedback", description: "Tell us how we did. Every message is read by our customer care team.", path: "/feedback" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Customer Feedback" }]} />
      <Container className="max-w-3xl pb-12">
        <SectionHeading as="h1" title="Customer Feedback" eyebrowBn="আপনার মতামত" />
        <p className="-mt-2 mb-5 text-muted-foreground">Tell us how we did. Every message is read by our customer care team.</p>
        <MockForm submitLabel="Send feedback" successTitle="Thank you!" successBody="Your feedback has been received." fields={[{ name: "name", label: "Name", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "email", label: "Email", type: "email" }, { name: "message", label: "Your feedback", textarea: true, required: true }]} />
      </Container>
    </>
  );
}
