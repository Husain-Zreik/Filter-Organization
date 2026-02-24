import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function AnnouncementBar() {
  const { t } = useTranslation()

  return (
    <div className="bg-primary text-white text-xs py-2 px-4">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="font-semibold">{t('announcement.ready')}</span>
        </div>

        {/* Emergency level */}
        <div className="flex items-center gap-1.5 opacity-90">
          <AlertTriangle size={13} />
          <span>{t('announcement.emergency')}</span>
        </div>

        {/* Date + refresh */}
        <div className="flex items-center gap-3">
          <span className="opacity-60">{t('announcement.date')}</span>
          <button className="bg-accent/20 hover:bg-accent/40 px-2.5 py-0.5 rounded transition-colors duration-200 font-semibold">
            {t('announcement.refresh')}
          </button>
        </div>
      </div>
    </div>
  )
}
