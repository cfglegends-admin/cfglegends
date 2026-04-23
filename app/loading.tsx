export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
          <div className="h-32 w-64 animate-pulse rounded-lg bg-muted md:h-48 md:w-96" />
          <div className="h-6 w-64 animate-pulse rounded bg-muted" />
          <div className="h-10 w-40 animate-pulse rounded-lg bg-muted" />
        </div>
      </section>

      {/* Section skeletons */}
      <div className="space-y-24 py-16">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-muted md:h-14 md:w-96" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-48 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
