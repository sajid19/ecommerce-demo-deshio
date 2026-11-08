import { MockForm } from "@/components/forms/MockForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSiteInfo } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Grievance & Nodal Officer", description: "Contact Deshio's grievance officer to raise a complaint or escalate an issue.", path: "/grievance" });

export default async function GrievancePage() {
  const { nodalOfficer: o } = await getSiteInfo();
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Grievance & Nodal Officer" }]} />
      <Container className="max-w-3xl pb-12">
        <SectionHeading as="h1" title="Grievance & Nodal Officer" eyebrowBn="অভিযোগ নিষ্পত্তি" />
        <div className="mb-6 rounded-lg bg-secondary p-5">
          <p className="font-medium">{o.name}</p>
          <p className="text-body-sm"><a className="text-primary underline" href={`tel:${o.phone}`}>{o.phone}</a> · <a className="text-primary underline" href={`mailto:${o.email}`}>{o.email}</a></p>
          <p className="mt-1 text-caption text-muted-foreground">Responsible manager name and contact will be confirmed by Deshio before launch.</p>
        </div>
        <MockForm submitLabel="Submit complaint" successTitle="Complaint registered" successBody="You will hear from the grievance officer within 3 working days."
          fields={[{ name: "name", label: "Name", required: true }, { name: "phone", label: "Mobile number", type: "tel", required: true }, { name: "invoice", label: "Invoice / order number" }, { name: "details", label: "Describe the issue", textarea: true, required: true }]} />
      </Container>
    </>
  );
}
