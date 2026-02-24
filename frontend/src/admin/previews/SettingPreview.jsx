import { useTranslation } from 'react-i18next'

export default function SettingPreview({ row }) {
  const { t } = useTranslation()
  if (!row) return null
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] font-bold text-secondary/60 uppercase tracking-wide mb-1">AR</p>
          <p dir="rtl" className="text-sm font-semibold text-primary">{row.titleAr}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-secondary/60 uppercase tracking-wide mb-1">EN</p>
          <p className="text-sm font-semibold text-primary">{row.titleEn}</p>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-bold text-secondary/60 uppercase tracking-wide mb-1">
          {t('admin.settings.section')} · {t('admin.col.status')}
        </p>
        <p className="text-xs text-secondary">
          {t(`admin.settingsSections.${row.section}`)} / {t(`admin.settingsStatus.${row.status}`)}
        </p>
      </div>
      {row.valueAr && (
        <div>
          <p className="text-[11px] font-bold text-secondary/60 uppercase tracking-wide mb-1">Value AR</p>
          <p dir="rtl" className="text-sm text-secondary whitespace-pre-wrap">{row.valueAr}</p>
        </div>
      )}
    </div>
  )
}
