/**
 * AdminTable — generic data table
 *
 * Props:
 *   columns: [{ key, label, render? }]
 *   rows:    array of objects (each must have a unique `id`)
 *   onEdit:  (row) => void
 *   onDelete:(row) => void
 */
import { Pencil, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AdminTable({ columns = [], rows = [], onEdit, onDelete }) {
  const { t } = useTranslation()

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#00334a]/8 shadow-sm bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F7F9FB] border-b border-[#00334a]/8">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-start text-xs font-bold text-secondary opacity-70"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-start text-xs font-bold text-secondary opacity-70">
              {t('admin.actions')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#00334a]/6">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-8 text-center text-xs text-secondary opacity-50"
              >
                {t('admin.noData')}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="hover:bg-[#F7F9FB] transition-colors duration-150">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-secondary opacity-80">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="p-1.5 rounded-lg text-primary hover:bg-primary hover:text-white transition-all duration-150"
                        title={t('admin.edit')}
                      >
                        <Pencil size={13} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-1.5 rounded-lg text-[#c62828] hover:bg-[#c62828] hover:text-white transition-all duration-150"
                        title={t('admin.delete')}
                      >
                        <Trash2 size={13} />
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
  )
}
