import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import AdminTable from '../components/AdminTable'
import AdminModal from '../components/AdminModal'
import StatusBadge from '../../components/ui/StatusBadge'
import { news as initialNews } from '../../data/mockData'

export default function NewsAdmin() {
  const { t } = useTranslation()
  const [rows, setRows]       = useState(initialNews)
  const [modalOpen, setModal] = useState(false)
  const [editing, setEditing] = useState(null)

  const columns = [
    { key: 'title',    label: t('admin.col.title')    },
    { key: 'date',     label: t('admin.col.date')     },
    { key: 'category', label: t('admin.col.category'),
      render: (val) => t(`categories.${val}`, { defaultValue: val }) },
    { key: 'status',   label: t('admin.col.status'),
      render: (val) => <StatusBadge status={val} /> },
  ]

  function openEdit(row) { setEditing(row); setModal(true) }

  function handleDelete(row) {
    if (window.confirm(t('admin.confirmDelete'))) {
      setRows((prev) => prev.filter((r) => r.id !== row.id))
    }
  }

  function handleSave(e) {
    e.preventDefault()
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())
    if (editing) {
      setRows((prev) => prev.map((r) => r.id === editing.id ? { ...r, ...data } : r))
    } else {
      setRows((prev) => [...prev, { ...data, id: Date.now() }])
    }
    setModal(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.news')}</h1>
        <button
          onClick={() => { setEditing(null); setModal(true) }}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />{t('admin.addNew')}
        </button>
      </div>

      <AdminTable columns={columns} rows={rows} onEdit={openEdit} onDelete={handleDelete} />

      <AdminModal isOpen={modalOpen} title={editing ? t('admin.editItem') : t('admin.addNew')} onClose={() => setModal(false)}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-primary mb-1">{t('admin.col.title')}</label>
            <input name="title" defaultValue={editing?.title ?? ''} required
              className="w-full border border-[#00334a]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold text-primary mb-1">{t('admin.col.category')}</label>
            <select name="category" defaultValue={editing?.category ?? 'health'}
              className="w-full border border-[#00334a]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary">
              {['health','security','economy','education','tech','media'].map((c) => (
                <option key={c} value={c}>{t(`categories.${c}`)}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)}
              className="text-sm font-semibold text-secondary px-4 py-2 rounded-xl border border-[#00334a]/20 hover:bg-[#F7F9FB] transition-colors">
              {t('admin.cancel')}
            </button>
            <button type="submit"
              className="text-sm font-bold bg-primary text-white px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200">
              {t('admin.save')}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  )
}
