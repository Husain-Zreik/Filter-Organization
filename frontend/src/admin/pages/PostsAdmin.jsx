import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import AdminModal from '../components/AdminModal'
import AdminDataTable from '../components/AdminDataTable'
import ContentEditorForm from '../forms/ContentEditorForm'
import ContentPreview from '../previews/ContentPreview'
import { useAdminData } from '../context/AdminDataContext'

export default function PostsAdmin() {
  const { t } = useTranslation()
  const { posts, savePost, deletePost } = useAdminData()
  const [modalMode, setModalMode] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

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
        { value: 'draft', label: t('admin.contentStatus.draft') },
        { value: 'published', label: t('admin.contentStatus.published') },
        { value: 'scheduled', label: t('admin.contentStatus.scheduled') },
      ],
      category: [
        { value: 'news', label: t('admin.contentCategories.news') },
        { value: 'update', label: t('admin.contentCategories.update') },
        { value: 'announcement', label: t('admin.contentCategories.announcement') },
      ],
    }),
    [t],
  )

  function openCreate() {
    setSelected(null)
    setModalMode('create')
  }

  function openEdit(row) {
    setSelected(row)
    setModalMode('edit')
  }

  function openView(row) {
    setSelected(row)
    setModalMode('view')
  }

  function closeModal() {
    setModalMode('')
    setSelected(null)
  }

  async function handleSave(data) {
    setLoading(true)
    await Promise.resolve()
    savePost(data)
    setLoading(false)
    setFeedback(t('admin.messages.saveSuccess'))
    closeModal()
  }

  function handleDelete(row) {
    if (!window.confirm(t('admin.confirmDelete'))) return
    deletePost(row.id)
    setFeedback(t('admin.messages.deleteSuccess'))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.posts')}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />
          {t('admin.addNew')}
        </button>
      </div>

      {feedback && (
        <div className="bg-[#2e7d32]/10 text-[#2e7d32] text-xs font-semibold rounded-xl px-3 py-2 border border-[#2e7d32]/20">
          {feedback}
        </div>
      )}

      <AdminDataTable
        columns={columns}
        rows={posts}
        searchKeys={['titleEn', 'titleAr', 'slug', 'excerptEn', 'excerptAr']}
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
          modalMode === 'create'
            ? t('admin.posts.addTitle')
            : modalMode === 'edit'
              ? t('admin.posts.editTitle')
              : t('admin.posts.viewTitle')
        }
        onClose={closeModal}
      >
        {modalMode === 'view' ? (
          <ContentPreview row={selected} />
        ) : (
          <ContentEditorForm
            mode="post"
            initialData={selected}

            onCancel={closeModal}
            onSubmit={handleSave}
          />
        )}
      </AdminModal>
    </div>
  )
}
