import Link from "next/link";
import { AccountShell } from "@/components/account/AccountShell";
import { getCustomer, getOrders } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";
import { formatBDT } from "@/lib/utils";

export const metadata = buildMetadata({ title: "My Account", description: "Your Deshio account.", path: "/account", noindex: true });

export default async function AccountPage() {
  const [customer, orders] = await Promise.all([getCustomer(), getOrders()]);
  return (
    <AccountShell title="My Account" current="/account">
      <p className="mb-6 text-muted-foreground">Welcome back, <strong className="text-foreground">{customer.name}</strong>. <span className="text-caption">(Demo customer — sign-in is connected after the demo.)</span></p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4"><p className="text-caption text-muted-foreground">Orders</p><p className="text-h3 font-semibold">{orders.length}</p></div>
        <div className="rounded-lg border bg-card p-4"><p className="text-caption text-muted-foreground">Addresses</p><p className="text-h3 font-semibold">{customer.addresses.length}</p></div>
        <div className="rounded-lg border bg-card p-4"><p className="text-caption text-muted-foreground">Lifetime spend</p><p className="text-h3 font-semibold">{formatBDT(orders.reduce((n, o) => n + o.total, 0))}</p></div>
      </div>
      <h2 className="mb-2 mt-8 font-display text-h4 font-semibold">Recent orders</h2>
      <ul className="divide-y rounded-lg border bg-card">
        {orders.map((o) => (
          <li key={o.order_number}><Link href={`/account/orders/${o.order_number}`} className="flex min-h-14 items-center justify-between px-4 hover:bg-muted"><span>{o.order_number}<span className="ml-3 text-caption capitalize text-muted-foreground">{o.status}</span></span><span className="font-medium">{formatBDT(o.total)}</span></Link></li>
        ))}
      </ul>
    </AccountShell>
  );
}
