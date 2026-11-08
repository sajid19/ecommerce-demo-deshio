import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Checkout", description: "Complete your Deshio order.", path: "/checkout", noindex: true });

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Cart", href: "/cart" }, { name: "Checkout" }]} />
      <Container className="pb-12">
        <SectionHeading as="h1" title="Checkout" eyebrowBn="চেকআউট" />
        <CheckoutForm />
      </Container>
    </>
  );
}
