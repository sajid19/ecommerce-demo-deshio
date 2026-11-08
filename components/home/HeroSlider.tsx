"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/lib/data/types";
import { ProductArt } from "@/components/product/ProductArt";
import { cn } from "@/lib/utils";

export function HeroSlider({ banners }: { banners: Banner[] }) {
  const rowRef = React.useRef<HTMLUListElement>(null);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const goTo = React.useCallback((i: number) => {
    const row = rowRef.current;
    if (!row) return;
    const n = (i + banners.length) % banners.length;
    row.scrollTo({ left: n * row.clientWidth, behavior: "smooth" });
  }, [banners.length]);

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const onScroll = () => setIndex(Math.round(row.scrollLeft / row.clientWidth));
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => row.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo(index + 1), 6000);
    return () => clearInterval(t);
  }, [index, paused, goTo]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative overflow-hidden md:mx-auto md:mt-4 md:max-w-7xl md:rounded-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul ref={rowRef} className="snap-row snap-row-center">
        {banners.map((b, i) => (
          <li key={b.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${banners.length}`} className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            {b.image ? (
              <>
                <Image src={b.imageMobile ?? b.image} alt="" fill priority={i === 0} sizes="100vw" className="object-cover sm:hidden" />
                <Image src={b.image} alt="" fill priority={i === 0} sizes="(min-width:1280px) 1280px, 100vw" className="hidden object-cover sm:block" />
              </>
            ) : (
              <ProductArt hue={b.hue} label="" className="absolute inset-0" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 max-w-2xl p-6 pb-10 text-ink-foreground md:p-12">
              <p className="text-caption font-semibold uppercase tracking-widest text-accent">Deshio Collection</p>
              {i === 0 ? <h1 className="font-display text-h1 font-semibold md:text-display">{b.title}</h1> : <h2 className="font-display text-h1 font-semibold md:text-display">{b.title}</h2>}
              <p className="mt-1 text-body">{b.subtitle}</p>
              <Link href={b.href} tabIndex={i === index ? 0 : -1} className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-6 text-body-sm font-medium text-primary-foreground hover:bg-primary/90">{b.cta}</Link>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous slide" className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 md:grid"><ChevronLeft className="size-5" aria-hidden /></button>
      <button type="button" onClick={() => goTo(index + 1)} aria-label="Next slide" className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-card/90 md:grid"><ChevronRight className="size-5" aria-hidden /></button>
      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        {banners.map((b, i) => (
          <button key={b.id} type="button" onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === index} className="grid size-11 place-items-center">
            <span className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-accent" : "w-1.5 bg-ink-foreground/60")} />
          </button>
        ))}
      </div>
    </section>
  );
}
