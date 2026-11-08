import { MockForm } from "@/components/forms/MockForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Join Us / Career", description: "Build Bangladesh&apos;s heritage brand with us. Share your details and the role you are interested in.", path: "/careers" });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Join Us / Career" }]} />
      <Container className="max-w-3xl pb-12">
        <SectionHeading as="h1" title="Join Us / Career" eyebrowBn="আমাদের সাথে কাজ করুন" />
        <p className="-mt-2 mb-5 text-muted-foreground">Build Bangladesh&apos;s heritage brand with us. Share your details and the role you are interested in.</p>
        <MockForm submitLabel="Submit application" successTitle="Application received" successBody="Our HR team will contact you if there is a match." fields={[{ name: "name", label: "Full name", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "email", label: "Email", type: "email", required: true }, { name: "role", label: "Role", options: ["Store sales associate", "Merchandiser", "Customer support", "Designer", "Other"] }, { name: "about", label: "About you", textarea: true }]} />
      </Container>
    </>
  );
}
