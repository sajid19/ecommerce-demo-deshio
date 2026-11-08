"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useStore } from "@/lib/cart/CartProvider";
import { cn, formatBDT } from "@/lib/utils";

const DISTRICTS = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh", "Gazipur", "Narayanganj", "Cumilla", "Other"];
const PAYMENTS = ["Cash on Delivery", "bKash", "Nagad", "Card"];
const COUPONS: Record<string, number> = { DESHIO10: 0.1 };

export function CheckoutForm() {
  const router = useRouter();
  const { lines, subtotal, clear, ready } = useStore();
  const [district, setDistrict] = React.useState("Dhaka");
  const [payment, setPayment] = React.useState(PAYMENTS[0]);
  const [coupon, setCoupon] = React.useState("");
  const [applied, setApplied] = React.useState<string | null>(null);
  const [couponMsg, setCouponMsg] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [busy, setBusy] = React.useState(false);

  const discount = applied ? Math.round(subtotal * COUPONS[applied]) : 0;
  const delivery = subtotal - discount >= 5000 && district === "Dhaka" ? 0 : district === "Dhaka" ? 80 : 130;
  const total = subtotal - discount + delivery;

  if (!ready) return <div className="h-64 animate-pulse rounded-lg bg-muted" aria-busy="true" />;
  if (lines.length === 0)
    return (
      <div className="rounded-lg border bg-card p-12 text-center">
        <p className="font-display text-h3">Nothing to check out yet</p>
        <Button asChild className="mt-4"><Link href="/shop">Start shopping</Link></Button>
      </div>
    );

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) { setApplied(code); setCouponMsg(`${code} applied — 10% off`); }
    else { setApplied(null); setCouponMsg("Invalid coupon code (try DESHIO10)"); }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    if (!String(f.get("name") ?? "").trim()) errs.name = "Enter your full name";
    if (!/^01[3-9]\d{8}$/.test(String(f.get("phone") ?? "").trim())) errs.phone = "Enter a valid 11-digit mobile number (01XXXXXXXXX)";
    if (!String(f.get("address") ?? "").trim()) errs.address = "Enter your delivery address";
    setErrors(errs);
    if (Object.keys(errs).length) {
      (e.currentTarget.querySelector("[aria-invalid=true]") as HTMLElement | null)?.focus();
      return;
    }
    setBusy(true);
    // TODO(api): POST order to the D3 order endpoint; demo fabricates an order number.
    const orderNumber = `DS-${100300 + Math.floor(Math.random() * 600)}`;
    setTimeout(() => { clear(); router.push(`/order-confirmation/${orderNumber}`); }, 700);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div className="space-y-6">
        <section className="space-y-4 rounded-lg border bg-card p-5" aria-labelledby="ship-h">
          <h2 id="ship-h" className="font-display text-h4 font-semibold">Delivery details</h2>
          <Input name="name" label="Full name" autoComplete="name" error={errors.name} />
          <Input name="phone" label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" error={errors.phone} />
          <Input name="email" label="Email (optional)" type="email" autoComplete="email" />
          <div>
            <label htmlFor="district" className="mb-1.5 block text-body-sm font-medium">District</label>
            <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="h-11 w-full rounded-md border border-input bg-card px-3 text-body">
              {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <Input name="address" label="Full address" autoComplete="street-address" error={errors.address} hint="House, road, area" />
        </section>
        <fieldset className="space-y-3 rounded-lg border bg-card p-5">
          <legend className="px-1 font-display text-h4 font-semibold">Payment</legend>
          {PAYMENTS.map((p) => (
            <label key={p} className={cn("flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 has-[:checked]:border-primary has-[:checked]:bg-primary/5")}>
              <input type="radio" name="payment" value={p} checked={payment === p} onChange={() => setPayment(p)} className="size-4 accent-primary" /> {p}
            </label>
          ))}
          <p className="text-caption text-muted-foreground">Online payment gateways are connected after the demo; selecting one here places the order as pending.</p>
        </fieldset>
      </div>
      <aside className="h-fit space-y-3 rounded-lg border bg-card p-5" aria-labelledby="sum-h">
        <h2 id="sum-h" className="font-display text-h4 font-semibold">Order summary</h2>
        <ul className="space-y-1 text-body-sm">
          {lines.map((l) => <li key={l.key} className="flex justify-between gap-2"><span className="truncate">{l.quantity} × {l.name}</span><span>{formatBDT(l.quantity * l.unit_price)}</span></li>)}
        </ul>
        <div className="flex gap-2 border-t pt-3">
          <input aria-label="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="h-11 min-w-0 flex-1 rounded-md border border-input bg-card px-3" />
          <Button type="button" variant="secondary" onClick={applyCoupon}>Apply</Button>
        </div>
        {couponMsg && <p role="status" className={cn("text-caption", applied ? "text-success" : "text-destructive")}>{couponMsg}</p>}
        <dl className="space-y-1 border-t pt-3 text-body-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatBDT(subtotal)}</dd></div>
          {discount > 0 && <div className="flex justify-between text-success"><dt>Discount</dt><dd>-{formatBDT(discount)}</dd></div>}
          <div className="flex justify-between"><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : formatBDT(delivery)}</dd></div>
          <div className="flex justify-between border-t pt-2 text-body font-semibold"><dt>Total</dt><dd>{formatBDT(total)}</dd></div>
        </dl>
        <Button type="submit" size="lg" className="w-full" loading={busy}>Place order</Button>
      </aside>
    </form>
  );
}
