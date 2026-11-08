import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getStores } from "@/lib/data/content";
import { SITE_URL, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Store Locations", description: "Find a Deshio store near you in Dhaka: addresses, opening hours, phone and directions.", path: "/stores" });

export default async function StoresPage({ searchParams }: { searchParams: Promise<{ store?: string }> }) {
  const stores = await getStores();
  const { store } = await searchParams;
  const selected = stores.find((s) => s.slug === store) ?? stores[0];
  // Keyless Google Maps embed (demo). TODO(api): swap for Maps JavaScript API with a marker per store.
  const mapSrc = `https://www.google.com/maps?q=${selected.lat},${selected.lng}&z=16&output=embed`;
  const jsonLd = stores.map((s) => ({
    "@context": "https://schema.org", "@type": "ClothingStore", name: `Deshio — ${s.name}`, url: `${SITE_URL}/stores#${s.slug}`,
    telephone: s.phone, address: { "@type": "PostalAddress", streetAddress: s.address, addressCountry: "BD" },
    geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lng },
  }));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": jsonLd }} />
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Store Locations" }]} />
      <Container className="pb-12">
        <SectionHeading as="h1" title="Store Locations" eyebrowBn="আমাদের শোরুম" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <ul className="space-y-4">
            {stores.map((s) => (
              <li key={s.slug} id={s.slug} className={`overflow-hidden rounded-xl border bg-card ${s.slug === selected.slug ? "ring-2 ring-primary" : ""}`}>
                <div className="jamdani-border" aria-hidden />
                <div className="flex flex-col gap-4 p-5 md:p-6">
                  <div className="relative hidden aspect-[3/1] overflow-hidden rounded-md sm:block"><Image src={s.image} alt={`${s.name} store`} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" /></div>
                  <h2 className="font-display text-h4 font-semibold"><MapPin className="mr-2 inline size-5 text-primary" aria-hidden />{s.name}</h2>
                  <p className="text-body-sm text-muted-foreground">{s.address}</p>
                  <p className="flex items-center gap-2 text-body-sm"><Clock className="size-4" aria-hidden />{s.hours}</p>
                  <div className="flex gap-3">
                    <Button asChild className="flex-1"><a href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`} target="_blank" rel="noopener noreferrer">Get directions</a></Button>
                    <Button asChild variant="outline" className="flex-1"><a href={`tel:${s.phone}`}><Phone className="size-4" aria-hidden />Call</a></Button>
                    {s.slug !== selected.slug && <Button asChild variant="ghost"><a href={`/stores?store=${s.slug}`}>Show on map</a></Button>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="h-80 overflow-hidden rounded-xl border lg:sticky lg:top-24 lg:h-[34rem]">
            <iframe title={`Map: Deshio ${selected.name}`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full border-0" />
          </div>
        </div>
      </Container>
    </>
  );
}
