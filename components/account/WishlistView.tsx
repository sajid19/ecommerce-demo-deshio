"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useStore } from "@/lib/cart/CartProvider";
import type { Product } from "@/lib/data/types";

/** Receives the full (small) catalogue from the server and filters by the browser-held wishlist. */
export function WishlistView({ products }: { products: Product[] }) {
  const { wishlist, ready } = useStore();
  if (!ready) return <div className="h-48 animate-pulse rounded-lg bg-muted" aria-busy="true" />;
  const saved = products.filter((p) => wishlist.includes(p.slug));
  if (!saved.length)
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <Heart className="mx-auto mb-3 size-10 text-muted-foreground" aria-hidden />
        <p className="font-display text-h3">Your wishlist is empty</p>
        <p className="mt-1 text-muted-foreground">Tap the heart on any product to save it here.</p>
        <Button asChild className="mt-4"><Link href="/shop">Browse products</Link></Button>
      </div>
    );
  return <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">{saved.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}</ul>;
}
