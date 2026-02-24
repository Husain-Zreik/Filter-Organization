import { MapPin, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function NewsCard({ article, onClick }) {
  const { t } = useTranslation()
  const { title, description, category, categoryColor, date, location, image } = article

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
        {/* Category */}
        {category && (
          <span
            className={`inline-block self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3 ${
              categoryColor ?? 'bg-primary/8 text-primary'
            }`}
          >
            {t(`categories.${category}`, { defaultValue: category })}
          </span>
        )}

        {/* Title */}
        <h3 className="font-bold text-primary text-sm leading-snug mb-2 flex-1 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-secondary opacity-70 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-secondary opacity-55 pt-3 border-t border-[#00334a]/6 flex-wrap">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin size={11} />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock size={11} />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
