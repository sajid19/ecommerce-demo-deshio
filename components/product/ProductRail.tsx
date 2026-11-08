import type { Product } from "@/lib/data/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "./ProductCard";

export function ProductRail({ title, eyebrowBn, href, products, id }: { title: string; eyebrowBn?: string; href?: string; products: Product[]; id?: string; /** @deprecated marquee removed; kept so callers compile */ auto?: boolean }) {
  if (!products.length) return null;
  return (
    <section id={id} aria-label={title} className="py-12 md:py-16">
      <Container>
        <SectionHeading title={title} eyebrowBn={eyebrowBn} href={href} />
      </Container>
      <div className={`mx-auto w-full max-w-7xl md:px-6 lg:px-8 `}>
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 overscroll-x-contain px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-4">
          {products.map((p) => (
            <li key={p.id} className="w-[44vw] shrink-0 snap-start sm:w-56 md:w-auto">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
