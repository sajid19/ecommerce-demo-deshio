import Link from "next/link";
import { getAnnouncements } from "@/lib/data/content";

export async function AnnouncementBar() {
  const items = await getAnnouncements();
  const row = (hidden: boolean) => (
    <ul className="flex items-center" aria-hidden={hidden || undefined}>
      {items.map((a) => (
        <li key={a.id} className="flex items-center whitespace-nowrap px-8">
          <Link href={a.href} tabIndex={hidden ? -1 : undefined} className="hover:underline focus-visible:outline-accent">{a.text}</Link>
          <span className="ml-16 text-accent" aria-hidden>◆</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="bg-ink text-ink-foreground" role="region" aria-label="Announcements">
      <div className="marquee flex h-9 items-center text-caption font-medium">
        <div className="marquee-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
      <div className="jamdani-border-line !h-1.5" aria-hidden />
    </div>
  );
}
