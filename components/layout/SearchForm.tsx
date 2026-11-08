import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/** Plain GET form: works with JS disabled and is crawlable via the WebSite SearchAction. */
export function SearchForm({ className, autoFocus }: { className?: string; autoFocus?: boolean }) {
  return (
    <form action="/search" role="search" className={cn("relative", className)}>
      <label htmlFor="site-search" className="sr-only">Search products</label>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        id="site-search"
        name="q"
        type="search"
        autoFocus={autoFocus}
        placeholder="Search saree, jamdani, jewellery…"
        className="h-11 w-full rounded-full bg-muted pl-12 pr-5 text-body placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
      />
    </form>
  );
}
