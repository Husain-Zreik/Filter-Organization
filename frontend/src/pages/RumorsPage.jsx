import { useState } from 'react'
import { Flag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import RumorCard from '../components/features/RumorCard'
import DetailModal from '../components/ui/DetailModal'
import { useAdminData } from '../admin/context/AdminDataContext'

export default function RumorsPage() {
  const { t } = useTranslation()
  const { rumors } = useAdminData()
  const [activeFilter, setActiveFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const filterTabs = [
    { value: '',           label: t('rumors.filterAll')        },
    { value: 'false',      label: t('rumors.filterFalse')      },
    { value: 'confirmed',  label: t('rumors.filterConfirmed')  },
    { value: 'unverified', label: t('rumors.filterUnverified') },
  ]

  const filtered = activeFilter
    ? rumors.filter((r) => r.status === activeFilter)
    : rumors

  const counts = {
    total:      rumors.length,
    false:      rumors.filter((r) => r.status === 'false').length,
    confirmed:  rumors.filter((r) => r.status === 'confirmed').length,
    unverified: rumors.filter((r) => r.status === 'unverified').length,
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-primary mb-1">{t('rumors.pageTitle')}</h1>
          <p className="text-sm text-secondary opacity-65">{t('rumors.subtitle')}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                activeFilter === tab.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-[#00334a]/15 text-secondary hover:bg-[#F7F9FB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main layout: content + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-8">

          {/* Content */}
          <div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((rumor) => (
                  <RumorCard
                    key={rumor.id}
                    rumor={rumor}
                    onClick={() => setSelected(rumor)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-secondary opacity-50 bg-white rounded-2xl border border-[#00334a]/8">
                <p className="font-semibold">{t('rumors.empty')}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-5">
              <h3 className="font-bold text-primary text-sm mb-4 pb-3 border-b border-[#00334a]/8">
                {t('rumors.summaryTitle')}
              </h3>
              <div className="space-y-3">
                {[
                  { label: t('rumors.totalLabel'),     value: counts.total,      color: 'text-primary'   },
                  { label: t('rumors.falseLabel'),      value: counts.false,      color: 'text-[#c62828]' },
                  { label: t('rumors.confirmedLabel'),  value: counts.confirmed,  color: 'text-[#2e7d32]' },
                  { label: t('rumors.unverifiedLabel'), value: counts.unverified, color: 'text-[#f9a825]' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-xs text-secondary opacity-70">{stat.label}</span>
                    <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Flag size={16} className="text-accent" />
                <h3 className="font-bold text-sm">{t('rumors.reportTitle')}</h3>
              </div>
              <p className="text-xs opacity-70 leading-relaxed mb-4">{t('rumors.reportDesc')}</p>
              <button className="w-full bg-accent hover:bg-white hover:text-primary text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-200">
                {t('rumors.reportBtn')}
              </button>
            </div>
          </aside>
        </div>
      </div>

      <DetailModal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        item={selected}
        type="rumor"
      />
    </div>
  )
}
