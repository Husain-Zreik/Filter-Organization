import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'
import AdminDataTable from '../components/AdminDataTable'
import AdminModal from '../components/AdminModal'
import TeamForm from '../forms/TeamForm'
import { useAdminData } from '../context/AdminDataContext'
import { useAdminModal } from '../../hooks/useAdminModal'

export default function TeamAdmin() {
  const { t } = useTranslation()
  const { loading, teamMembers, saveTeamMember, deleteTeamMember } = useAdminData()
  const { mode, selected, isOpen, openCreate, openEdit, close } = useAdminModal()

  const columns = [
    { key: 'name',        label: t('admin.col.name'),  sortable: true },
    { key: 'role',        label: t('admin.col.role'),  sortable: true },
    { key: 'email',       label: t('admin.col.email') },
    { key: 'skills',      label: t('admin.col.skills'),
      render: (val) => {
        const skills = Array.isArray(val) ? val : []
        return skills.slice(0, 2).map((s) => (
          <span key={s} className="inline-block text-[10px] font-semibold bg-primary/8 text-primary px-2 py-0.5 rounded-full me-1">
            {s}
          </span>
        ))
      },
    },
  ]

  async function handleDelete(row) {
    if (!window.confirm(t('admin.confirmDelete'))) return
    try { await deleteTeamMember(row.id) } catch (err) { alert(err.response?.data?.message || 'Delete failed') }
  }

  async function handleSubmit(data) {
    try {
      await saveTeamMember(data)
      close()
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed. Please try again.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.team')}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />{t('admin.addNew')}
        </button>
      </div>

      <AdminDataTable
        columns={columns}
        rows={teamMembers}
        searchKeys={['name', 'role', 'email', 'description']}
        filterConfig={{}}
        dateKey=""
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <AdminModal
        isOpen={isOpen}
        title={mode === 'edit' ? t('admin.editItem') : t('admin.addNew')}
        onClose={close}
      >
        <TeamForm initialData={selected} onSubmit={handleSubmit} onCancel={close} />
      </AdminModal>
    </div>
  )
}
