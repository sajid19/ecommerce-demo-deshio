export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10" aria-busy="true" aria-label="Loading">
      <div className="mb-6 h-8 w-48 animate-pulse rounded-md bg-muted" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-[4/5] animate-pulse rounded-lg bg-muted" />)}
      </div>
    </div>
  );
}
