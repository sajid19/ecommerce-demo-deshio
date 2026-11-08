import Link from "next/link";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function JourneySection() {
  return (
    <section aria-labelledby="journey-title" className="bg-secondary py-10 md:py-16">
      <Container className="grid items-center gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image src="/brand/Mirpure_store.png" alt="Deshio store, Mirpur" fill sizes="(min-width:768px) 600px, 100vw" className="object-cover" />
        </div>
        <div>
          <p lang="bn" className="font-bangla text-body-sm text-primary">আমাদের যাত্রা</p>
          <h2 id="journey-title" className="font-display text-h2 font-semibold md:text-h1">Our Journey</h2>
          <div className="jamdani-border mt-2 w-16 !h-2" aria-hidden />
          <p className="mt-4 text-body text-muted-foreground">
            Deshio began with a simple belief: Bangladesh&apos;s craft deserves to be worn, gifted and handed down. From a single
            Jamdani loom to stores across Dhaka, we work directly with weavers and artisans so every piece carries its maker&apos;s story.
          </p>
          <Link href="/about" className="mt-6 inline-flex min-h-11 items-center rounded-md border border-primary px-6 text-body-sm font-medium text-primary hover:bg-primary/5">Read our story</Link>
        </div>
      </Container>
    </section>
  );
}
