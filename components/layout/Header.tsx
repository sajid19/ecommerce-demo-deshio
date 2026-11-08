import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/data/catalog";
import { AccountLink, CartButton, MenuButton, WishlistLink } from "./HeaderActions";
import { SearchForm } from "./SearchForm";

function Logo({ className }: { className: string }) {
  return (
    <Link href="/" aria-label="Deshio — home" className="inline-flex items-center">
      <Image src="/brand/deshio-mark.png" alt="Deshio দেশীয়" width={385} height={218} priority className={className} />
    </Link>
  );
}

export async function Header() {
  const categories = await getCategories();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      {/* Mobile: slim bar (primary navigation is the bottom SmartNavBar + drawer) */}
      <div className="flex h-14 items-center justify-between px-2 md:hidden">
        <MenuButton />
        <Logo className="h-9 w-auto" />
        <CartButton />
      </div>
      {/* Desktop */}
      <div className="mx-auto hidden w-full max-w-7xl md:block md:px-6 lg:px-8">
        <div className="grid h-20 grid-cols-[auto_1fr_auto] items-center gap-6">
          <Logo className="h-14 w-auto" />
          <SearchForm className="mx-auto w-full max-w-xl" />
          <div className="flex items-center gap-1">
            <WishlistLink />
            <AccountLink />
            <CartButton />
          </div>
        </div>
        <nav aria-label="Primary" className="flex h-11 items-center gap-8 text-body-sm font-medium">
          <Link href="/shop" className="hover:text-primary">Shop All</Link>
          {categories.slice(0, 6).map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className="hover:text-primary">{c.name}</Link>
          ))}
          <Link href="/best-selling" className="hover:text-primary">Best Selling</Link>
          <Link href="/stores" className="ml-auto hover:text-primary">Stores</Link>
        </nav>
      </div>
    </header>
  );
}
