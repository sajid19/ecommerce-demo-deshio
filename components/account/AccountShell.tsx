import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

const links = [
  ["Overview", "/account"], ["Orders", "/account/orders"], ["Addresses", "/account/addresses"], ["Profile", "/account/profile"], ["Wishlist", "/wishlist"],
] as const;

export function AccountShell({ title, current, children }: { title: string; current: string; children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "My Account", href: "/account" }, ...(current === "/account" ? [] : [{ name: title }])]} />
      <Container className="grid gap-6 pb-12 md:grid-cols-[14rem_1fr]">
        <nav aria-label="Account" className="flex gap-1 overflow-x-auto md:flex-col">
          {links.map(([n, h]) => (
            <Link key={h} href={h} aria-current={h === current ? "page" : undefined}
              className={`flex min-h-11 items-center whitespace-nowrap rounded-md px-4 text-body-sm font-medium ${h === current ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{n}</Link>
          ))}
        </nav>
        <div>
          <h1 className="mb-4 font-display text-h2 font-semibold">{title}</h1>
          {children}
        </div>
      </Container>
    </>
  );
}
