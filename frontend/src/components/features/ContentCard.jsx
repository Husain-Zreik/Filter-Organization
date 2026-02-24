import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StatusBadge from '../ui/StatusBadge'

/**
 * Mixed-type card for the homepage grid and filter tool.
 * Adapts display based on content type.
 * onClick opens the detail modal in parent.
 */
export default function ContentCard({ item, onClick }) {
  const { t } = useTranslation()
  const { title, description, status, category, date, image } = item

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-[#00334a]/8 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden h-44 bg-[#E8EDF0]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {category && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/8 text-primary">
              {t(`categories.${category}`, { defaultValue: category })}
            </span>
          )}
          {status && <StatusBadge status={status} />}
        </div>

        {/* Title */}
        <h3 className="font-bold text-primary text-sm leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-secondary opacity-75 leading-relaxed line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#00334a]/6">
          <div className="flex items-center gap-1 text-[11px] text-secondary opacity-55">
            <Clock size={11} />
            <span>{date}</span>
          </div>
          <span className="text-xs font-bold text-accent group-hover:underline">
            {t('common.readMore')}
          </span>
        </div>
      </div>
    </div>
  )
}
