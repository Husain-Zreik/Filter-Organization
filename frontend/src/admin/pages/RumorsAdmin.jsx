import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import AdminDataTable from '../components/AdminDataTable'
import AdminModal from '../components/AdminModal'
import StatusBadge from '../../components/ui/StatusBadge'
import RumorForm from '../forms/RumorForm'
import { useAdminData } from '../context/AdminDataContext'
import { useAdminModal } from '../../hooks/useAdminModal'
import { RUMOR_CATEGORIES } from '../../constants/categories'
import { RUMOR_STATUSES } from '../../constants/statuses'

export default function RumorsAdmin() {
  const { t } = useTranslation()
  const { rumors, saveRumor, deleteRumor } = useAdminData()
  const { mode, selected, isOpen, openCreate, openEdit, close } = useAdminModal()

  const columns = [
    { key: 'title',    label: t('admin.col.title'),    sortable: true },
    { key: 'category', label: t('admin.col.category'), sortable: true,
      render: (val) => t(`categories.${val}`, { defaultValue: val }) },
    { key: 'status',   label: t('admin.col.status'),   sortable: true,
      render: (val) => <StatusBadge status={val} /> },
    { key: 'source',   label: t('admin.col.source') },
    { key: 'date',     label: t('admin.col.date'),     sortable: true },
  ]

  const filterConfig = {
    status:   RUMOR_STATUSES.map((s) => ({ value: s, label: t(`status.${s}`) })),
    category: RUMOR_CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`) })),
  }

  function handleDelete(row) {
    if (window.confirm(t('admin.confirmDelete'))) deleteRumor(row.id)
  }

  function handleSubmit(data) {
    saveRumor(data)
    close()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.rumors')}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />{t('admin.addNew')}
        </button>
      </div>

      <AdminDataTable
        columns={columns}
        rows={rumors}
        searchKeys={['title', 'source', 'description']}
        filterConfig={filterConfig}
        dateKey="publishDate"
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isOpen}
        title={mode === 'edit' ? t('admin.editItem') : t('admin.addNew')}
        onClose={close}
      >
        <RumorForm initialData={selected} onSubmit={handleSubmit} onCancel={close} />
      </AdminModal>
    </div>
  )
}
