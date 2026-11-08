import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data/types";
import { Container } from "@/components/ui/Container";
import { formatBDT } from "@/lib/utils";

export function ShopTheLook({ products, image }: { products: Product[]; image: string }) {
  if (!products.length) return null;
  return (
    <section aria-labelledby="look-title" className="bg-secondary py-12 md:py-16">
      <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-xl">
          <Image src={image} alt="Gold tissue kota saree styled with jewellery" fill sizes="(min-width:768px) 450px, 100vw" className="object-cover" />
        </div>
        <div>
          <p lang="bn" className="font-bangla text-body-sm text-primary">লুক কিনুন</p>
          <h2 id="look-title" className="font-display text-h2 font-semibold md:text-h1">Complete the look</h2>
          <div className="jamdani-border mt-2 w-16" aria-hidden />
          <p className="mt-4 text-body text-muted-foreground">A saree, the jewellery and the finishing touch, styled by our team.</p>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {products.map((p) => (
              <li key={p.id}>
                <Link href={`/product/${p.slug}`} className="block overflow-hidden rounded-lg border bg-card transition-shadow md:hover:shadow-md">
                  <span className="relative block aspect-[3/4]">
                    {p.images[0]?.url && <Image src={p.images[0].url} alt={p.name} fill sizes="(min-width:768px) 200px, 45vw" className="object-cover" />}
                  </span>
                  <span className="block p-3">
                    <span className="line-clamp-1 block text-body-sm font-medium">{p.name}</span>
                    <span className="block text-body-sm font-semibold">{formatBDT(p.selling_price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/category/saree" className="mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-6 text-body-sm font-medium text-primary-foreground hover:bg-primary/90">Shop the full edit</Link>
        </div>
      </Container>
    </section>
  );
}
