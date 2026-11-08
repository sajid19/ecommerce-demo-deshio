import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PromoBanners } from "@/components/home/PromoBanners";
import { Reviews } from "@/components/home/Reviews";
import { ShopTheLook } from "@/components/home/ShopTheLook";
import { JourneySection } from "@/components/home/JourneySection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProductRail } from "@/components/product/ProductRail";
import { getBestSellers, getCategories, getDoiGhorFeatured, getNewArrivals, getProduct, getProductsByCategory } from "@/lib/data/catalog";
import { getBanners } from "@/lib/data/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Deshio দেশীয় — Authentic Bangladeshi heritage fashion",
  description: "Jamdani sarees, 3-piece, jewellery, home decor and fresh sweets. Fastest shipping nationwide and a premium heritage collection.",
  path: "/",
});
// Static with hourly regeneration once the API supplies live stock/prices.
export const revalidate = 3600;

export default async function HomePage() {
  const lookSlugs = ["tissue-kota-saree-gold", "ruby-stone-necklace-set-silver", "pearl-jhumka-earrings", "embroidered-potli-bag-maroon"];
  const [banners, categories, best, fresh, saree, jewellery, accessories, jamdani, doi, look] = await Promise.all([
    getBanners(), getCategories(), getBestSellers(8), getNewArrivals(8),
    getProductsByCategory("saree", 8), getProductsByCategory("jewellery", 8),
    getProductsByCategory("accessories", 8), getProductsByCategory("jamdani-saree", 8), getDoiGhorFeatured(6),
    Promise.all(lookSlugs.map((x) => getProduct(x))),
  ]);
  return (
    <>
      <HeroSlider banners={banners} />
      <TrustStrip />
      <CategoryCarousel categories={categories} />
      <ProductRail title="Best-Selling Products" eyebrowBn="সর্বাধিক বিক্রিত" href="/best-selling" products={best} />
      <PromoBanners />
      <ProductRail title="New Arrivals" eyebrowBn="নতুন কালেকশন" href="/new-arrivals" products={fresh} />
      <ShopTheLook image="/hero/saree-m.webp" products={look.filter((p): p is NonNullable<typeof p> => !!p)} />
      <ProductRail title="Sarees" eyebrowBn="শাড়ি" href="/category/saree" products={saree} />
      <ProductRail title="Jamdani Saree" eyebrowBn="জামদানি" href="/category/jamdani-saree" products={jamdani} />
      <ProductRail title="Jewellery" eyebrowBn="জুয়েলারি" href="/category/jewellery" products={jewellery} />
      <ProductRail title="Accessories" eyebrowBn="এক্সেসরিজ" href="/category/accessories" products={accessories} />
      <Reviews />
      <ProductRail title="Fresh Food" eyebrowBn="খাবার" href="/category/food" products={doi} />
      <JourneySection />
    </>
  );
}
