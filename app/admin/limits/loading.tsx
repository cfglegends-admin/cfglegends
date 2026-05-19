export default function AdminLimitsLoading() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="skeleton-luxe-bare h-10 w-32 rounded-lg md:h-14" />
          <div className="skeleton-luxe-bare mt-2 h-5 w-48 rounded" />
        </div>
        <div className="skeleton-luxe-bare h-10 w-40 rounded-lg" />
      </div>
      <div className="skeleton-luxe h-96 rounded-xl" />
    </div>
  );
}
