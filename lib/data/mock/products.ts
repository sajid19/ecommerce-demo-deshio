import type { Product } from "../types";
import erp from "./erp-products.json";

// Real catalogue slice baked from the ERP (names tidied, photos resized to 3:4 WebP in /public/products).
// Prices and stock are the ERP's sell_price / batch quantity. Ratings, badges and sale tags are demo-only.
const blurbs: Record<string, string> = {
  saree: "Soft, elegant and easy to drape. Pair with a contrast blouse for the full look.",
  "jamdani-saree": "Hand-woven Dhakai Jamdani with traditional motifs. Each piece takes weeks to weave.",
  "three-piece": "Complete set with kameez, salwar and dupatta. Comfortable all-day fabric.",
  "ready-to-wear": "Designed and stitched by Deshio. Ready to wear straight out of the pack.",
  jewellery: "Statement pieces finished by hand. Store away from water and perfume.",
  accessories: "Practical and stylish, chosen to go with Deshio outfits.",
  "home-decor": "Made by Bangladeshi artisans to brighten your home.",
  food: "Traditional recipe, made fresh. Delivered chilled within Dhaka.",
};
const collectionPool = ["boishakh", "eid", "wedding"];
const round50 = (n: number) => Math.round(n / 50) * 50;

let id = 0;
export const products: Product[] = erp.map((e, idx): Product => {
  id += 1;
  const posInCat = erp.filter((x) => x.category === e.category).findIndex((x) => x.slug === e.slug);
  const onSale = id % 4 === 0 && e.price >= 500;
  const blurb = blurbs[e.category];
  return {
    id,
    slug: e.slug,
    name: e.name,
    sku: `DS-${String(e.erp_id).padStart(5, "0")}`,
    short_description: blurb,
    description: `${blurb} ${e.name} (${e.sub.toLowerCase()}) is part of Deshio's collection and quality-checked before it leaves our store.`,
    selling_price: e.price,
    compare_at_price: onSale ? round50(e.price * 1.18) : undefined,
    category_slug: e.category,
    collection_slugs: [collectionPool[idx % 3]],
    images: e.images.map((url, n) => ({ id: id * 10 + n, url, is_primary: n === 0, alt_text: `${e.name} — view ${n + 1}` })),
    variants: [{ id: id * 100 + 1, sku: `DS-${String(e.erp_id).padStart(5, "0")}-1`, selling_price: e.price, in_stock: e.qty > 0, stock_quantity: e.qty }],
    in_stock: e.qty > 0,
    tags: [e.category, e.sub.toLowerCase()],
    ratings: { average: 4 + ((id * 3) % 10) / 10, count: 8 + ((id * 11) % 120) },
    is_new: posInCat % 3 === 2,
    is_best_seller: posInCat < 2,
    is_doi_ghor: e.category === "food",
    created_at: new Date(Date.UTC(2026, 9, 1 + ((id * 5) % 25))).toISOString(),
  };
});
