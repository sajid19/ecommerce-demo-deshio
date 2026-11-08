import { AccountShell } from "@/components/account/AccountShell";
import { getCustomer } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "My Addresses", description: "Your saved delivery addresses.", path: "/account/addresses", noindex: true });

export default async function AddressesPage() {
  const { addresses } = await getCustomer();
  return (
    <AccountShell title="My Addresses" current="/account/addresses">
      <ul className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <li key={a.id} className="rounded-lg border bg-card p-4">
            <p className="font-medium">{a.label} {a.is_default && <span className="ml-2 rounded-full bg-accent px-2.5 py-0.5 text-caption text-accent-foreground">Default</span>}</p>
            <p className="text-body-sm text-muted-foreground">{a.line}, {a.district}</p>
          </li>
        ))}
      </ul>
    </AccountShell>
  );
}
