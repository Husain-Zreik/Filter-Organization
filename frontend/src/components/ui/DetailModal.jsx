import { useEffect } from 'react'
import { X, Clock, MapPin, Shield, FileText, Download, Share2, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import StatusBadge from './StatusBadge'

/**
 * DetailModal — full-detail overlay for rumors, news, and reports.
 *
 * Props:
 *   isOpen : boolean
 *   onClose: () => void
 *   item   : object (rumor | news | report)
 *   type   : 'rumor' | 'news' | 'report'
 */
export default function DetailModal({ isOpen, onClose, item, type }) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    // Prevent body scroll while open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !item) return null

  const hasMedia = Boolean(item.image || item.videoUrl)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* ── Hero media ── */}
        {hasMedia && (
          <div className="relative shrink-0 h-64 bg-[#E8EDF0]">
            {item.videoUrl ? (
              <video
                src={item.videoUrl}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />

            {/* Close button — top end corner */}
            <button
              onClick={onClose}
              className="absolute top-3 end-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-150"
            >
              <X size={15} />
            </button>

            {/* Status badge on image for rumors */}
            {type === 'rumor' && item.status && (
              <div className="absolute bottom-3 start-3">
                <StatusBadge status={item.status} />
              </div>
            )}

            {/* Tags on image for news */}
            {type === 'news' && item.tags?.length > 0 && (
              <div className="absolute top-3 start-3 flex gap-1.5 flex-wrap">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Close button when no media */}
        {!hasMedia && (
          <div className="flex items-center justify-end px-5 py-3 border-b border-[#00334a]/8 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-secondary hover:bg-[#F7F9FB] transition-colors duration-150"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 p-6">

          {/* Category + type badge row */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {item.category && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/8 text-primary">
                {t(`categories.${item.category}`, { defaultValue: item.category })}
              </span>
            )}
            {type === 'rumor' && item.status && !hasMedia && (
              <StatusBadge status={item.status} />
            )}
            {type === 'report' && item.fileType && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                {item.fileType}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-extrabold text-primary leading-snug mb-4">
            {item.title}
          </h2>

          {/* ── Meta row ── */}
          <div className="flex items-center gap-4 text-xs text-secondary opacity-65 mb-5 flex-wrap">
            {item.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {item.date}
              </span>
            )}
            {item.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {item.location}
              </span>
            )}
            {type === 'rumor' && item.source && (
              <span className="flex items-center gap-1.5">
                <Shield size={12} />
                {t('common.source')}: {item.source}
              </span>
            )}
            {type === 'report' && item.fileSize && (
              <span className="flex items-center gap-1.5">
                <FileText size={12} />
                {item.fileSize}
                {item.pages && ` · ${item.pages} ${t('admin.col.pages')}`}
              </span>
            )}
          </div>

          {/* Full description */}
          <p className="text-sm text-secondary leading-relaxed mb-5">
            {item.description}
          </p>

          {/* Rumor: verified info */}
          {type === 'rumor' && item.verifiedAt && (
            <div className="flex items-start gap-2 text-xs text-secondary bg-[#F7F9FB] rounded-xl px-4 py-3 mb-5">
              <Clock size={13} className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="font-semibold">{t('rumors.verifiedAt')}:</span>{' '}
                {item.verifiedAt}
              </span>
            </div>
          )}

          {/* News: extra tags below content */}
          {type === 'news' && item.tags?.length > 0 && !hasMedia && (
            <div className="flex gap-1.5 flex-wrap mb-5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#F7F9FB] border border-[#00334a]/10 text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Report: download actions */}
          {type === 'report' && (
            <div className="flex gap-3 flex-wrap pt-2">
              <button className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-accent transition-all duration-200">
                <Download size={14} />
                {t('common.downloadReport')}
              </button>
              <button className="flex items-center gap-2 border border-primary/30 text-primary font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200">
                <Share2 size={14} />
                {t('common.share')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
