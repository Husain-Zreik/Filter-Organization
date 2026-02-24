import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, Pencil, Search, Trash2 } from 'lucide-react'

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

  function clearAll() {
    setSearch('')
    setFilters({})
    setSortState({ key: '', direction: 'asc' })
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="relative">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-secondary opacity-60" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder={t('admin.table.searchPlaceholder')}
              className="w-full border border-[#00334a]/20 rounded-xl ps-9 pe-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {Object.entries(filterConfig).map(([key, options]) => (
            <select
              key={key}
              value={filters[key] ?? ''}
              onChange={(e) => setFilter(key, e.target.value)}
              className="w-full border border-[#00334a]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="">{t(`admin.table.filters.${key}`)}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}

          <input
            type="date"
            value={filters.dateFrom ?? ''}
            onChange={(e) => setFilter('dateFrom', e.target.value)}
            className="w-full border border-[#00334a]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            aria-label={t('admin.table.from')}
          />
          <input
            type="date"
            value={filters.dateTo ?? ''}
            onChange={(e) => setFilter('dateTo', e.target.value)}
            className="w-full border border-[#00334a]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
            aria-label={t('admin.table.to')}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-secondary opacity-75">
            {t('admin.table.resultCount', { count: sortedRows.length })}
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-secondary px-3 py-1.5 rounded-lg border border-[#00334a]/20 hover:bg-[#F7F9FB] transition-colors"
          >
            {t('admin.table.clearFilters')}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#00334a]/8 shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F7F9FB] border-b border-[#00334a]/8">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-start text-xs font-bold text-secondary opacity-80">
                  <button
                    type="button"
                    onClick={() => handleSort(col.key, col.sortable)}
                    className="inline-flex items-center gap-1"
                  >
                    {col.label}
                    {col.sortable && <ArrowUpDown size={12} />}
                  </button>
                </th>
              ))}
              <th className="px-4 py-3 text-start text-xs font-bold text-secondary opacity-80">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#00334a]/6">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-xs text-secondary opacity-60">
                  {t('admin.loading')}
                </td>
              </tr>
            ) : pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-xs text-secondary opacity-60">
                  {t('admin.noData')}
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr key={row.id} className="hover:bg-[#F7F9FB] transition-colors duration-150">
                  {columns.map((col) => (
                    <td key={`${row.id}-${col.key}`} className="px-4 py-3 text-secondary opacity-90">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(row)}
                          className="p-1.5 rounded-lg text-secondary hover:bg-[#F7F9FB] transition-colors"
                          title={t('admin.view')}
                        >
                          <Eye size={14} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary hover:text-white transition-all"
                          title={t('admin.edit')}
                        >
                          <Pencil size={14} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          className="p-1.5 rounded-lg text-[#c62828] hover:bg-[#c62828] hover:text-white transition-all"
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

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg border border-[#00334a]/20 disabled:opacity-40 hover:bg-[#F7F9FB] transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs font-semibold text-secondary px-2">
          {t('admin.table.pageOf', { page: currentPage, total: totalPages })}
        </span>
        <button
          type="button"
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage >= totalPages}
          className="p-2 rounded-lg border border-[#00334a]/20 disabled:opacity-40 hover:bg-[#F7F9FB] transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
