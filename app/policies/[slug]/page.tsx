import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPolicies, getPolicy } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getPolicies()).map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getPolicy((await params).slug);
  return p ? buildMetadata({ title: p.title, description: p.summary, path: `/policies/${p.slug}` }) : {};
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const policy = await getPolicy((await params).slug);
  if (!policy) notFound();
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: policy.title }]} />
      <Container className="max-w-3xl pb-12">
        <SectionHeading as="h1" title={policy.title} />
        <p className="-mt-2 mb-6 text-muted-foreground">{policy.summary}</p>
        <div className="space-y-6">
          {policy.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-h4 font-semibold">{s.heading}</h2>
              <p className="mt-1 text-muted-foreground">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-8 text-caption text-muted-foreground">Placeholder policy text for the demo; final wording supplied by Deshio.</p>
      </Container>
    </>
  );
}
