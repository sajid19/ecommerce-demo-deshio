export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Content is built server-side from our own data; "<" is escaped to keep it inert inside <script>.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
