import Link from "next/link";
import { AccountShell } from "@/components/account/AccountShell";
import { getOrders } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";
import { formatBDT } from "@/lib/utils";

export const metadata = buildMetadata({ title: "My Orders", description: "Your Deshio orders.", path: "/account/orders", noindex: true });

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <AccountShell title="My Orders" current="/account/orders">
      <ul className="space-y-3">
        {orders.map((o) => (
          <li key={o.order_number} className="rounded-lg border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{o.order_number} <span className="ml-2 rounded-full bg-secondary px-2.5 py-0.5 text-caption capitalize">{o.status}</span></p>
              <p className="font-semibold">{formatBDT(o.total)}</p>
            </div>
            <p className="text-caption text-muted-foreground">{new Date(o.placed_at).toLocaleDateString("en-GB", { dateStyle: "medium" })} · {o.lines.length} item(s) · {o.payment}</p>
            <Link href={`/account/orders/${o.order_number}`} className="mt-2 inline-flex min-h-11 items-center text-body-sm font-medium text-primary">View details</Link>
          </li>
        ))}
      </ul>
    </AccountShell>
  );
}
