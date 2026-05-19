export default function AdminAccountsLoading() {
  return (
    <div className="space-y-8">
      <div>
        <div className="skeleton-luxe-bare h-10 w-48 rounded-lg md:h-14" />
        <div className="skeleton-luxe-bare mt-2 h-5 w-96 rounded" />
      </div>
      <div className="skeleton-luxe h-48 rounded-xl" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton-luxe h-40 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
