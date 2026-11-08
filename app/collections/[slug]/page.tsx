import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Listing, parseQuery, type RawParams } from "@/components/shop/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategories, getCollection, getCollections, listProducts } from "@/lib/data/catalog";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getCollections()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = await getCollection((await params).slug);
  if (!c) return {};
  return buildMetadata({ title: c.name, description: c.description, path: `/collections/${c.slug}` });
}

export default async function CollectionPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<RawParams> }) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();
  const query = parseQuery(await searchParams);
  const [result, categories] = await Promise.all([listProducts({ ...query, collection: slug }), getCategories()]);
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Collections" }, { name: collection.name }]} />
      <Listing title={collection.name} description={collection.description} basePath={`/collections/${slug}`} query={query} result={result} categories={categories} />
    </>
  );
}
