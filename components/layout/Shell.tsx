import { getCategories } from "@/lib/data/catalog";
import { getSiteInfo } from "@/lib/data/content";
import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MiniCart } from "./MiniCart";
import { NavDrawer } from "./NavDrawer";
import { SmartNavBar } from "./SmartNavBar";

export async function Shell({ children }: { children: React.ReactNode }) {
  const [categories, site] = await Promise.all([getCategories(), getSiteInfo()]);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="min-h-[60vh] pb-16 md:pb-0">{children}</main>
      <Footer />
      <SmartNavBar hotline={site.hotline} />
      <NavDrawer categories={categories} hotline={site.hotline} hotlineLabel={site.hotlineLabel} />
      <MiniCart />
    </>
  );
}
