"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { House, LayoutGrid, Phone, Search, User } from "lucide-react";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/lib/utils";
import { SearchForm } from "./SearchForm";
import { useShell } from "./ShellState";

const item = "relative flex min-h-11 flex-col items-center justify-center gap-0.5 text-caption text-muted-foreground";

/** Hides on scroll down, returns on scroll up. One passive listener, rAF-throttled. */
export function useScrollDirectionHidden(threshold = 8) {
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) > threshold) {
          setHidden(y > last && y > 80);
          last = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return hidden;
}

export function SmartNavBar({ hotline }: { hotline: string }) {
  const pathname = usePathname();
  const hidden = useScrollDirectionHidden();
  const { setDrawerOpen, searchOpen, setSearchOpen } = useShell();
  const active = (p: string) => (p === "/" ? pathname === "/" : pathname.startsWith(p));
  const cls = (on: boolean) => cn(item, on && "font-semibold text-primary before:absolute before:top-0 before:h-0.5 before:w-8 before:rounded-full before:bg-primary");
  return (
    <>
      <nav
        aria-label="Quick navigation"
        data-hidden={hidden}
        className={cn(
          "pb-safe fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-5 border-t bg-card transition-transform duration-250 ease-out md:hidden",
          hidden && "translate-y-full",
        )}
      >
        <Link href="/" className={cls(active("/"))} aria-current={active("/") ? "page" : undefined}><House className="size-5" aria-hidden />Home</Link>
        <button type="button" className={cls(false)} onClick={() => setDrawerOpen(true)}><LayoutGrid className="size-5" aria-hidden />Category</button>
        <button type="button" className={cls(searchOpen)} onClick={() => setSearchOpen(true)}><Search className="size-5" aria-hidden />Search</button>
        <Link href="/account" className={cls(active("/account") || active("/login"))}><User className="size-5" aria-hidden />Profile</Link>
        <a href={`tel:${hotline}`} className={cls(false)}><Phone className="size-5" aria-hidden />Phone</a>
      </nav>
      <Sheet open={searchOpen} onOpenChange={setSearchOpen} title="Search" side="bottom">
        <div className="p-4"><SearchForm autoFocus /></div>
      </Sheet>
    </>
  );
}
