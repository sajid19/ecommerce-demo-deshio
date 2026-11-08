"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/cart/CartProvider";
import type { Product } from "@/lib/data/types";
import { categoryHue } from "@/lib/data/hue";

/** One-tap add for single-variant products; multi-variant products link to the product page to pick an option. */
export function QuickAdd({ product }: { product: Product }) {
  const { addLine, setCartOpen } = useStore();
  if (!product.in_stock) return null;
  const cls = "absolute bottom-2 right-2 z-10 grid size-11 place-items-center rounded-full bg-card text-foreground shadow-md transition-all duration-150 hover:bg-primary hover:text-primary-foreground md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100";
  if (product.variants.length > 1) {
    return <Link href={`/product/${product.slug}`} aria-label={`Choose options for ${product.name}`} className={cls}><ShoppingBag className="size-5" aria-hidden /></Link>;
  }
  const v = product.variants[0];
  return (
    <button
      type="button"
      aria-label={`Quick add ${product.name}`}
      className={cls}
      onClick={() => {
        addLine({ slug: product.slug, name: product.name, unit_price: v?.selling_price ?? product.selling_price, hue: categoryHue(product.category_slug) }, 1);
        setCartOpen(true);
      }}
    >
      <ShoppingBag className="size-5" aria-hidden />
    </button>
  );
}
