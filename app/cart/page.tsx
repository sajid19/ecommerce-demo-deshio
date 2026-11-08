import { CartView } from "@/components/shop/CartView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Your Cart", description: "Review the items in your Deshio cart.", path: "/cart", noindex: true });

export default function CartPage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Cart" }]} />
      <Container className="pb-12">
        <SectionHeading as="h1" title="Your Cart" eyebrowBn="আপনার কার্ট" />
        <CartView />
      </Container>
    </>
  );
}
