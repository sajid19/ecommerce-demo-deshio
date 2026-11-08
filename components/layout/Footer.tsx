import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getCategories } from "@/lib/data/catalog";
import { getSiteInfo, getStores } from "@/lib/data/content";

type IconProps = { className?: string; "aria-hidden"?: boolean };
const svg = (d: string) => function SocialIcon(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d={d} /></svg>;
};
const socialIcon = {
  Facebook: svg("M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"),
  Instagram: svg("M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.5 6.5h.01"),
  YouTube: svg("M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17zM10 15l5-3-5-3z"),
} as const;
const linkCls = "inline-flex min-h-11 items-center text-body-sm text-ink-foreground/80 hover:text-ink-foreground";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-ink-foreground/15 py-2 md:border-0 md:py-0 [&[open]>summary>span]:rotate-45" open>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-display text-h4 md:pointer-events-none md:cursor-default">
        {title}
        <span aria-hidden className="text-accent transition-transform md:hidden">+</span>
      </summary>
      <div className="flex flex-col pb-3">{children}</div>
    </details>
  );
}

export async function Footer() {
  const [site, stores, categories] = await Promise.all([getSiteInfo(), getStores(), getCategories()]);
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="jamdani-border" aria-hidden />
      <div className="mx-auto grid w-full max-w-7xl gap-x-8 px-4 py-10 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
        <Group title="Brand & Contact">
          <p className="font-display text-h3 font-semibold">Deshio <span lang="bn" className="font-bangla">দেশীয়</span></p>
          <p className="mt-1 text-body-sm text-ink-foreground/80">{site.tagline}</p>
          <a href={`tel:${site.hotline}`} className={`${linkCls} gap-2`}><Phone className="size-4" aria-hidden />Hotline {site.hotlineLabel}</a>
          <p className="py-1 text-body-sm text-ink-foreground/80">Working hours: {site.hours}</p>
          <p className="flex gap-2 py-1 text-body-sm text-ink-foreground/80"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />Head Office: {site.headOffice}</p>
          <a href={`mailto:${site.managementEmail}`} className={`${linkCls} gap-2`}><Mail className="size-4" aria-hidden />{site.managementEmail}</a>
          <div className="flex gap-2 pt-2">
            {site.social.map((s) => {
              const Icon = socialIcon[s.name as keyof typeof socialIcon];
              return <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-11 place-items-center rounded-full border border-ink-foreground/30 hover:bg-ink-foreground/10">{Icon ? <Icon className="size-5" aria-hidden /> : s.name[0]}</a>;
            })}
          </div>
        </Group>
        <Group title="Information & Policies">
          <Link className={linkCls} href="/about">About Us</Link>
          <Link className={linkCls} href="/policies/privacy">Privacy Policy</Link>
          <Link className={linkCls} href="/policies/shipping">Shipping Policy</Link>
          <Link className={linkCls} href="/policies/return-exchange">Return &amp; Exchange Policy</Link>
          <Link className={linkCls} href="/policies/payment-refund">Payment &amp; Refund Policy</Link>
          <Link className={linkCls} href="/feedback">Customer Feedback</Link>
          <Link className={linkCls} href="/grievance">Grievance &amp; Nodal Officer</Link>
        </Group>
        <Group title="Store Locations">
          {stores.map((s) => (
            <Link key={s.slug} href={`/stores#${s.slug}`} className={linkCls}>{s.name}</Link>
          ))}
          <Link href="/stores" className={`${linkCls} text-accent`}>All stores &amp; map</Link>
          <h3 className="mt-4 font-display text-h4">Shop</h3>
          {categories.slice(0, 4).map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={linkCls}>{c.name}</Link>
          ))}
        </Group>
        <Group title="Join Us & Business">
          <Link className={linkCls} href="/careers">Join Us / Career</Link>
          <Link className={linkCls} href="/vendor-registration">Supplier / Vendor Registration</Link>
          <Link className={linkCls} href="/partner">Become Our Partner</Link>
          <Link className={linkCls} href="/wholesale">Become a Wholesaler</Link>
          <Link className={linkCls} href="/track-order">Track Order</Link>
        </Group>
      </div>
      <div className="border-t border-ink-foreground/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 pb-24 text-caption text-ink-foreground/70 md:flex-row md:px-6 md:pb-4 lg:px-8">
          <p>© {new Date().getFullYear()} Deshio দেশীয়. All rights reserved.</p>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Accepted payment methods">
              {["Cash on Delivery", "bKash", "Nagad", "Rocket", "Visa", "Mastercard"].map((m) => (
                <li key={m} className="grid h-8 place-items-center rounded-md bg-card px-3 text-caption font-semibold text-foreground">{m}</li>
              ))}
            </ul>
            <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Delivery partners">
              {["Pathao", "Steadfast", "RedX", "Paperfly"].map((m) => (
                <li key={m} className="grid h-8 place-items-center rounded-md border border-ink-foreground/30 px-3 text-caption font-medium">{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
