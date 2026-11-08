import { Listing, parseQuery, type RawParams } from "@/components/shop/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategories, listProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "New Arrivals", description: "The latest Deshio collections and newly launched products.", path: "/new-arrivals" });

export default async function NewArrivalsPage({ searchParams }: { searchParams: Promise<RawParams> }) {
  const query = { ...parseQuery(await searchParams) };
  query.sort = query.sort === "featured" ? "newest" : query.sort;
  const [result, categories] = await Promise.all([listProducts(query), getCategories()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "New Arrivals" }]} />
      <Listing title="New Arrivals" titleBn="নতুন কালেকশন" basePath="/new-arrivals" query={query} result={result} categories={categories} />
    </>
  );
}
