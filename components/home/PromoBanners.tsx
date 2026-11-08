import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const tiles = [
  { href: "/collections/eid", eyebrow: "ঈদ স্পেশাল", title: "Eid Edit", sub: "Festive sarees and sets, ready to gift", image: "/hero/saree.webp" },
  { href: "/collections/wedding", eyebrow: "বিয়ের মৌসুম", title: "Wedding Season", sub: "Jewellery and jamdani for the big day", image: "/hero/jewel.webp" },
];

export function PromoBanners() {
  return (
    <section aria-label="Featured collections" className="py-4 md:py-8">
      <Container className="grid gap-4 md:grid-cols-2 md:gap-6">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="group relative block aspect-[16/9] overflow-hidden rounded-xl">
            <Image src={t.image} alt="" fill sizes="(min-width:768px) 600px, 100vw" className="object-cover transition-transform duration-500 md:group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-5 text-ink-foreground md:p-7">
              <p lang="bn" className="font-bangla text-body-sm text-accent">{t.eyebrow}</p>
              <h2 className="font-display text-h2 font-semibold">{t.title}</h2>
              <p className="mt-1 text-body-sm text-ink-foreground/85">{t.sub}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-body-sm font-medium">Shop now <ArrowRight className="size-4" aria-hidden /></span>
            </div>
          </Link>
        ))}
      </Container>
    </section>
  );
}
