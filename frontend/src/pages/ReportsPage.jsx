import { useState } from 'react'
import { FileBarChart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ReportCard from '../components/features/ReportCard'
import DetailModal from '../components/ui/DetailModal'
import { reports } from '../data/mockData'

export default function ReportsPage() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)

  const featured = reports.find((r) => r.isFeatured)
  const others   = reports.filter((r) => !r.isFeatured)

  return (
    <div className="py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-primary rounded-xl text-white">
            <FileBarChart size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-primary">{t('reports.pageTitle')}</h1>
            <p className="text-xs text-secondary opacity-65 mt-0.5">{t('reports.subtitle')}</p>
          </div>
        </div>

        {/* Featured report */}
        {featured && (
          <div className="mb-10">
            <ReportCard report={featured} featured />
          </div>
        )}

        {/* Other reports */}
        <div>
          <h2 className="text-base font-bold text-primary mb-5 pb-3 border-b border-[#00334a]/8">
            {t('reports.othersTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => setSelected(report)}
              />
            ))}
          </div>
        </div>
      </div>

      <DetailModal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        item={selected}
        type="report"
      />
    </div>
  )
}
