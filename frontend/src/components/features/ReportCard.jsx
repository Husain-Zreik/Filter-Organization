import { Download, Share2, FileText, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'

export default function ReportCard({ report, featured = false, onClick }) {
  const { t } = useTranslation()
  const { title, description, fileType, fileSize, pages, date, image, category } = report

  if (featured) {
    return (
      <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="overflow-hidden h-64 md:h-auto bg-[#E8EDF0]">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
          {/* Content */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {category && (
                <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/8 text-primary mb-3">
                  {t(`categories.${category}`, { defaultValue: category })}
                </span>
              )}
              <h2 className="text-xl font-bold text-primary leading-snug mb-3">{title}</h2>
              <p className="text-sm text-secondary opacity-75 leading-relaxed mb-5 line-clamp-4">{description}</p>
            </div>

            {/* File info */}
            <div>
              <div className="flex items-center gap-4 text-xs text-secondary opacity-60 mb-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <FileText size={13} />
                  <span>{fileType} · {fileSize}{pages && ` · ${pages} pages`}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>{date}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                <Button variant="primary" size="md">
                  <Download size={15} />
                  {t('common.downloadReport')}
                </Button>
                <Button variant="secondary" size="md">
                  <Share2 size={15} />
                  {t('common.share')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-[#00334a]/8 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden h-40 bg-[#E8EDF0]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {category && (
          <span className="inline-block self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/8 text-primary mb-3">
            {t(`categories.${category}`, { defaultValue: category })}
          </span>
        )}
        <h3 className="font-bold text-primary text-sm leading-snug mb-2 flex-1 group-hover:text-accent transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-secondary opacity-70 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* File info */}
        <div className="flex items-center justify-between text-[11px] text-secondary opacity-55 pt-3 border-t border-[#00334a]/6">
          <div className="flex items-center gap-1">
            <FileText size={11} />
            <span>{fileType} · {fileSize}</span>
          </div>
          <span className="flex items-center gap-1 font-bold text-accent">
            <Download size={12} />
            {t('common.download')}
          </span>
        </div>
      </div>
    </div>
  )
}
