import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SETTING_SECTIONS, SETTING_STATUSES } from '../../constants/statuses'
import { INPUT_CLS, LABEL_CLS, ERR_CLS } from '../../constants/styles'

function validate(values, t) {
  const errors = {}
  if (!values.titleAr.trim()) errors.titleAr = t('admin.validation.required')
  if (!values.titleEn.trim()) errors.titleEn = t('admin.validation.required')
  if (!values.valueAr.trim()) errors.valueAr = t('admin.validation.required')
  if (!values.valueEn.trim()) errors.valueEn = t('admin.validation.required')
  return errors
}

function LangTab({ active, hasError, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'relative px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-150',
        active ? 'bg-white shadow-sm text-primary' : 'text-secondary/60 hover:text-secondary',
      ].join(' ')}
    >
      {label}
      {hasError && (
        <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-[#c62828]" />
      )}
    </button>
  )
}

export default function SettingsEditorForm({ initialData, onCancel, onSubmit }) {
  const { t } = useTranslation()
  const [lang, setLang]       = useState('ar')
  const [values, setValues]   = useState(() => ({
    id:       initialData?.id       ?? `setting-${Date.now()}`,
    section:  initialData?.section  ?? 'site',
    key:      initialData?.key      ?? '',
    titleEn:  initialData?.titleEn  ?? '',
    titleAr:  initialData?.titleAr  ?? '',
    valueEn:  initialData?.valueEn  ?? '',
    valueAr:  initialData?.valueAr  ?? '',
    status:   initialData?.status   ?? 'active',
    updatedAt: new Date().toISOString().slice(0, 10),
  }))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const isAr     = lang === 'ar'
  const dir      = isAr ? 'rtl' : 'ltr'
  const titleKey = isAr ? 'titleAr' : 'titleEn'
  const valueKey = isAr ? 'valueAr' : 'valueEn'

  const arHasErrors = Boolean(errors.titleAr || errors.valueAr)
  const enHasErrors = Boolean(errors.titleEn || errors.valueEn)

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(values, t)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      if (lang === 'ar' && !arHasErrors && enHasErrors) setLang('en')
      if (lang === 'en' && !enHasErrors && arHasErrors) setLang('ar')
      return
    }
    setSaving(true)
    await Promise.resolve()
    onSubmit({ ...values, updatedAt: new Date().toISOString().slice(0, 10) })
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Language switcher ── */}
      <div className="flex items-center gap-3">
        <div className="flex bg-[#F7F9FB] border border-[#00334a]/10 rounded-xl p-1 gap-1">
          <LangTab active={isAr}  hasError={arHasErrors} label="AR عربي"    onClick={() => setLang('ar')} />
          <LangTab active={!isAr} hasError={enHasErrors} label="EN English" onClick={() => setLang('en')} />
        </div>
        <span className="text-[11px] text-secondary/50">
          {isAr ? 'تحرير المحتوى العربي' : 'Editing English content'}
        </span>
      </div>

      {/* ── Section / Key / Status ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={LABEL_CLS}>{t('admin.settings.section')}</label>
          <select value={values.section} onChange={(e) => handleChange('section', e.target.value)} className={INPUT_CLS}>
            {SETTING_SECTIONS.map((item) => (
              <option key={item} value={item}>{t(`admin.settingsSections.${item}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.settings.key')}</label>
          <input dir="ltr" value={values.key} onChange={(e) => handleChange('key', e.target.value)} className={INPUT_CLS} />
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.col.status')}</label>
          <select value={values.status} onChange={(e) => handleChange('status', e.target.value)} className={INPUT_CLS}>
            {SETTING_STATUSES.map((item) => (
              <option key={item} value={item}>{t(`admin.settingsStatus.${item}`)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Title ── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.col.title')} *</label>
        <input
          key={`title-${lang}`}
          dir={dir}
          value={values[titleKey]}
          onChange={(e) => handleChange(titleKey, e.target.value)}
          className={INPUT_CLS}
        />
        {errors[titleKey] && <p className={ERR_CLS}>{errors[titleKey]}</p>}
      </div>

      {/* ── Value ── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.settings.valueEn').replace(' (English)', '').replace(' (Arabic)', '')} *</label>
        <textarea
          key={`value-${lang}`}
          dir={dir}
          rows={3}
          value={values[valueKey]}
          onChange={(e) => handleChange(valueKey, e.target.value)}
          className={`${INPUT_CLS} resize-none`}
        />
        {errors[valueKey] && <p className={ERR_CLS}>{errors[valueKey]}</p>}
      </div>

      {/* ── Actions ── */}
      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="text-sm font-semibold text-secondary px-4 py-2 rounded-xl border border-[#00334a]/20 hover:bg-[#F7F9FB] transition-colors">
          {t('admin.cancel')}
        </button>
        <button type="submit" disabled={saving}
          className="text-sm font-bold bg-primary text-white px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200 disabled:opacity-60">
          {saving ? t('admin.saving') : t('admin.save')}
        </button>
      </div>
    </form>
  )
}
