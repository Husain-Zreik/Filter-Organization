import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpDown, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Eye, Pencil, Search, Trash2, X } from 'lucide-react'

function normalizeDate(value) {
  if (!value) return null
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export default function AdminDataTable({
  columns = [],
  rows = [],
  searchKeys = [],
  filterConfig = {},
  dateKey = 'updatedAt',
  loading = false,
  pageSize = 6,
  onView,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [sortState, setSortState] = useState({ key: '', direction: 'asc' })
  const [page, setPage] = useState(1)

  function setFilter(key, value) {
    setPage(1)
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function handleSort(key, sortable) {
    if (!sortable) return
    setPage(1)
    setSortState((prev) => {
      if (prev.key !== key) return { key, direction: 'asc' }
      return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
    })
  }

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    return rows
      .filter((row) => {
        if (!query) return true
        return searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(query))
      })
      .filter((row) => {
        return Object.entries(filterConfig).every(([key]) => {
          const selected = filters[key]
          if (!selected) return true
          return String(row[key]) === String(selected)
        })
      })
      .filter((row) => {
        const from = filters.dateFrom
        const to = filters.dateTo
        if (!from && !to) return true
        const rowDate = normalizeDate(row[dateKey])
        if (!rowDate) return false
        const fromDate = from ? normalizeDate(from) : null
        const toDate = to ? normalizeDate(to) : null
        if (fromDate && rowDate < fromDate) return false
        if (toDate && rowDate > toDate) return false
        return true
      })
  }, [dateKey, filterConfig, filters, rows, search, searchKeys])

  const sortedRows = useMemo(() => {
    if (!sortState.key) return filteredRows
    const { key, direction } = sortState
    return [...filteredRows].sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue
      }
      const aText = String(aValue ?? '').toLowerCase()
      const bText = String(bValue ?? '').toLowerCase()
      return direction === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText)
    })
  }, [filteredRows, sortState])

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * pageSize
  const pageRows = sortedRows.slice(pageStart, pageStart + pageSize)

  const hasActiveFilters = Boolean(search || filters.dateFrom || filters.dateTo || Object.entries(filterConfig).some(([k]) => filters[k]))

  function clearAll() {
    setSearch('')
    setFilters({})
    setSortState({ key: '', direction: 'asc' })
    setPage(1)
  }

  const inp = 'w-full bg-[#F7F9FB] border border-[#00334a]/15 rounded-xl px-3 py-2 text-sm text-primary focus:outline-none focus:border-accent focus:bg-white transition-colors duration-150'

  return (
    <div className="space-y-4">

      {/* ── Filter card ── */}
      <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-4 space-y-3">

        {/* Row 1: Search + filter selects */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

          {/* Search */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-secondary/70">{t('admin.table.searchLabel')}</label>
            <div className="relative">
              <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-secondary/50 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                placeholder={t('admin.table.searchPlaceholder')}
                className={`${inp} ps-9 pe-3`}
              />
            </div>
          </div>

          {/* Filter selects */}
          {Object.entries(filterConfig).map(([key, options]) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-secondary/70">{t(`admin.table.filters.${key}`)}</label>
              <div className="relative">
                <select
                  value={filters[key] ?? ''}
                  onChange={(e) => setFilter(key, e.target.value)}
                  className={`${inp} appearance-none pe-8`}
                >
                  <option value="">{t('common.all')}</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute top-1/2 -translate-y-1/2 end-3 text-secondary/50 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Date range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-secondary/70">{t('admin.table.from')}</label>
            <div className="relative">
              <CalendarDays size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-secondary/50 pointer-events-none" />
              <input
                type="date"
                value={filters.dateFrom ?? ''}
                onChange={(e) => setFilter('dateFrom', e.target.value)}
                className={`${inp} ps-9`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-secondary/70">{t('admin.table.to')}</label>
            <div className="relative">
              <CalendarDays size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-secondary/50 pointer-events-none" />
              <input
                type="date"
                value={filters.dateTo ?? ''}
                onChange={(e) => setFilter('dateTo', e.target.value)}
                className={`${inp} ps-9`}
              />
            </div>
          </div>
        </div>

        {/* Row 3: Result count + clear */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#00334a]/6">
          <p className="text-xs text-secondary/60">
            {t('admin.table.resultCount', { count: sortedRows.length })}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center gap-1.5 text-xs font-semibold text-accent px-3 py-1.5 rounded-lg border border-accent/30 hover:bg-accent hover:text-white transition-all duration-150"
            >
              <X size={12} />
              {t('admin.table.clearFilters')}
            </button>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto rounded-2xl border border-[#00334a]/8 shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F7F9FB] border-b border-[#00334a]/8">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-start text-xs font-bold text-secondary/80">
                  <button
                    type="button"
                    onClick={() => handleSort(col.key, col.sortable)}
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    {col.label}
                    {col.sortable && (
                      <ArrowUpDown
                        size={12}
                        className={sortState.key === col.key ? 'text-accent' : 'opacity-40'}
                      />
                    )}
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-start text-xs font-bold text-secondary/80">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#00334a]/6">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-xs text-secondary/50">
                  {t('admin.loading')}
                </td>
              </tr>
            ) : pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-xs text-secondary/50">
                  {t('admin.noData')}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F7F9FB] transition-colors duration-150">
                  {columns.map((col) => (
                    <td key={`${row.id}-${col.key}`} className="px-4 py-3 text-secondary/90">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(row)}
                          className="p-1.5 rounded-lg text-secondary/60 hover:bg-[#E8EDF0] hover:text-secondary transition-all duration-150"
                          title={t('admin.view')}
                        >
                          <Eye size={14} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="p-1.5 rounded-lg text-primary/70 hover:bg-primary hover:text-white transition-all duration-150"
                          title={t('admin.edit')}
                        >
                          <Pencil size={14} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="p-1.5 rounded-lg text-[#c62828]/70 hover:bg-[#c62828] hover:text-white transition-all duration-150"
                          title={t('admin.delete')}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg border border-[#00334a]/15 disabled:opacity-30 hover:bg-[#F7F9FB] transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs font-semibold text-secondary/70 px-2">
          {t('admin.table.pageOf', { page: currentPage, total: totalPages })}
        </span>
        <button
          type="button"
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-lg border border-[#00334a]/15 disabled:opacity-30 hover:bg-[#F7F9FB] transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
