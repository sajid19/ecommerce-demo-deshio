import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-7xl px-4 py-3 md:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1 text-caption text-muted-foreground">
        {trail.map((t, i) => (
          <li key={t.name} className="flex items-center gap-1">
            {t.href && i < trail.length - 1 ? <Link href={t.href} className="hover:text-primary">{t.name}</Link> : <span aria-current="page" className="text-foreground">{t.name}</span>}
            {i < trail.length - 1 && <ChevronRight className="size-3" aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
