export default function AdminAuditLoading() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div>
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted md:h-14" />
        <div className="mt-2 h-5 w-96 animate-pulse rounded bg-muted" />
      </div>

      {/* Table skeleton */}
      <div className="h-96 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
