"use client";
import { Heart } from "lucide-react";
import { useStore } from "@/lib/cart/CartProvider";
import { cn } from "@/lib/utils";

export function WishlistButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const { wishlist, toggleWishlist, ready } = useStore();
  const active = ready && wishlist.includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleWishlist(slug)}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      className={cn("grid size-11 place-items-center rounded-full bg-card/90 text-foreground", className)}
    >
      <Heart className={cn("size-5", active && "fill-current text-primary")} aria-hidden />
    </button>
  );
}
