// The ONLY module pages/components import catalogue data from. Today it reads mock
// arrays; when the API lands (WP-06) replace these bodies with fetch calls to the
// ERP catalogue endpoints. Keep the signatures stable.
import { categories as categoryData } from "./mock/categories";
import { products } from "./mock/products";
import { collections } from "./mock/content";
import type { Category, Collection, Paginated, Product, ProductQuery } from "./types";

const withCounts = (): Category[] =>
  categoryData.map((c) => ({ ...c, product_count: products.filter((p) => p.category_slug === c.slug).length }));

export async function getCategories(): Promise<Category[]> {
  return withCounts();
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return withCounts().find((c) => c.slug === slug);
}

export async function getCollections(): Promise<Collection[]> {
  return collections;
}

export async function getCollection(slug: string): Promise<Collection | undefined> {
  return collections.find((c) => c.slug === slug);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getAllProductSlugs(): Promise<string[]> {
  return products.map((p) => p.slug);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products.filter((p) => p.category_slug === product.category_slug && p.id !== product.id).slice(0, limit);
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.is_best_seller).slice(0, limit);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  return [...products].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, limit);
}

export async function getDoiGhorFeatured(limit = 6): Promise<Product[]> {
  return products.filter((p) => p.is_doi_ghor).slice(0, limit);
}

export async function getProductsByCategory(slug: string, limit = 10): Promise<Product[]> {
  return products.filter((p) => p.category_slug === slug).slice(0, limit);
}

export async function listProducts(query: ProductQuery = {}): Promise<Paginated<Product>> {
  const { category, collection, q, sort = "featured", min, max, inStock, page = 1, pageSize = 12 } = query;
  let items = products.filter((p) => {
    if (category && p.category_slug !== category) return false;
    if (collection && !p.collection_slugs.includes(collection)) return false;
    if (q && !`${p.name} ${p.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (min !== undefined && p.selling_price < min) return false;
    if (max !== undefined && p.selling_price > max) return false;
    if (inStock && !p.in_stock) return false;
    return true;
  });
  const sorters: Record<string, (a: Product, b: Product) => number> = {
    newest: (a, b) => b.created_at.localeCompare(a.created_at),
    "price-asc": (a, b) => a.selling_price - b.selling_price,
    "price-desc": (a, b) => b.selling_price - a.selling_price,
    best: (a, b) => Number(b.is_best_seller) - Number(a.is_best_seller),
    featured: (a, b) => a.id - b.id,
  };
  items = [...items].sort(sorters[sort] ?? sorters.featured);
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), lastPage);
  return { items: items.slice((safePage - 1) * pageSize, safePage * pageSize), total, page: safePage, pageSize, lastPage };
}

export async function getSearchSuggestions(q: string, limit = 5): Promise<Product[]> {
  if (!q.trim()) return [];
  return (await listProducts({ q, pageSize: limit })).items;
}
