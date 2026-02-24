import { useTranslation } from 'react-i18next'
import { Plus, Star } from 'lucide-react'
import AdminDataTable from '../components/AdminDataTable'
import AdminModal from '../components/AdminModal'
import ReportForm from '../forms/ReportForm'
import { useAdminData } from '../context/AdminDataContext'
import { useAdminModal } from '../../hooks/useAdminModal'
import { REPORT_CATEGORIES } from '../../constants/categories'

export default function ReportsAdmin() {
  const { t } = useTranslation()
  const { reports, saveReport, deleteReport } = useAdminData()
  const { mode, selected, isOpen, openCreate, openEdit, close } = useAdminModal()

  const columns = [
    { key: 'title',      label: t('admin.col.title'),    sortable: true },
    { key: 'category',   label: t('admin.col.category'), sortable: true,
      render: (val) => t(`categories.${val}`, { defaultValue: val }) },
    { key: 'pages',      label: t('admin.col.pages'),    sortable: true },
    { key: 'fileSize',   label: t('admin.col.fileSize') },
    { key: 'date',       label: t('admin.col.date'),     sortable: true },
    { key: 'isFeatured', label: t('admin.col.featured'),
      render: (val) => val ? <Star size={14} className="text-[#f9a825] fill-current" /> : null },
  ]

  const filterConfig = {
    category: REPORT_CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`) })),
    isFeatured: [
      { value: 'true',  label: '★ ' + t('admin.col.featured') },
      { value: 'false', label: t('common.all') },
    ],
  }

  function handleDelete(row) {
    if (window.confirm(t('admin.confirmDelete'))) deleteReport(row.id)
  }

  function handleSubmit(data) {
    saveReport(data)
    close()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.reports')}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />{t('admin.addNew')}
        </button>
      </div>

      <AdminDataTable
        columns={columns}
        rows={reports}
        searchKeys={['title', 'description']}
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
        <ReportForm initialData={selected} onSubmit={handleSubmit} onCancel={close} />
      </AdminModal>
    </div>
  )
}
