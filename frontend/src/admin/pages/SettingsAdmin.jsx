import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import AdminModal from '../components/AdminModal'
import AdminDataTable from '../components/AdminDataTable'
import SettingsEditorForm from '../components/SettingsEditorForm'
import { useAdminData } from '../context/AdminDataContext'

function SettingPreview({ row }) {
  const { t } = useTranslation()
  if (!row) return null
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-primary mb-1">{t('admin.form.titleEn')}</h3>
        <p className="text-sm text-secondary">{row.titleEn}</p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-primary mb-1">{t('admin.form.titleAr')}</h3>
        <p dir="rtl" className="text-sm text-secondary">{row.titleAr}</p>
      </div>
      <div>
        <h3 className="text-sm font-bold text-primary mb-1">{t('admin.settings.valueAr')}</h3>
        <p dir="rtl" className="text-sm text-secondary whitespace-pre-wrap">{row.valueAr}</p>
      </div>
    </div>
  )
}

export default function SettingsAdmin() {
  const { t } = useTranslation()
  const { settings, saveSetting, deleteSetting } = useAdminData()

  const [modalMode, setModalMode] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')

  const columns = useMemo(
    () => [
      { key: 'section', label: t('admin.settings.section'), sortable: true, render: (val) => t(`admin.settingsSections.${val}`) },
      { key: 'titleEn', label: t('admin.form.titleEn'), sortable: true },
      { key: 'titleAr', label: t('admin.form.titleAr'), sortable: true, render: (val) => <span dir="rtl">{val}</span> },
      { key: 'status', label: t('admin.col.status'), sortable: true, render: (val) => t(`admin.settingsStatus.${val}`) },
      { key: 'updatedAt', label: t('admin.col.date'), sortable: true },
    ],
    [t],
  )

  const filterConfig = useMemo(
    () => ({
      section: [
        { value: 'site', label: t('admin.settingsSections.site') },
        { value: 'announcement', label: t('admin.settingsSections.announcement') },
        { value: 'notifications', label: t('admin.settingsSections.notifications') },
      ],
      status: [
        { value: 'active', label: t('admin.settingsStatus.active') },
        { value: 'inactive', label: t('admin.settingsStatus.inactive') },
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

  async function handleSave(entry) {
    setLoading(true)
    await Promise.resolve()
    saveSetting(entry)
    setLoading(false)
    setFeedback(t('admin.messages.saveSuccess'))
    closeModal()
  }

  function handleDelete(row) {
    if (!window.confirm(t('admin.confirmDelete'))) return
    deleteSetting(row.id)
    setFeedback(t('admin.messages.deleteSuccess'))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.settings')}</h1>
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
        rows={settings}
        searchKeys={['key', 'titleEn', 'titleAr', 'valueEn', 'valueAr']}
        filterConfig={filterConfig}
        dateKey="updatedAt"
        loading={loading}
        onView={openView}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={Boolean(modalMode)}
        title={
          modalMode === 'create'
            ? t('admin.settings.addTitle')
            : modalMode === 'edit'
              ? t('admin.settings.editTitle')
              : t('admin.settings.viewTitle')
        }
        onClose={closeModal}
      >
        {modalMode === 'view' ? (
          <SettingPreview row={selected} />
        ) : (
          <SettingsEditorForm initialData={selected} onCancel={closeModal} onSubmit={handleSave} />
        )}
      </AdminModal>
    </div>
  )
}
