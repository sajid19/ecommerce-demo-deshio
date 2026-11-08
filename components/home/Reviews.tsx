import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const reviews = [
  { quote: "The jamdani arrived in two days. The weave is even more beautiful in person.", name: "Nusrat J.", city: "Dhaka" },
  { quote: "Ordered a 3-piece for Eid. Fit and fabric were exactly as shown on the photos.", name: "Farzana A.", city: "Chattogram" },
  { quote: "Lovely packaging and the necklace set looked stunning at my sister's wedding.", name: "Tasnim R.", city: "Sylhet" },
  { quote: "Fresh sandesh, still cold on delivery. Will order the ghee again.", name: "Mahmud H.", city: "Dhaka" },
];

export function Reviews() {
  return (
    <section aria-label="Customer reviews" className="py-12 md:py-16">
      <Container><SectionHeading title="Loved across Bangladesh" eyebrowBn="গ্রাহকের কথা" /></Container>
      <div className="mx-auto w-full max-w-7xl md:px-6 lg:px-8">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {reviews.map((r) => (
            <li key={r.name} className="w-[80vw] shrink-0 snap-start rounded-lg border bg-card p-5 sm:w-72 md:w-auto">
              <p className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-accent text-accent" aria-hidden />)}</p>
              <p className="mt-3 text-body">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-4 text-caption text-muted-foreground">{r.name} · {r.city}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
