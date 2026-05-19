export default function AdminNewsLoading() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="skeleton-luxe-bare h-10 w-32 rounded-lg md:h-14" />
          <div className="skeleton-luxe-bare mt-2 h-5 w-48 rounded" />
        </div>
        <div className="skeleton-luxe-bare h-10 w-48 rounded-lg" />
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-luxe h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
