import { WishlistView } from "@/components/account/WishlistView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "My Wishlist", description: "Products you have saved at Deshio.", path: "/wishlist", noindex: true });

export default async function WishlistPage() {
  const all = (await listProducts({ pageSize: 500 })).items;
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "My Wishlist" }]} />
      <Container className="pb-12">
        <SectionHeading as="h1" title="My Wishlist" eyebrowBn="পছন্দের তালিকা" />
        <WishlistView products={all} />
      </Container>
    </>
  );
}
