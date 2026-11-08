import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({ title, eyebrowBn, href, as: Tag = "h2" }: { title: string; eyebrowBn?: string; href?: string; as?: "h1" | "h2" }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrowBn && <p lang="bn" className="font-bangla text-body-sm text-primary">{eyebrowBn}</p>}
        <Tag className="font-display text-h3 font-semibold md:text-h2">{title}</Tag>
        <div className="jamdani-border mt-2 w-16 !h-2" aria-hidden />
      </div>
      {href && (
        <Link href={href} className="inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-body-sm font-medium text-primary">
          View all <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
