import { useTranslation } from 'react-i18next'
import { Plus, Star } from 'lucide-react'
import AdminDataTable from '../components/AdminDataTable'
import AdminModal from '../components/AdminModal'
import NewsForm from '../forms/NewsForm'
import { useAdminData } from '../context/AdminDataContext'
import { useAdminModal } from '../../hooks/useAdminModal'
import { NEWS_CATEGORIES } from '../../constants/categories'

export default function NewsAdmin() {
  const { t } = useTranslation()
  const { news, saveNews, deleteNews } = useAdminData()
  const { mode, selected, isOpen, openCreate, openEdit, close } = useAdminModal()

  const columns = [
    { key: 'title',      label: t('admin.col.title'),    sortable: true },
    { key: 'category',   label: t('admin.col.category'), sortable: true,
      render: (val) => t(`categories.${val}`, { defaultValue: val }) },
    { key: 'location',   label: t('admin.col.location') },
    { key: 'date',       label: t('admin.col.date'),     sortable: true },
    { key: 'isFeatured', label: t('admin.col.featured'),
      render: (val) => val ? <Star size={14} className="text-[#f9a825] fill-current" /> : null },
  ]

  const filterConfig = {
    category: NEWS_CATEGORIES.map((c) => ({ value: c, label: t(`categories.${c}`) })),
    isFeatured: [
      { value: 'true',  label: '★ ' + t('admin.col.featured') },
      { value: 'false', label: t('common.all') },
    ],
  }

  function handleDelete(row) {
    if (window.confirm(t('admin.confirmDelete'))) deleteNews(row.id)
  }

  function handleSubmit(data) {
    saveNews(data)
    close()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.news')}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />{t('admin.addNew')}
        </button>
      </div>

      <AdminDataTable
        columns={columns}
        rows={news}
        searchKeys={['title', 'description', 'location']}
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
        <NewsForm initialData={selected} onSubmit={handleSubmit} onCancel={close} />
      </AdminModal>
    </div>
  )
}
