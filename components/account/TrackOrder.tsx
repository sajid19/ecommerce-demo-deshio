"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Order } from "@/lib/data/types";
import { cn, formatBDT } from "@/lib/utils";

const LABEL: Record<string, string> = { placed: "Order placed", confirmed: "Confirmed", packed: "Packed", shipped: "Shipped", delivered: "Delivered" };

export function OrderTimeline({ order }: { order: Order }) {
  return (
    <ol className="space-y-4" aria-label="Delivery status">
      {order.timeline.map((t) => (
        <li key={t.status} className="flex items-start gap-3">
          <span className={cn("mt-0.5 grid size-6 place-items-center rounded-full border-2", t.at ? "border-success bg-success text-success-foreground" : "border-border")}>{t.at && <Check className="size-3.5" aria-hidden />}</span>
          <div>
            <p className={cn("text-body-sm font-medium", !t.at && "text-muted-foreground")}>{LABEL[t.status]}</p>
            {t.at && <p className="text-caption text-muted-foreground">{new Date(t.at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function TrackOrder({ orders }: { orders: Order[] }) {
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState<Order | null | undefined>(undefined);
  const [error, setError] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const key = value.trim().toUpperCase();
    const digits = value.replace(/\D/g, "");
    if (!key) { setError("Enter your mobile number or invoice number"); setResult(undefined); return; }
    setError("");
    // TODO(api): replace with the order lookup endpoint (mobile or invoice).
    setResult(orders.find((o) => o.invoice_number === key || o.order_number === key || (digits.length >= 10 && o.phone === digits.slice(-11))) ?? null);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} noValidate className="space-y-3 rounded-lg border bg-card p-5">
        <Input label="Mobile number or invoice number" name="lookup" value={value} onChange={(e) => setValue(e.target.value)} placeholder="01XXXXXXXXX or INV-100234" error={error} hint="Demo: try 01711000000 or INV-100234" />
        <Button type="submit">Track order</Button>
      </form>
      <div aria-live="polite">
        {result === null && <p role="alert" className="rounded-lg border border-destructive/40 bg-card p-5 text-destructive">No order found for “{value}”. Check the number and try again.</p>}
        {result && (
          <section className="space-y-4 rounded-lg border bg-card p-5" aria-label={`Order ${result.order_number}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-h4 font-semibold">{result.invoice_number}</h2>
              <p className="text-body-sm text-muted-foreground">{result.lines.length} item(s) · {formatBDT(result.total)}</p>
            </div>
            <OrderTimeline order={result} />
          </section>
        )}
      </div>
    </div>
  );
}
