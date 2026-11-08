import type { MetadataRoute } from "next";
import { getAllProductSlugs, getCategories, getCollections } from "@/lib/data/catalog";
import { getPolicies } from "@/lib/data/content";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, categories, collections, policies] = await Promise.all([getAllProductSlugs(), getCategories(), getCollections(), getPolicies()]);
  const now = new Date();
  const fixed = ["/", "/shop", "/best-selling", "/new-arrivals", "/stores", "/about", "/track-order", "/feedback", "/grievance", "/careers", "/vendor-registration", "/partner", "/wholesale"];
  return [
    ...fixed.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: p === "/" ? ("daily" as const) : ("weekly" as const), priority: p === "/" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${SITE_URL}/category/${c.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 })),
    ...collections.map((c) => ({ url: `${SITE_URL}/collections/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...policies.map((p) => ({ url: `${SITE_URL}/policies/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...slugs.map((s) => ({ url: `${SITE_URL}/product/${s}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 })),
  ];
}
