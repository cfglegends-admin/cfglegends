export default function KartenLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12">
          <div className="h-10 w-64 bg-white/5 animate-pulse rounded-lg md:h-14 md:w-96" />
          <div className="mt-4 h-5 w-full max-w-lg bg-white/5 animate-pulse rounded" />
        </header>

        {/* Filter skeleton */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 w-28 bg-white/5 animate-pulse rounded-lg" />
          ))}
        </div>

        {/* Card grid skeleton — mirrors CardGrid exactly */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-[59/86] rounded-2xl bg-white/5 border border-gold/20 animate-pulse" />
              <div className="px-1">
                <div className="mb-1.5 h-4 w-3/4 bg-white/5 animate-pulse rounded" />
                <div className="flex items-center justify-between">
                  <div className="h-3 w-10 bg-white/5 animate-pulse rounded" />
                  <div className="h-5 w-14 bg-white/5 animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
