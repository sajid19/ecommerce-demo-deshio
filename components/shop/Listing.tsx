import Link from "next/link";
import type { Category, Paginated, Product, ProductQuery } from "@/lib/data/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

export type RawParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseQuery(sp: RawParams): ProductQuery {
  const num = (v?: string) => (v && !Number.isNaN(Number(v)) ? Number(v) : undefined);
  return {
    q: one(sp.q)?.trim() || undefined,
    sort: (one(sp.sort) as ProductQuery["sort"]) || "featured",
    min: num(one(sp.min)),
    max: num(one(sp.max)),
    inStock: one(sp.inStock) === "1",
    page: num(one(sp.page)) ?? 1,
  };
}

const sorts = [
  ["featured", "Featured"], ["newest", "Newest"], ["best", "Best selling"], ["price-asc", "Price: low to high"], ["price-desc", "Price: high to low"],
] as const;

function pageHref(basePath: string, q: ProductQuery, page: number) {
  const p = new URLSearchParams();
  if (q.q) p.set("q", q.q);
  if (q.sort && q.sort !== "featured") p.set("sort", q.sort);
  if (q.min !== undefined) p.set("min", String(q.min));
  if (q.max !== undefined) p.set("max", String(q.max));
  if (q.inStock) p.set("inStock", "1");
  if (page > 1) p.set("page", String(page));
  const s = p.toString();
  return s ? `${basePath}?${s}` : basePath;
}

export function Listing({ title, titleBn, description, basePath, query, result, categories, hiddenQ }: {
  title: string; titleBn?: string; description?: string; basePath: string; query: ProductQuery; result: Paginated<Product>; categories?: Category[]; hiddenQ?: boolean;
}) {
  return (
    <Container className="pb-12">
      <header className="pt-2">
        <SectionHeading as="h1" title={title} eyebrowBn={titleBn} />
        {description && <p className="-mt-2 mb-4 max-w-2xl text-body-sm text-muted-foreground">{description}</p>}
      </header>
      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <aside aria-label="Filters">
          <details className="rounded-lg border bg-card lg:!block" open>
            <summary className="flex min-h-11 cursor-pointer items-center px-4 font-medium lg:pointer-events-none">Filter &amp; sort</summary>
            <form action={basePath} method="get" className="space-y-4 border-t p-4">
              {query.q && !hiddenQ && <input type="hidden" name="q" value={query.q} />}
              <div>
                <label htmlFor="sort" className="mb-1.5 block text-body-sm font-medium">Sort by</label>
                <select id="sort" name="sort" defaultValue={query.sort} className="h-11 w-full rounded-md border border-input bg-card px-3 text-body">
                  {sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <fieldset>
                <legend className="mb-1.5 text-body-sm font-medium">Price (৳)</legend>
                <div className="flex gap-2">
                  <input name="min" type="number" inputMode="numeric" min={0} placeholder="Min" aria-label="Minimum price" defaultValue={query.min} className="h-11 w-full rounded-md border border-input bg-card px-3 text-body" />
                  <input name="max" type="number" inputMode="numeric" min={0} placeholder="Max" aria-label="Maximum price" defaultValue={query.max} className="h-11 w-full rounded-md border border-input bg-card px-3 text-body" />
                </div>
              </fieldset>
              <label className="flex min-h-11 items-center gap-3 text-body-sm">
                <input type="checkbox" name="inStock" value="1" defaultChecked={query.inStock} className="size-5 accent-primary" /> In stock only
              </label>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Apply</Button>
                <Button asChild variant="ghost"><Link href={basePath}>Reset</Link></Button>
              </div>
            </form>
            {categories && (
              <nav aria-label="Categories" className="hidden border-t p-4 lg:block">
                <p className="mb-2 text-body-sm font-medium">Categories</p>
                <ul>{categories.map((c) => (
                  <li key={c.slug}><Link href={`/category/${c.slug}`} className="flex min-h-11 items-center justify-between text-body-sm hover:text-primary">{c.name}<span className="text-caption text-muted-foreground">{c.product_count}</span></Link></li>
                ))}</ul>
              </nav>
            )}
          </details>
        </aside>
        <section aria-label="Products">
          <p className="mb-3 text-body-sm text-muted-foreground" aria-live="polite">{result.total} {result.total === 1 ? "product" : "products"}</p>
          {result.items.length === 0 ? (
            <div className="rounded-lg border bg-card p-10 text-center">
              <p className="font-display text-h3">No products found</p>
              <p className="mt-1 text-muted-foreground">Try removing a filter or searching for something else.</p>
              <Button asChild className="mt-4"><Link href="/shop">Browse all products</Link></Button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
              {result.items.map((p, i) => <li key={p.id}><ProductCard product={p} priority={i < 2} /></li>)}
            </ul>
          )}
          {result.lastPage > 1 && (
            <nav aria-label="Pagination" className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: result.lastPage }, (_, i) => i + 1).map((n) => (
                <Link key={n} href={pageHref(basePath, query, n)} aria-current={n === result.page ? "page" : undefined}
                  className={`grid size-11 place-items-center rounded-md border text-body-sm ${n === result.page ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{n}</Link>
              ))}
            </nav>
          )}
        </section>
      </div>
    </Container>
  );
}
