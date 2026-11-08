import { cn } from "@/lib/utils";

/**
 * Generated placeholder for products without photography (mock data). Uses an inline
 * oklch gradient from the category hue; replaced by next/image when `url` exists.
 */
export function ProductArt({ hue, label, className }: { hue: number; label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ background: `linear-gradient(155deg, oklch(0.9 0.05 ${hue}), oklch(0.72 0.1 ${hue}))` }}
    >
      <div className="jamdani-border absolute inset-x-0 bottom-0 opacity-70" aria-hidden />
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full opacity-25" aria-hidden>
        <path d="M50 12 L88 50 L50 88 L12 50Z" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M50 28 L72 50 L50 72 L28 50Z" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
