import type { Metadata, Viewport } from "next";
import { Fraunces, Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { ShellProvider } from "@/components/layout/ShellState";
import { JsonLd } from "@/components/seo/JsonLd";
import { CartProvider } from "@/lib/cart/CartProvider";
import { IS_PRODUCTION, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const hind = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600"], variable: "--font-hind", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Deshio দেশীয় — Heritage fashion, jamdani, 3-piece & jewellery", template: "%s | Deshio দেশীয়" },
  description: "Shop authentic Bangladeshi heritage: jamdani sarees, 3-piece sets, jewellery, home decor and fresh sweets. Fast delivery nationwide.",
  applicationName: "Deshio",
  robots: IS_PRODUCTION ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { siteName: "Deshio দেশীয়", type: "website", locale: "en_BD" },
  icons: { icon: "/brand/deshio.png" },
};

export const viewport: Viewport = { themeColor: "#8c4230", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${hind.variable}`}>
      <body>
        <JsonLd data={await organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <CartProvider>
          <ShellProvider>
            <Shell>{children}</Shell>
          </ShellProvider>
        </CartProvider>
      </body>
    </html>
  );
}
