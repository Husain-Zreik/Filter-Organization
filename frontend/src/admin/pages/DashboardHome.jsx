import { useTranslation } from 'react-i18next'
import { Flag, Newspaper, FileBarChart, Users2, NotebookPen, Image } from 'lucide-react'
import StatusBadge from '../../components/ui/StatusBadge'
import AdminDataTable from '../components/AdminDataTable'
import { SkeletonStatCard } from '../../components/ui/Skeleton'
import { useAdminData } from '../context/AdminDataContext'

export default function DashboardHome() {
  const { t } = useTranslation()
  const { loading, rumors, news, reports, teamMembers, posts, media } = useAdminData()

  const stats = [
    { labelKey: 'admin.dashboard.statsRumors',  value: rumors.length,      Icon: Flag,         color: 'bg-[#c62828]/10 text-[#c62828]' },
    { labelKey: 'admin.dashboard.statsNews',    value: news.length,        Icon: Newspaper,    color: 'bg-accent/10 text-accent' },
    { labelKey: 'admin.dashboard.statsReports', value: reports.length,     Icon: FileBarChart, color: 'bg-primary/10 text-primary' },
    { labelKey: 'admin.dashboard.statsTeam',    value: teamMembers.length, Icon: Users2,       color: 'bg-[#f9a825]/10 text-[#f9a825]' },
    { labelKey: 'admin.dashboard.statsPosts',   value: posts.length,       Icon: NotebookPen,  color: 'bg-accent/10 text-accent' },
    { labelKey: 'admin.dashboard.statsMedia',   value: media.length,       Icon: Image,        color: 'bg-primary/10 text-primary' },
  ]

  const recentColumns = [
    { key: 'title',    label: t('admin.col.title')  },
    { key: 'status',   label: t('admin.col.status'),
      render: (val) => <StatusBadge status={val} /> },
    { key: 'category', label: t('admin.col.category'),
      render: (val) => t(`categories.${val}`, { defaultValue: val }) },
  ]

  const recentRumors = rumors.slice(0, 5).map((row) => ({
    id: row.id,
    title: row.title,
    status: row.status,
    category: row.category,
  }))

  return (
    <div>
      <h1 className="text-xl font-extrabold text-primary mb-6">{t('admin.dashboard.title')}</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonStatCard key={i} />)
        ) : (
          stats.map(({ labelKey, value, Icon, color }) => (
            <div key={labelKey} className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-4">
              <div className={`p-2 rounded-xl w-fit mb-2 ${color}`}>
                <Icon size={16} />
              </div>
              <div className="text-2xl font-extrabold text-primary">{value}</div>
              <div className="text-xs text-secondary opacity-65 mt-1 leading-tight">{t(labelKey)}</div>
            </div>
          ))
        )}
      </div>

      {/* Recent rumors */}
      <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-[#00334a]/8">
          <h2 className="font-bold text-primary text-sm">{t('admin.dashboard.recentRumors')}</h2>
        </div>
        <div className="p-4">
          <AdminDataTable columns={recentColumns} rows={recentRumors} filterConfig={{}} searchKeys={[]} loading={loading} />
        </div>
      </div>
    </div>
  )
}
