import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { categoryHue, categoryName } from "@/lib/data/hue";
import { formatBDT } from "@/lib/utils";
import { ProductArt } from "./ProductArt";
import { QuickAdd } from "./QuickAdd";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const img = product.images[0];
  const onSale = product.compare_at_price && product.compare_at_price > product.selling_price;
  const img2 = product.images[1];
  const stock = product.variants.length ? Math.min(...product.variants.filter((v) => v.in_stock).map((v) => v.stock_quantity)) : 0;
  const lowStock = product.in_stock && stock >= 1 && stock <= 5;
  const pct = onSale ? Math.round((1 - product.selling_price / product.compare_at_price!) * 100) : 0;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-shadow duration-150 md:hover:shadow-md">
      <div className={`relative aspect-[3/4] bg-muted ${product.in_stock ? "" : "opacity-60"}`}>
        {img?.url ? (
          <Image src={img.url} alt={img.alt_text} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 44vw" className="object-cover" priority={priority} />
        ) : (
          <ProductArt hue={categoryHue(product.category_slug)} label={product.name} />
        )}
        {img2?.url && (
          <Image src={img2.url} alt="" aria-hidden fill sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 44vw" className="object-cover opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100" />
        )}
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col gap-1">
          {onSale && <span className="rounded-full bg-destructive px-2.5 py-0.5 text-caption font-semibold text-destructive-foreground">-{pct}%</span>}
          {product.is_new && <span className="rounded-full bg-accent px-2.5 py-0.5 text-caption font-semibold text-accent-foreground">New</span>}
          {lowStock && !onSale && !product.is_new && <span className="rounded-full bg-ink px-2.5 py-0.5 text-caption font-semibold text-ink-foreground">Only {stock} left</span>}
        </div>
        <QuickAdd product={product} />
      </div>
      <WishlistButton slug={product.slug} name={product.name} className="absolute right-2 top-2 z-10" />
      <div className="space-y-1 p-3 md:p-4">
        <p className="text-caption text-muted-foreground">{categoryName(product.category_slug)}</p>
        <h3 className="line-clamp-2 min-h-10 font-sans text-body-sm font-medium">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">{product.name}</Link>
        </h3>
        {product.ratings.count > 0 && (
          <p className="flex items-center gap-1 text-caption text-muted-foreground" aria-label={`Rated ${product.ratings.average.toFixed(1)} of 5, ${product.ratings.count} reviews`}>
            <Star className="size-3.5 fill-accent text-accent" aria-hidden />{product.ratings.average.toFixed(1)} ({product.ratings.count})
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span className={`text-body font-semibold ${onSale ? "text-destructive" : ""}`}>{formatBDT(product.selling_price)}</span>
          {onSale && <span className="text-caption text-muted-foreground line-through">{formatBDT(product.compare_at_price!)}</span>}
        </div>
        {!product.in_stock && <p className="text-caption text-muted-foreground">Out of stock</p>}
      </div>
    </article>
  );
}
