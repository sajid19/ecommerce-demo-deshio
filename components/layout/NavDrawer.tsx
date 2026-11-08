"use client";
import Link from "next/link";
import { Heart, PackageSearch, User } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import type { Category } from "@/lib/data/types";
import { accountLinks, menuLinks } from "./nav-data";
import { useShell } from "./ShellState";

const icons = { "My Account": User, "My Wishlist": Heart, "Track Order": PackageSearch } as const;

export function NavDrawer({ categories, hotline, hotlineLabel }: { categories: Category[]; hotline: string; hotlineLabel: string }) {
  const { drawerOpen, setDrawerOpen } = useShell();
  const close = () => setDrawerOpen(false);
  const row = "flex min-h-12 items-center px-4 text-body font-medium hover:bg-muted";
  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen} title="Welcome to Deshio" side="left">
      <div className="space-y-1 border-b p-4">
        <p lang="bn" className="font-bangla text-body-sm text-muted-foreground">দেশীয়-তে স্বাগতম</p>
        <div className="flex gap-3 pt-2 text-body-sm font-medium">
          <Link href="/login" onClick={close} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-primary text-primary-foreground">Login</Link>
          <Link href="/register" onClick={close} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-primary text-primary">Register</Link>
        </div>
      </div>
      <nav aria-label="Menu" className="py-2">
        <h3 className="px-4 pb-1 pt-2 font-sans text-caption font-semibold uppercase tracking-widest text-muted-foreground">Menu</h3>
        {menuLinks.map((l) => (
          <Link key={l.href} href={l.href} onClick={close} className={row}>{l.name}</Link>
        ))}
      </nav>
      <div className="jamdani-border" aria-hidden />
      <nav aria-label="Categories" className="py-2">
        <h3 className="px-4 pb-1 pt-2 font-sans text-caption font-semibold uppercase tracking-widest text-muted-foreground">Categories</h3>
        {categories.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} onClick={close} className={row}>{c.name}</Link>
        ))}
      </nav>
      <div className="jamdani-border" aria-hidden />
      <nav aria-label="Account" className="py-2">
        {accountLinks.map((l) => {
          const Icon = icons[l.name === "My Wishlist" ? "My Wishlist" : l.name];
          return (
            <Link key={l.href} href={l.href} onClick={close} className={`${row} gap-3`}>
              <Icon className="size-5 text-primary" aria-hidden /> {l.name}
            </Link>
          );
        })}
        <a href={`tel:${hotline}`} className={`${row} gap-3 text-primary`}>Call {hotlineLabel}</a>
      </nav>
    </Sheet>
  );
}
