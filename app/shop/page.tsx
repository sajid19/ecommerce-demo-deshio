import { Listing, parseQuery, type RawParams } from "@/components/shop/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategories, listProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Shop All", description: "Browse every Deshio product: sarees, jamdani, 3-piece, jewellery, accessories, home decor and food.", path: "/shop" });

export default async function ShopPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const query = parseQuery(await searchParams);
  const [result, categories] = await Promise.all([listProducts(query), getCategories()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Shop All" }]} />
      <Listing title="Shop All" titleBn="সব পণ্য" basePath="/shop" query={query} result={result} categories={categories} />
    </>
  );
}
