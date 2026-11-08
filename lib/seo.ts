import type { Metadata } from "next";
import { getSiteInfo } from "./data/content";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3102").replace(/\/$/, "");
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Per-page metadata with canonical + OG + Twitter. Non-production hosts are noindex. */
export function buildMetadata(opts: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: { title: opts.title, description: opts.description, url: abs(opts.path), siteName: "Deshio দেশীয়", type: "website", locale: "en_BD" },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
    robots: !IS_PRODUCTION || opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export async function organizationJsonLd() {
  const s = await getSiteInfo();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Deshio",
    alternateName: s.nameBn,
    url: SITE_URL,
    logo: abs("/brand/deshio.png"),
    sameAs: s.social.map((x) => x.href),
    contactPoint: [{ "@type": "ContactPoint", telephone: s.hotline, contactType: "customer service", areaServed: "BD", availableLanguage: ["en", "bn"] }],
  };
}

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Deshio",
  url: SITE_URL,
  potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/search?q={search_term_string}`, "query-input": "required name=search_term_string" },
});

export const breadcrumbJsonLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
});
