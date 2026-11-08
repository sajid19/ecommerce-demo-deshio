"use client";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { ProductArt } from "@/components/product/ProductArt";
import { useStore } from "@/lib/cart/CartProvider";
import { formatBDT } from "@/lib/utils";

/** Floating pill (bottom-right) + the cart sheet it opens. Hidden while the cart is empty. */
export function MiniCart() {
  const { lines, count, subtotal, ready, cartOpen, setCartOpen, setQuantity, removeLine } = useStore();
  const show = ready && count > 0;
  return (
    <>
      {show && (
        <button
          type="button"
          onClick={() => setCartOpen(true)}
          aria-label={`View cart, ${count} items, ${subtotal.toLocaleString("en-IN")} taka`}
          className="fixed bottom-20 right-4 z-30 inline-flex h-12 items-center gap-3 rounded-full bg-primary pl-4 pr-5 text-body-sm font-semibold text-primary-foreground shadow-lg md:bottom-6"
        >
          <ShoppingBag className="size-5" aria-hidden />
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-accent text-caption text-accent-foreground">{count}</span>
          {formatBDT(subtotal)}
        </button>
      )}
      <Sheet open={cartOpen} onOpenChange={setCartOpen} title={`Your cart (${count})`} side="right">
        {lines.length === 0 ? (
          <div className="grid h-full place-items-center p-8 text-center text-muted-foreground">
            <div>
              <ShoppingBag className="mx-auto mb-3 size-10" aria-hidden />
              <p className="font-medium text-foreground">Your cart is empty</p>
              <Button asChild className="mt-4"><Link href="/shop" onClick={() => setCartOpen(false)}>Start shopping</Link></Button>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <ul className="flex-1 divide-y overflow-y-auto px-4">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3 py-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-md"><ProductArt hue={l.hue} label={l.name} /></div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${l.slug}`} onClick={() => setCartOpen(false)} className="line-clamp-2 text-body-sm font-medium">{l.name}</Link>
                    {l.variant && <p className="text-caption text-muted-foreground">{l.variant}</p>}
                    <p className="text-body-sm font-semibold">{formatBDT(l.unit_price)}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <button type="button" aria-label="Decrease quantity" className="grid size-11 place-items-center rounded-md border" onClick={() => setQuantity(l.key, l.quantity - 1)}><Minus className="size-4" aria-hidden /></button>
                      <span className="w-8 text-center text-body-sm" aria-live="polite">{l.quantity}</span>
                      <button type="button" aria-label="Increase quantity" className="grid size-11 place-items-center rounded-md border" onClick={() => setQuantity(l.key, l.quantity + 1)}><Plus className="size-4" aria-hidden /></button>
                      <button type="button" aria-label={`Remove ${l.name}`} className="ml-auto grid size-11 place-items-center rounded-md text-muted-foreground hover:text-destructive" onClick={() => removeLine(l.key)}><Trash2 className="size-5" aria-hidden /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t p-4">
              <p className="flex justify-between text-body font-semibold"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></p>
              <p className="text-caption text-muted-foreground">Delivery and coupons are applied at checkout.</p>
              <div className="grid grid-cols-2 gap-3">
                <Button asChild variant="outline"><Link href="/cart" onClick={() => setCartOpen(false)}>View cart</Link></Button>
                <Button asChild><Link href="/checkout" onClick={() => setCartOpen(false)}>Checkout</Link></Button>
              </div>
            </div>
          </div>
        )}
      </Sheet>
    </>
  );
}
