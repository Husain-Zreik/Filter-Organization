import { Clock, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StatusBadge from '../ui/StatusBadge'

export default function RumorCard({ rumor, onClick }) {
  const { t } = useTranslation()
  const { title, description, status, category, date, verifiedAt, image, source } = rumor

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-[#00334a]/8 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden h-52 bg-[#E8EDF0] relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status overlay on image */}
        <div className="absolute bottom-3 start-3">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Category */}
        <div className="mb-3">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/8 text-primary">
            {t(`categories.${category}`, { defaultValue: category })}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-primary text-base leading-snug mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-secondary opacity-75 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-secondary border-t border-[#00334a]/6 pt-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 opacity-60">
            <Clock size={12} />
            <span>{date}</span>
          </div>
          {source && (
            <div className="flex items-center gap-1.5 opacity-70">
              <Shield size={12} />
              <span>{t('common.source')}: {source}</span>
            </div>
          )}
        </div>

        {verifiedAt && (
          <div className="mt-2 text-[11px] text-secondary opacity-50">
            {t('rumors.verifiedAt')}: {verifiedAt}
          </div>
        )}
      </div>
    </div>
  )
}
