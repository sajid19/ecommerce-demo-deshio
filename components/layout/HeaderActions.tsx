"use client";
import Link from "next/link";
import { Heart, Menu, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/lib/cart/CartProvider";
import { useShell } from "./ShellState";

const iconBtn = "relative grid size-11 place-items-center rounded-full hover:bg-muted";

export function MenuButton() {
  const { setDrawerOpen } = useShell();
  return (
    <button type="button" className={iconBtn} aria-label="Open menu" onClick={() => setDrawerOpen(true)}>
      <Menu className="size-6" aria-hidden />
    </button>
  );
}

export function CartButton() {
  const { count, setCartOpen, ready } = useStore();
  const n = ready ? count : 0;
  return (
    <button type="button" className={iconBtn} aria-label={`Cart, ${n} items`} onClick={() => setCartOpen(true)}>
      <ShoppingBag className="size-5" aria-hidden />
      {n > 0 && <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-caption text-primary-foreground">{n}</span>}
    </button>
  );
}

export function WishlistLink() {
  const { wishlist, ready } = useStore();
  const n = ready ? wishlist.length : 0;
  return (
    <Link href="/wishlist" className={iconBtn} aria-label={`Wishlist, ${n} items`}>
      <Heart className="size-5" aria-hidden />
      {n > 0 && <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-primary px-1 text-caption text-primary-foreground">{n}</span>}
    </Link>
  );
}

export function AccountLink() {
  return (
    <Link href="/account" className={iconBtn} aria-label="My account">
      <User className="size-5" aria-hidden />
    </Link>
  );
}
