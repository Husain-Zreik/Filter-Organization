// ── Base pulse block ─────────────────────────────────────────────────────────
export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-[#E0E7ED] rounded-lg ${className}`} />
}

// ── Table row skeleton ────────────────────────────────────────────────────────
// cols = number of data columns (actions column is added automatically)
export function SkeletonTableRow({ cols = 4 }) {
  return (
    <tr className="border-b border-[#00334a]/6 last:border-0">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <Skeleton className={`h-4 ${i === 0 ? 'w-2/3' : 'w-1/2'}`} />
        </td>
      ))}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-7 w-7 rounded-lg" />
        </div>
      </td>
    </tr>
  )
}

// ── Stat card skeleton ────────────────────────────────────────────────────────
// Mirrors the DashboardHome stat card: icon square + large number + label
export function SkeletonStatCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-4">
      <Skeleton className="h-8 w-8 rounded-xl mb-3" />
      <Skeleton className="h-7 w-10 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  )
}

// ── Content card skeleton ─────────────────────────────────────────────────────
// Mirrors ContentCard: h-44 image area + p-5 body (badges, title, desc, footer)
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-[#00334a]/6">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}
