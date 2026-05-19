export default function DatenschutzLoading() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
      <div className="h-4 w-20 bg-white/5 animate-pulse rounded mb-8" />
      <div className="h-12 w-64 bg-white/5 animate-pulse rounded mb-8 md:h-16 md:w-96" />
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="mt-12">
          <div className="h-8 w-72 bg-white/5 animate-pulse rounded mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/5 animate-pulse rounded" />
            <div className="h-4 w-11/12 bg-white/5 animate-pulse rounded" />
            <div className="h-4 w-4/5 bg-white/5 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-white/5 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </article>
  );
}
