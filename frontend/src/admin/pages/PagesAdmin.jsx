import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import AdminModal from '../components/AdminModal'
import AdminDataTable from '../components/AdminDataTable'
import ContentEditorForm from '../forms/ContentEditorForm'
import ContentPreview from '../previews/ContentPreview'
import { useAdminData } from '../context/AdminDataContext'

export default function PagesAdmin() {
  const { t } = useTranslation()
  const { pages, savePage, deletePage } = useAdminData()
  const [modalMode, setModalMode] = useState('')
  const [selected, setSelected]   = useState(null)
  const [feedback, setFeedback]   = useState('')
  const [loading, setLoading]     = useState(false)

  const columns = useMemo(
    () => [
      {
        key: 'titleAr',
        label: t('admin.col.title'),
        sortable: true,
        render: (val, row) => (
          <div>
            <p dir="rtl" className="text-sm font-medium text-primary truncate max-w-[220px]">{val}</p>
            {row.titleEn && <p className="text-[11px] text-secondary/50 truncate max-w-[220px]">{row.titleEn}</p>}
          </div>
        ),
      },
      { key: 'status',      label: t('admin.col.status'),   sortable: true, render: (val) => t(`admin.contentStatus.${val}`) },
      { key: 'category',    label: t('admin.col.category'), sortable: true, render: (val) => t(`admin.contentCategories.${val}`) },
      { key: 'publishDate', label: t('admin.col.date'),     sortable: true },
    ],
    [t],
  )

  const filterConfig = useMemo(
    () => ({
      status: [
        { value: 'draft',     label: t('admin.contentStatus.draft') },
        { value: 'published', label: t('admin.contentStatus.published') },
        { value: 'scheduled', label: t('admin.contentStatus.scheduled') },
      ],
      category: [
        { value: 'general', label: t('admin.contentCategories.general') },
        { value: 'policy',  label: t('admin.contentCategories.policy') },
        { value: 'faq',     label: t('admin.contentCategories.faq') },
      ],
    }),
    [t],
  )

  function openCreate()  { setSelected(null); setModalMode('create') }
  function openEdit(row) { setSelected(row);  setModalMode('edit') }
  function openView(row) { setSelected(row);  setModalMode('view') }
  function closeModal()  { setModalMode(''); setSelected(null) }

  async function handleSave(data) {
    setLoading(true)
    await Promise.resolve()
    savePage(data)
    setFeedback(t('admin.messages.saveSuccess'))
    setLoading(false)
    closeModal()
  }

  function handleDelete(row) {
    if (!window.confirm(t('admin.confirmDelete'))) return
    deletePage(row.id)
    setFeedback(t('admin.messages.deleteSuccess'))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.pages')}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />{t('admin.addNew')}
        </button>
      </div>

      {feedback && (
        <div className="bg-[#2e7d32]/10 text-[#2e7d32] text-xs font-semibold rounded-xl px-3 py-2 border border-[#2e7d32]/20">
          {feedback}
        </div>
      )}

      <AdminDataTable
        columns={columns}
        rows={pages}
        searchKeys={['titleEn', 'titleAr', 'slug']}
        filterConfig={filterConfig}
        dateKey="publishDate"
        loading={loading}
        onView={openView}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={Boolean(modalMode)}
        title={
          modalMode === 'create' ? t('admin.pages.addTitle')
          : modalMode === 'edit' ? t('admin.pages.editTitle')
          : t('admin.pages.viewTitle')
        }
        onClose={closeModal}
      >
        {modalMode === 'view' ? (
          <ContentPreview row={selected} />
        ) : (
          <ContentEditorForm
            mode="page"
            initialData={selected}

            onCancel={closeModal}
            onSubmit={handleSave}
          />
        )}
      </AdminModal>
    </div>
  )
}
