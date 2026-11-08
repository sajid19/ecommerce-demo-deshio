import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/data/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductArt } from "@/components/product/ProductArt";

/** Auto-scrolling marquee of categories on mobile (pauses on touch/hover/focus, static grid on md+). */
export function CategoryCarousel({ categories }: { categories: Category[] }) {
  const tile = (c: Category, hidden: boolean) => (
    <li key={`${c.slug}-${hidden}`} className="w-24 shrink-0 snap-start md:w-auto" aria-hidden={hidden || undefined}>
      <Link href={`/category/${c.slug}`} tabIndex={hidden ? -1 : undefined} className="flex min-h-11 flex-col items-center text-center">
        <span className="block aspect-square w-full overflow-hidden rounded-full border-2 border-accent p-0.5">
          {c.image ? (
            <span className="relative block size-full overflow-hidden rounded-full">
              <Image src={c.image} alt={c.name} fill sizes="(min-width:1024px) 12vw, 96px" className="object-cover object-top" />
            </span>
          ) : (
            <ProductArt hue={c.hue} label={c.name} className="rounded-full" />
          )}
        </span>
        <span className="mt-2 text-body-sm font-medium">{c.name}</span>
      </Link>
    </li>
  );
  return (
    <section aria-label="Browse our categories" className="py-12 md:py-16">
      <Container><SectionHeading title="Browse Our Categories" eyebrowBn="আমাদের ক্যাটাগরি" href="/shop" /></Container>
      <div className="mx-auto w-full max-w-7xl md:px-6 lg:px-8">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-8">
          {categories.map((c) => tile(c, false))}
        </ul>
      </div>
    </section>
  );
}
