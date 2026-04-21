export default function KartenLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-muted md:h-14 md:w-96" />
          <div className="mt-4 h-5 w-full max-w-lg animate-pulse rounded bg-muted" />
        </header>

        {/* Filter skeleton */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-28 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full animate-pulse rounded-lg bg-muted" style={{ aspectRatio: "59 / 86" }} />
              <div className="px-1">
                <div className="mb-1.5 h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="flex items-center justify-between">
                  <div className="h-3 w-10 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-14 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
