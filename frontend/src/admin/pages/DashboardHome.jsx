import { useTranslation } from 'react-i18next'
import { FileText, NotebookPen, Image, Settings } from 'lucide-react'
import AdminTable from '../components/AdminTable'
import { useAdminData } from '../context/AdminDataContext'

export default function DashboardHome() {
  const { t } = useTranslation()
  const { pages, posts, media, settings } = useAdminData()

  const stats = [
    { labelKey: 'admin.nav.pages',    value: pages.length,    Icon: FileText,   color: 'bg-[#f9a825]/10 text-[#f9a825]' },
    { labelKey: 'admin.nav.posts',    value: posts.length,    Icon: NotebookPen, color: 'bg-accent/10 text-accent' },
    { labelKey: 'admin.nav.media',    value: media.length,    Icon: Image,      color: 'bg-primary/10 text-primary' },
    { labelKey: 'admin.nav.settings', value: settings.length, Icon: Settings,   color: 'bg-[#c62828]/10 text-[#c62828]' },
  ]

  const recentColumns = [
    { key: 'title', label: t('admin.col.title') },
    { key: 'date',  label: t('admin.col.date')  },
    { key: 'status', label: t('admin.col.status') },
  ]

  const recentRows = posts.slice(0, 5).map((row) => ({
    id: row.id,
    title: row.titleEn,
    date: row.publishDate,
    status: t(`admin.contentStatus.${row.status}`),
  }))

  return (
    <div>
      <h1 className="text-xl font-extrabold text-primary mb-6">{t('admin.dashboard.title')}</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ labelKey, value, Icon, color }) => (
          <div key={labelKey} className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-5">
            <div className={`p-2.5 rounded-xl w-fit mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <div className="text-2xl font-extrabold text-primary">{value}</div>
            <div className="text-xs text-secondary opacity-65 mt-1">{t(labelKey)}</div>
          </div>
        ))}
      </div>

      {/* Recent rumors */}
      <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#00334a]/8">
          <h2 className="font-bold text-primary text-sm">{t('admin.dashboard.recentRumors')}</h2>
        </div>
        <div className="p-4">
          <AdminTable columns={recentColumns} rows={recentRows} />
        </div>
      </div>
    </div>
  )
}
