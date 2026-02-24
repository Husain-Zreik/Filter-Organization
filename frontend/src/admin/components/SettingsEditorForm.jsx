import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function validate(values, t) {
  const errors = {}
  if (!values.titleEn.trim()) errors.titleEn = t('admin.validation.required')
  if (!values.titleAr.trim()) errors.titleAr = t('admin.validation.required')
  if (!values.valueEn.trim()) errors.valueEn = t('admin.validation.required')
  if (!values.valueAr.trim()) errors.valueAr = t('admin.validation.required')
  return errors
}

const SECTIONS = ['site', 'announcement', 'notifications']
const STATUS = ['active', 'inactive']

export default function SettingsEditorForm({ initialData, onCancel, onSubmit }) {
  const { t } = useTranslation()
  const [values, setValues] = useState(() => ({
    id: initialData?.id ?? `setting-${Date.now()}`,
    section: initialData?.section ?? 'site',
    key: initialData?.key ?? '',
    titleEn: initialData?.titleEn ?? '',
    titleAr: initialData?.titleAr ?? '',
    valueEn: initialData?.valueEn ?? '',
    valueAr: initialData?.valueAr ?? '',
    status: initialData?.status ?? 'active',
    updatedAt: new Date().toISOString().slice(0, 10),
  }))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(values, t)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSaving(true)
    await Promise.resolve()
    onSubmit({ ...values, updatedAt: new Date().toISOString().slice(0, 10) })
    setSaving(false)
  }

  const labelClass = 'block text-xs font-bold text-primary mb-1'
  const inputClass = 'w-full border border-[#00334a]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary'
  const errorClass = 'text-[11px] text-[#c62828] mt-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>{t('admin.settings.section')}</label>
          <select value={values.section} onChange={(e) => handleChange('section', e.target.value)} className={inputClass}>
            {SECTIONS.map((item) => (
              <option key={item} value={item}>
                {t(`admin.settingsSections.${item}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('admin.settings.key')}</label>
          <input value={values.key} onChange={(e) => handleChange('key', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('admin.col.status')}</label>
          <select value={values.status} onChange={(e) => handleChange('status', e.target.value)} className={inputClass}>
            {STATUS.map((item) => (
              <option key={item} value={item}>
                {t(`admin.settingsStatus.${item}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.form.titleEn')}</label>
          <input value={values.titleEn} onChange={(e) => handleChange('titleEn', e.target.value)} className={inputClass} />
          {errors.titleEn && <p className={errorClass}>{errors.titleEn}</p>}
        </div>
        <div>
          <label className={labelClass}>{t('admin.form.titleAr')}</label>
          <input dir="rtl" value={values.titleAr} onChange={(e) => handleChange('titleAr', e.target.value)} className={inputClass} />
          {errors.titleAr && <p className={errorClass}>{errors.titleAr}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.settings.valueEn')}</label>
          <textarea rows={3} value={values.valueEn} onChange={(e) => handleChange('valueEn', e.target.value)} className={`${inputClass} resize-none`} />
          {errors.valueEn && <p className={errorClass}>{errors.valueEn}</p>}
        </div>
        <div>
          <label className={labelClass}>{t('admin.settings.valueAr')}</label>
          <textarea rows={3} dir="rtl" value={values.valueAr} onChange={(e) => handleChange('valueAr', e.target.value)} className={`${inputClass} resize-none`} />
          {errors.valueAr && <p className={errorClass}>{errors.valueAr}</p>}
        </div>
      </div>

      <div className="bg-[#F7F9FB] rounded-xl border border-[#00334a]/8 p-3">
        <p className="text-xs font-bold text-primary mb-2">{t('admin.form.rtlPreview')}</p>
        <p dir="rtl" className="text-sm text-secondary">
          {values.valueAr || t('admin.form.rtlPreviewHint')}
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-secondary px-4 py-2 rounded-xl border border-[#00334a]/20 hover:bg-[#F7F9FB] transition-colors"
        >
          {t('admin.cancel')}
        </button>
        <button
          type="submit"
          disabled={saving}
          className="text-sm font-bold bg-primary text-white px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200 disabled:opacity-60"
        >
          {saving ? t('admin.saving') : t('admin.save')}
        </button>
      </div>
    </form>
  )
}
