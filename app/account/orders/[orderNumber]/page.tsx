import { notFound } from "next/navigation";
import { AccountShell } from "@/components/account/AccountShell";
import { OrderTimeline } from "@/components/account/TrackOrder";
import { getOrder } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";
import { formatBDT } from "@/lib/utils";

export const metadata = buildMetadata({ title: "Order details", description: "Your Deshio order.", path: "/account/orders", noindex: true });

export default async function OrderDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const order = await getOrder((await params).orderNumber);
  if (!order) notFound();
  return (
    <AccountShell title={`Order ${order.order_number}`} current="/account/orders">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border bg-card p-5" aria-label="Status"><OrderTimeline order={order} /></section>
        <section className="space-y-3 rounded-lg border bg-card p-5" aria-label="Items">
          <ul className="divide-y text-body-sm">{order.lines.map((l) => <li key={l.name} className="flex justify-between py-2"><span>{l.quantity} × {l.name}</span><span>{formatBDT(l.quantity * l.unit_price)}</span></li>)}</ul>
          <dl className="space-y-1 border-t pt-3 text-body-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatBDT(order.subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd>{order.delivery_charge ? formatBDT(order.delivery_charge) : "Free"}</dd></div>
            <div className="flex justify-between font-semibold"><dt>Total</dt><dd>{formatBDT(order.total)}</dd></div>
          </dl>
          <p className="text-caption text-muted-foreground">Paid via {order.payment}. Delivering to {order.address}.</p>
        </section>
      </div>
    </AccountShell>
  );
}
