import { Listing, parseQuery, type RawParams } from "@/components/shop/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategories, listProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Search", description: "Search the Deshio catalogue.", path: "/search", noindex: true });

export default async function SearchPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const query = parseQuery(await searchParams);
  const [result, categories] = await Promise.all([listProducts(query), getCategories()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Search" }]} />
      <Listing title={query.q ? `Results for “${query.q}”` : "Search"} basePath="/search" query={query} result={result} categories={categories} hiddenQ={false} />
    </>
  );
}
