// Shapes mirror the legacy storefront API (frontend/services/catalogService.ts,
// collectionService.ts, cartService.ts) so swapping lib/data/* for real calls
// does not ripple into components.

export interface ProductImage {
  id: number;
  /** null => the UI renders a generated placeholder (mock data has no photography yet). */
  url: string | null;
  is_primary: boolean;
  alt_text: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  /** Hue 0-360 used by the generated placeholder art. */
  hue: number;
  name_bn?: string;
  /** Cover photo (3:4 WebP under /public/products). */
  image?: string;
  product_count: number;
}

export interface ProductVariant {
  id: number;
  sku: string;
  color?: string;
  size?: string;
  selling_price: number;
  in_stock: boolean;
  stock_quantity: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  sku: string;
  short_description: string;
  description: string;
  selling_price: number;
  /** Original price when on sale. */
  compare_at_price?: number;
  category_slug: string;
  collection_slugs: string[];
  images: ProductImage[];
  variants: ProductVariant[];
  in_stock: boolean;
  tags: string[];
  ratings: { average: number; count: number };
  is_new: boolean;
  is_best_seller: boolean;
  is_doi_ghor: boolean;
  created_at: string;
}

export interface Collection {
  id: number;
  slug: string;
  name: string;
  description: string;
  hue: number;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  hue: number;
  /** Wide hero photo under /public/hero. Falls back to generated art. */
  image?: string;
  /** Portrait crop for phones. */
  imageMobile?: string;
}

export interface Announcement {
  id: number;
  text: string;
  href: string;
}

export interface Store {
  id: number;
  slug: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  image: string;
}

export type OrderStatus = "placed" | "confirmed" | "packed" | "shipped" | "delivered";

export interface OrderLine {
  product_slug: string;
  name: string;
  variant?: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  order_number: string;
  invoice_number: string;
  phone: string;
  status: OrderStatus;
  placed_at: string;
  lines: OrderLine[];
  subtotal: number;
  delivery_charge: number;
  total: number;
  payment: string;
  address: string;
  timeline: { status: OrderStatus; at: string | null }[];
}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  addresses: { id: number; label: string; line: string; district: string; is_default: boolean }[];
}

export interface PolicyPage {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
}

export interface ProductQuery {
  category?: string;
  collection?: string;
  q?: string;
  sort?: "featured" | "newest" | "price-asc" | "price-desc" | "best";
  min?: number;
  max?: number;
  inStock?: boolean;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  lastPage: number;
}
