import { Listing, parseQuery, type RawParams } from "@/components/shop/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategories, listProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Best Selling", description: "Deshio's most-loved products across every category.", path: "/best-selling" });

export default async function BestSellingPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const query = { ...parseQuery(await searchParams) };
  query.sort = query.sort === "featured" ? "best" : query.sort;
  const [result, categories] = await Promise.all([listProducts({ ...query, pageSize: 12 }), getCategories()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Best Selling" }]} />
      <Listing title="Best Selling" titleBn="সর্বাধিক বিক্রিত" basePath="/best-selling" query={query} result={result} categories={categories} />
    </>
  );
}
