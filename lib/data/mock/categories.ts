import type { Category } from "../types";
import erp from "./erp-products.json";

// Storefront categories mirror the ERP's top-level categories (cutsybds_deshio_erp):
// SAREE, JAMDANI SAREE, 3PIECE, DESHIO FACTORY + 1/2 PIECE (Ready to Wear), JEWELLERY, ACCESSOIES, HOME DECOR, FOOD.
const cover = (slug: string) => erp.find((p) => p.category === slug)?.images[0];

export const categories: Category[] = [
  { id: 1, slug: "saree", name: "Saree", name_bn: "শাড়ি", description: "Monipuri, silk, cotton and batik sarees for every occasion.", hue: 340, image: cover("saree"), product_count: 0 },
  { id: 2, slug: "jamdani-saree", name: "Jamdani Saree", name_bn: "জামদানি শাড়ি", description: "Hand-woven Dhakai Jamdani, a UNESCO-recognised craft, in 40 to 100 count.", hue: 15, image: cover("jamdani-saree"), product_count: 0 },
  { id: 3, slug: "three-piece", name: "3 Piece", name_bn: "থ্রি পিস", description: "Cotton, silk and jamdani three-piece sets, stitched and unstitched.", hue: 35, image: cover("three-piece"), product_count: 0 },
  { id: 4, slug: "ready-to-wear", name: "Ready to Wear", name_bn: "রেডি টু ওয়ার", description: "Kurti, koti dresses and 2-piece sets from Deshio's own factory.", hue: 300, image: cover("ready-to-wear"), product_count: 0 },
  { id: 5, slug: "jewellery", name: "Jewellery", name_bn: "গয়না", description: "Necklaces, bangles, jhumka and anklets, finished by hand.", hue: 85, image: cover("jewellery"), product_count: 0 },
  { id: 6, slug: "accessories", name: "Accessories", name_bn: "এক্সেসরিজ", description: "Bags, purses and hijabs to finish the look.", hue: 200, image: cover("accessories"), product_count: 0 },
  { id: 7, slug: "home-decor", name: "Home Decor", name_bn: "হোম ডেকর", description: "Bedsheets, rugs, table sets and shotoronji for the home.", hue: 55, image: cover("home-decor"), product_count: 0 },
  { id: 8, slug: "food", name: "Food", name_bn: "খাবার", description: "Sandesh, ghee, butter and traditional sweets, made fresh.", hue: 70, image: cover("food"), product_count: 0 },
];
