import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Listing, parseQuery, type RawParams } from "@/components/shop/Listing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getCategories, getCategory, listProducts } from "@/lib/data/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = await getCategory((await params).slug);
  if (!c) return {};
  return buildMetadata({ title: c.name, description: c.description, path: `/category/${c.slug}` });
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<RawParams> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();
  const query = parseQuery(await searchParams);
  const [result, categories] = await Promise.all([listProducts({ ...query, category: slug }), getCategories()]);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: category.name, path: `/category/${slug}` }])} />
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }, { name: category.name }]} />
      <Listing title={category.name} description={category.description} basePath={`/category/${slug}`} query={query} result={result} categories={categories} />
    </>
  );
}
