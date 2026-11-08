import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { Gallery } from "@/components/product/Gallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductRail } from "@/components/product/ProductRail";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getAllProductSlugs, getCategory, getProduct, getRelatedProducts } from "@/lib/data/catalog";
import { categoryHue } from "@/lib/data/hue";
import { abs, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatBDT } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getAllProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.name, description: `${p.short_description} ${formatBDT(p.selling_price)}.`, path: `/product/${p.slug}` });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const [category, related] = await Promise.all([getCategory(product.category_slug), getRelatedProducts(product, 8)]);
  const onSale = product.compare_at_price && product.compare_at_price > product.selling_price;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    category: category?.name,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.ratings.average.toFixed(1), reviewCount: product.ratings.count },
    offers: {
      "@type": "Offer",
      url: abs(`/product/${product.slug}`),
      priceCurrency: "BDT",
      price: product.selling_price,
      availability: product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: category?.name ?? "Shop", path: `/category/${product.category_slug}` }, { name: product.name, path: `/product/${product.slug}` }])} />
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: category?.name ?? "Shop", href: `/category/${product.category_slug}` }, { name: product.name }]} />
      <Container className="grid gap-8 pb-28 md:pb-12 lg:grid-cols-2 lg:gap-12">
        <Gallery images={product.images} hue={categoryHue(product.category_slug)} name={product.name} />
        <div>
          <p className="text-body-sm text-muted-foreground">{category?.name} · SKU {product.sku}</p>
          <h1 className="mt-1 font-display text-h2 font-semibold md:text-h1">{product.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-body-sm" aria-label={`Rated ${product.ratings.average.toFixed(1)} out of 5 from ${product.ratings.count} reviews`}>
            <Star className="size-4 fill-accent text-accent" aria-hidden /> {product.ratings.average.toFixed(1)} <span className="text-muted-foreground">({product.ratings.count} reviews)</span>
          </p>
          <p className="mt-4 flex items-baseline gap-3">
            <span className={`text-h3 font-semibold ${onSale ? "text-destructive" : ""}`}>{formatBDT(product.selling_price)}</span>
            {onSale && <span className="text-body text-muted-foreground line-through">{formatBDT(product.compare_at_price!)}</span>}
          </p>
          <p className="mt-4 text-body text-muted-foreground">{product.description}</p>
          <div className="mt-6"><ProductPurchase product={product} /></div>
          <ul className="mt-8 space-y-2 rounded-lg bg-secondary p-4 text-body-sm">
            <li>Delivery inside Dhaka 1–2 days · outside Dhaka 3–5 days</li>
            <li>7-day return &amp; exchange on unused items</li>
            <li>Cash on Delivery, bKash, Nagad and cards accepted</li>
          </ul>
        </div>
      </Container>
      <div className="border-t"><ProductRail title="You may also like" products={related} /></div>
    </>
  );
}
