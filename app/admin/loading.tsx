export default function AdminLoading() {
  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="skeleton-luxe-bare h-10 w-48 rounded-lg md:h-14" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-luxe h-32 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
