"use client";
import Image from "next/image";
import * as React from "react";
import type { ProductImage } from "@/lib/data/types";
import { ProductArt } from "./ProductArt";
import { cn } from "@/lib/utils";

export function Gallery({ images, hue, name }: { images: ProductImage[]; hue: number; name: string }) {
  const [active, setActive] = React.useState(0);
  const current = images[active];
  const art = (img: ProductImage | undefined, i: number, big: boolean) =>
    img?.url ? (
      <Image src={img.url} alt={img.alt_text} fill sizes={big ? "(min-width:1024px) 50vw, 100vw" : "80px"} className="object-cover" priority={big && i === 0} />
    ) : (
      <ProductArt hue={(hue + i * 18) % 360} label={img?.alt_text ?? name} />
    );
  return (
    <div className="space-y-3">
      <div
        className="group relative aspect-[3/4] overflow-hidden rounded-lg border bg-muted [@media(hover:hover)]:cursor-zoom-in"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const el = e.currentTarget.firstElementChild as HTMLElement | null;
          if (el) el.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
        }}
      >
        <div className="absolute inset-0 transition-transform duration-200 [@media(hover:hover)]:group-hover:scale-[2]">{art(current, active, true)}</div>
      </div>
      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-2" aria-label="Product images">
          {images.map((img, i) => (
            <li key={img.id}>
              <button type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-pressed={i === active}
                className={cn("relative block aspect-[3/4] w-full overflow-hidden rounded-md border-2", i === active ? "border-primary" : "border-transparent")}>
                {art(img, i, false)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
