export default function AdminDownloadsLoading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-10 w-32 animate-pulse rounded-lg bg-muted md:h-14" />
          <div className="mt-2 h-5 w-48 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-10 w-56 animate-pulse rounded-lg bg-muted" />
      </div>

      {/* Table skeleton */}
      <div className="h-96 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
