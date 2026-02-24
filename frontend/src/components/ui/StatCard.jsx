import { useTranslation } from 'react-i18next'

/**
 * Statistics card with optional progress bar.
 * @param {{
 *   label: string,
 *   value: number | string,
 *   subtitle?: string,
 *   percentage?: number,
 *   barColor?: string,
 *   icon?: React.ReactNode
 * }} props
 */
export default function StatCard({ label, value, subtitle, percentage, barColor = 'bg-primary', icon }) {
  const { t } = useTranslation()
  return (
    <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-secondary opacity-70 mb-1">{label}</p>
          <p className="text-3xl font-bold text-primary">{value}</p>
          {subtitle && (
            <p className="text-xs text-secondary opacity-60 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-[#F7F9FB] rounded-xl text-secondary opacity-70">{icon}</div>
        )}
      </div>

      {percentage !== undefined && (
        <div>
          <div className="flex justify-between text-xs text-secondary opacity-60 mb-1">
            <span>{t('common.percentage')}</span>
            <span>{percentage}%</span>
          </div>
          <div className="h-1.5 bg-[#E8EDF0] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${barColor} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
