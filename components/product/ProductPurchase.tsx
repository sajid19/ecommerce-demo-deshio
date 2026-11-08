"use client";
import Link from "next/link";
import * as React from "react";
import { Check, Minus, Plus, Ruler, ShoppingBag, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { WishlistButton } from "./WishlistButton";
import { useStore } from "@/lib/cart/CartProvider";
import type { Product } from "@/lib/data/types";
import { categoryHue } from "@/lib/data/hue";
import { cn, formatBDT } from "@/lib/utils";

function Choice({ label, options, value, onChange, available }: { label: string; options: string[]; value?: string; onChange: (v: string) => void; available: (v: string) => boolean }) {
  return (
    <fieldset>
      <legend className="mb-2 text-body-sm font-medium">{label}: <span className="text-muted-foreground">{value}</span></legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={cn("relative grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-md border px-4 text-body-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:font-semibold has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring", !available(o) && "opacity-50 line-through")}>
            <input type="radio" name={label} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const APPAREL = new Set(["three-piece", "ready-to-wear"]);
const fmt = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
const addDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return d; };

function SizeGuide() {
  const [open, setOpen] = React.useState(false);
  const rows = [["S", "36", "30", "40"], ["M", "38", "32", "41"], ["L", "40", "34", "42"], ["XL", "42", "36", "43"], ["XXL", "44", "38", "44"]];
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center gap-2 text-body-sm font-medium text-primary underline underline-offset-4"><Ruler className="size-4" aria-hidden />Size guide</button>
      <Sheet open={open} onOpenChange={setOpen} title="Size guide" side="right">
        <div className="p-4">
          <table className="w-full text-body-sm">
            <caption className="pb-3 text-left text-muted-foreground">Garment measurements in inches</caption>
            <thead><tr className="border-b text-left"><th className="py-2">Size</th><th>Chest</th><th>Waist</th><th>Length</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r[0]} className="border-b">{r.map((c, i) => <td key={i} className="py-2">{c}</td>)}</tr>)}</tbody>
          </table>
          <p className="mt-4 text-caption text-muted-foreground">Between sizes? Choose the larger one. Our team can help on the hotline.</p>
        </div>
      </Sheet>
    </>
  );
}

function DeliveryEstimate() {
  const [dhaka, setDhaka] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const [a, b] = dhaka ? [1, 2] : [3, 5];
  return (
    <div className="rounded-lg border p-3 text-body-sm">
      <p className="flex items-center gap-2 font-medium"><Truck className="size-4 text-primary" aria-hidden />{mounted ? `Delivers ${fmt(addDays(a))} – ${fmt(addDays(b))}` : `Delivers in ${a}–${b} days`}</p>
      <div className="mt-2 flex gap-2" role="group" aria-label="Delivery area">
        {[["Inside Dhaka", true], ["Outside Dhaka", false]].map(([label, v]) => (
          <button key={String(label)} type="button" aria-pressed={dhaka === v} onClick={() => setDhaka(v as boolean)} className={cn("min-h-9 rounded-full border px-3 text-caption", dhaka === v ? "border-primary bg-primary/5 font-semibold" : "text-muted-foreground")}>{label as string}</button>
        ))}
      </div>
    </div>
  );
}

export function ProductPurchase({ product }: { product: Product }) {
  const { addLine, setCartOpen } = useStore();
  const colors = [...new Set(product.variants.map((v) => v.color).filter(Boolean))] as string[];
  const sizes = [...new Set(product.variants.map((v) => v.size).filter(Boolean))] as string[];
  const firstInStock = product.variants.find((v) => v.in_stock) ?? product.variants[0];
  const [color, setColor] = React.useState(firstInStock?.color);
  const [size, setSize] = React.useState(firstInStock?.size);
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);

  const variant = product.variants.find((v) => v.color === color && v.size === size);
  const inStock = !!variant?.in_stock;
  const label = [color, size].filter(Boolean).join(" / ") || undefined;
  const available = (c?: string, s?: string) => product.variants.some((v) => v.color === (c ?? color) && v.size === (s ?? size) && v.in_stock);

  const add = (openCart = true) => {
    if (!variant || !inStock) return;
    addLine({ slug: product.slug, name: product.name, variant: label, unit_price: variant.selling_price, hue: categoryHue(product.category_slug) }, qty);
    setAdded(true);
    if (openCart) setCartOpen(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      {colors.length > 0 && <Choice label="Colour" options={colors} value={color} onChange={setColor} available={(c) => available(c, size)} />}
      {APPAREL.has(product.category_slug) && <SizeGuide />}
      {sizes.length > 0 && <Choice label="Size" options={sizes} value={size} onChange={setSize} available={(s) => available(color, s)} />}
      <p className={cn("text-body-sm font-medium", inStock ? "text-success" : "text-destructive")} role="status">
        {inStock ? (variant!.stock_quantity <= 5 ? `Only ${variant!.stock_quantity} left` : "In stock") : "This option is out of stock"}
      </p>
      <DeliveryEstimate />
      <div className="flex items-center gap-1" role="group" aria-label="Quantity">
        <button type="button" aria-label="Decrease quantity" className="grid size-11 place-items-center rounded-md border" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="size-4" aria-hidden /></button>
        <span className="w-10 text-center font-medium" aria-live="polite">{qty}</span>
        <button type="button" aria-label="Increase quantity" className="grid size-11 place-items-center rounded-md border" onClick={() => setQty((q) => Math.min(10, q + 1))}><Plus className="size-4" aria-hidden /></button>
      </div>
      {/* Mobile: sticky bar; desktop: inline */}
      <div className="fixed inset-x-0 bottom-16 z-30 flex items-center gap-2 border-t bg-card p-3 pb-safe shadow-lg md:static md:shadow-none md:z-auto md:border-0 md:bg-transparent md:p-0">
        <WishlistButton slug={product.slug} name={product.name} className="border" />
        <Button size="lg" className="flex-1" disabled={!inStock} onClick={() => add()}>
          {added ? <><Check className="size-5" aria-hidden /> Added</> : <><ShoppingBag className="size-5" aria-hidden /> Add to cart · {formatBDT((variant?.selling_price ?? product.selling_price) * qty)}</>}
        </Button>
      </div>
      <Button asChild variant="outline" className="hidden w-full md:inline-flex"><Link href="/checkout" onClick={() => add(false)} aria-disabled={!inStock}>Buy now</Link></Button>
    </div>
  );
}
