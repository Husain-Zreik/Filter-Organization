import { Archive, Download, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StatCard from '../components/ui/StatCard'
import StatusBadge from '../components/ui/StatusBadge'
import { archiveStats, archiveHistory, archiveTimeline, archiveYears } from '../data/mockData'

export default function ArchivePage() {
  const { t } = useTranslation()

  const categoryOptions = [
    { value: '',          label: t('common.all')            },
    { value: 'health',    label: t('categories.health')     },
    { value: 'security',  label: t('categories.security')   },
    { value: 'economy',   label: t('categories.economy')    },
    { value: 'education', label: t('categories.education')  },
  ]

  return (
    <div className="py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-primary rounded-xl text-white">
            <Archive size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-primary">{t('archive.pageTitle')}</h1>
            <p className="text-xs text-secondary opacity-65 mt-0.5">{t('archive.subtitle')}</p>
          </div>
        </div>

        {/* Stats dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <StatCard
            label={t('archive.statTotal')}
            value={archiveStats.total.count}
            subtitle={t('archive.statTotalSub', { count: archiveStats.total.weeklyChange })}
            percentage={archiveStats.total.percentage}
            barColor="bg-primary"
            icon={<TrendingUp size={18} />}
          />
          <StatCard
            label={t('archive.statConfirmed')}
            value={archiveStats.confirmed.count}
            subtitle={t('archive.statConfirmedSub', { pct: archiveStats.confirmed.percentage })}
            percentage={archiveStats.confirmed.percentage}
            barColor="bg-[#2e7d32]"
          />
          <StatCard
            label={t('archive.statFalse')}
            value={archiveStats.false.count}
            subtitle={t('archive.statFalseSub', { pct: archiveStats.false.percentage })}
            percentage={archiveStats.false.percentage}
            barColor="bg-[#c62828]"
          />
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

          {/* Table */}
          <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#00334a]/8">
              <h3 className="font-bold text-primary text-sm">{t('archive.tableTitle')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#F7F9FB]">
                    <th className="text-right px-4 py-2.5 text-secondary opacity-60 font-semibold">{t('archive.colDate')}</th>
                    <th className="text-right px-4 py-2.5 text-secondary opacity-60 font-semibold">{t('archive.colStatus')}</th>
                    <th className="text-right px-4 py-2.5 text-secondary opacity-60 font-semibold">{t('archive.colCategory')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#00334a]/6">
                  {archiveHistory.map((row) => (
                    <tr key={row.id} className="hover:bg-[#F7F9FB] transition-colors duration-150">
                      <td className="px-4 py-3 text-secondary opacity-70 whitespace-nowrap">{row.date}</td>
                      <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                      <td className="px-4 py-3 text-secondary opacity-70">
                        {t(`categories.${row.category}`, { defaultValue: row.category })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-5">
            <h3 className="font-bold text-primary text-sm mb-5 pb-3 border-b border-[#00334a]/8">
              {t('archive.timelineTitle')}
            </h3>
            <div className="relative">
              <div className="absolute top-0 bottom-0 right-[7px] w-px bg-[#E8EDF0]" />
              <div className="space-y-5">
                {archiveTimeline.map((item) => {
                  const dotColor = item.status === 'confirmed' ? 'bg-[#2e7d32]'
                    : item.status === 'false' ? 'bg-[#c62828]' : 'bg-[#f9a825]'
                  return (
                    <div key={item.id} className="flex items-start gap-4 relative">
                      <div className={`h-3.5 w-3.5 rounded-full border-2 border-white shrink-0 mt-0.5 z-10 shadow-sm ${dotColor}`} />
                      <div>
                        <p className="text-xs font-semibold text-primary">{item.title}</p>
                        <p className="text-[11px] text-secondary opacity-55 mt-0.5">{item.date}</p>
                        <div className="mt-1"><StatusBadge status={item.status} /></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Filter sidebar */}
          <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-5">
            <h3 className="font-bold text-primary text-sm mb-4 pb-3 border-b border-[#00334a]/8">
              {t('archive.filterTitle')}
            </h3>
            <div className="space-y-2 mb-6">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  className="w-full text-right text-sm font-semibold px-3 py-2 rounded-xl text-secondary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="border-t border-[#00334a]/8 pt-4">
              <h4 className="font-bold text-primary text-xs mb-3">{t('archive.downloadYearTitle')}</h4>
              <button className="w-full flex items-center justify-center gap-2 bg-[#F7F9FB] border border-[#00334a]/15 text-primary font-semibold text-xs py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200">
                <Download size={13} />
                {t('archive.downloadBtn', { year: 2025 })}
              </button>
            </div>
          </div>
        </div>

        {/* Yearly grid */}
        <div>
          <h2 className="text-base font-bold text-primary mb-5">{t('archive.yearlyTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {archiveYears.map((yr) => (
              <div key={yr.year} className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm hover:shadow-md p-5 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-extrabold text-primary">{yr.year}</h3>
                  <span className="text-xs font-bold bg-primary/8 text-primary px-2.5 py-1 rounded-full">
                    {yr.total} {t('archive.cases')}
                  </span>
                </div>
                <div className="space-y-2 text-xs text-secondary">
                  <div className="flex justify-between">
                    <span className="opacity-65">{t('archive.confirmedLabel')}</span>
                    <span className="font-bold text-[#2e7d32]">{yr.confirmed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-65">{t('archive.falseLabel')}</span>
                    <span className="font-bold text-[#c62828]">{yr.false}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-65">{t('archive.unverifiedLabel')}</span>
                    <span className="font-bold text-[#f9a825]">{yr.unverified}</span>
                  </div>
                </div>
                <button className="w-full mt-4 flex items-center justify-center gap-2 text-xs font-bold text-accent border border-accent/30 py-2 rounded-xl hover:bg-accent hover:text-white transition-all duration-200">
                  <Download size={12} />
                  {t('archive.downloadReport')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
