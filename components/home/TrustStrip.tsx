import { Award, Headset, Landmark, Truck } from "lucide-react";
import { getTrustBadges } from "@/lib/data/content";

const icons = { truck: Truck, landmark: Landmark, award: Award, headset: Headset };



export async function TrustStrip() {
  const badges = await getTrustBadges();
  return (
    <section aria-label="Why shop with Deshio" className="bg-secondary">
      <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 py-6 md:px-6 lg:grid-cols-4 lg:px-8">
        {badges.map((b) => {
          const Icon = icons[b.icon];
          return (
            <li key={b.en} className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-primary"><Icon className="size-5" aria-hidden /></span>
              <div>
                <p className="text-body-sm font-semibold">{b.en}</p>
                <p lang="bn" className="mt-0.5 font-bangla text-caption text-muted-foreground">{b.bn}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
