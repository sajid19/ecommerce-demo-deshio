"use client";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/product/ProductArt";
import { useStore } from "@/lib/cart/CartProvider";
import { formatBDT } from "@/lib/utils";

export function CartView() {
  const { lines, subtotal, setQuantity, removeLine, ready } = useStore();
  if (!ready) return <div className="h-64 animate-pulse rounded-lg bg-muted" aria-busy="true" />;
  if (lines.length === 0)
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <ShoppingBag className="mx-auto mb-3 size-10 text-muted-foreground" aria-hidden />
        <p className="font-display text-h3">Your cart is empty</p>
        <Button asChild className="mt-4"><Link href="/shop">Start shopping</Link></Button>
      </div>
    );
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <ul className="divide-y rounded-lg border bg-card px-4">
        {lines.map((l) => (
          <li key={l.key} className="flex gap-4 py-4">
            <div className="size-24 shrink-0 overflow-hidden rounded-md"><ProductArt hue={l.hue} label={l.name} /></div>
            <div className="min-w-0 flex-1">
              <Link href={`/product/${l.slug}`} className="font-medium hover:text-primary">{l.name}</Link>
              {l.variant && <p className="text-body-sm text-muted-foreground">{l.variant}</p>}
              <p className="text-body-sm">{formatBDT(l.unit_price)}</p>
              <div className="mt-1 flex items-center gap-1">
                <button type="button" aria-label="Decrease quantity" className="grid size-11 place-items-center rounded-md border" onClick={() => setQuantity(l.key, l.quantity - 1)}><Minus className="size-4" aria-hidden /></button>
                <span className="w-8 text-center" aria-live="polite">{l.quantity}</span>
                <button type="button" aria-label="Increase quantity" className="grid size-11 place-items-center rounded-md border" onClick={() => setQuantity(l.key, l.quantity + 1)}><Plus className="size-4" aria-hidden /></button>
                <button type="button" aria-label={`Remove ${l.name}`} className="ml-2 grid size-11 place-items-center text-muted-foreground hover:text-destructive" onClick={() => removeLine(l.key)}><Trash2 className="size-5" aria-hidden /></button>
              </div>
            </div>
            <p className="font-semibold">{formatBDT(l.unit_price * l.quantity)}</p>
          </li>
        ))}
      </ul>
      <aside className="h-fit space-y-3 rounded-lg border bg-card p-5">
        <h2 className="font-display text-h4 font-semibold">Order summary</h2>
        <p className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatBDT(subtotal)}</span></p>
        <p className="text-caption text-muted-foreground">Delivery charge and coupons are calculated at checkout.</p>
        <Button asChild size="lg" className="w-full"><Link href="/checkout">Proceed to checkout</Link></Button>
      </aside>
    </div>
  );
}
