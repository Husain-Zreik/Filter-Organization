import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const CATEGORIES = {
  page: ['general', 'policy', 'faq'],
  post: ['news', 'update', 'announcement'],
}

const STATUSES = ['draft', 'published', 'scheduled']

function toSlug(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function validate(values, t) {
  const nextErrors = {}
  if (!values.titleEn.trim()) nextErrors.titleEn = t('admin.validation.required')
  if (!values.titleAr.trim()) nextErrors.titleAr = t('admin.validation.required')
  if (!values.slug.trim()) nextErrors.slug = t('admin.validation.required')
  if (!/^[a-z0-9-]+$/.test(values.slug)) nextErrors.slug = t('admin.validation.slug')
  if (!values.publishDate) nextErrors.publishDate = t('admin.validation.required')
  if (!values.contentEn.trim()) nextErrors.contentEn = t('admin.validation.required')
  if (!values.contentAr.trim()) nextErrors.contentAr = t('admin.validation.required')
  return nextErrors
}

export default function ContentEditorForm({
  mode,
  initialData,
  mediaOptions = [],
  onCancel,
  onSubmit,
}) {
  const { t } = useTranslation()
  const [values, setValues] = useState(() => ({
    id: initialData?.id ?? `${mode}-${Date.now()}`,
    titleEn: initialData?.titleEn ?? '',
    titleAr: initialData?.titleAr ?? '',
    slug: initialData?.slug ?? '',
    category: initialData?.category ?? CATEGORIES[mode][0],
    status: initialData?.status ?? 'draft',
    publishDate: initialData?.publishDate ?? new Date().toISOString().slice(0, 10),
    excerptEn: initialData?.excerptEn ?? '',
    excerptAr: initialData?.excerptAr ?? '',
    contentEn: initialData?.contentEn ?? '',
    contentAr: initialData?.contentAr ?? '',
    featuredMediaId: initialData?.featuredMediaId ? String(initialData.featuredMediaId) : '',
    updatedAt: new Date().toISOString().slice(0, 10),
  }))
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const selectedMedia = useMemo(
    () => mediaOptions.find((item) => String(item.id) === String(values.featuredMediaId)),
    [mediaOptions, values.featuredMediaId],
  )

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
    setMessage('')
    await Promise.resolve()
    onSubmit({
      ...values,
      featuredMediaId: values.featuredMediaId ? Number(values.featuredMediaId) : null,
      updatedAt: new Date().toISOString().slice(0, 10),
    })
    setSaving(false)
    setMessage(t('admin.saved'))
  }

  const labelClass = 'block text-xs font-bold text-primary mb-1'
  const inputClass = 'w-full border border-[#00334a]/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary'
  const errorClass = 'text-[11px] text-[#c62828] mt-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.form.titleEn')}</label>
          <input
            value={values.titleEn}
            onChange={(e) => {
              const nextTitle = e.target.value
              handleChange('titleEn', nextTitle)
              if (!initialData?.slug && !values.slug) {
                handleChange('slug', toSlug(nextTitle))
              }
            }}
            className={inputClass}
          />
          {errors.titleEn && <p className={errorClass}>{errors.titleEn}</p>}
        </div>

        <div>
          <label className={labelClass}>{t('admin.form.titleAr')}</label>
          <input value={values.titleAr} dir="rtl" onChange={(e) => handleChange('titleAr', e.target.value)} className={inputClass} />
          {errors.titleAr && <p className={errorClass}>{errors.titleAr}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>{t('admin.form.slug')}</label>
          <input value={values.slug} onChange={(e) => handleChange('slug', toSlug(e.target.value))} className={inputClass} />
          {errors.slug && <p className={errorClass}>{errors.slug}</p>}
        </div>
        <div>
          <label className={labelClass}>{t('admin.col.category')}</label>
          <select value={values.category} onChange={(e) => handleChange('category', e.target.value)} className={inputClass}>
            {CATEGORIES[mode].map((item) => (
              <option key={item} value={item}>
                {t(`admin.contentCategories.${item}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t('admin.col.status')}</label>
          <select value={values.status} onChange={(e) => handleChange('status', e.target.value)} className={inputClass}>
            {STATUSES.map((item) => (
              <option key={item} value={item}>
                {t(`admin.contentStatus.${item}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.form.publishDate')}</label>
          <input type="date" value={values.publishDate} onChange={(e) => handleChange('publishDate', e.target.value)} className={inputClass} />
          {errors.publishDate && <p className={errorClass}>{errors.publishDate}</p>}
        </div>
        <div>
          <label className={labelClass}>{t('admin.form.featuredMedia')}</label>
          <select value={values.featuredMediaId} onChange={(e) => handleChange('featuredMediaId', e.target.value)} className={inputClass}>
            <option value="">{t('admin.form.noMedia')}</option>
            {mediaOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedMedia && (
        <div className="bg-[#F7F9FB] rounded-xl border border-[#00334a]/8 p-3">
          <p className="text-xs font-semibold text-primary">{selectedMedia.name}</p>
          <p className="text-[11px] text-secondary opacity-70">{selectedMedia.sizeLabel}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.form.excerptEn')}</label>
          <textarea rows={2} value={values.excerptEn} onChange={(e) => handleChange('excerptEn', e.target.value)} className={`${inputClass} resize-none`} />
        </div>
        <div>
          <label className={labelClass}>{t('admin.form.excerptAr')}</label>
          <textarea rows={2} dir="rtl" value={values.excerptAr} onChange={(e) => handleChange('excerptAr', e.target.value)} className={`${inputClass} resize-none`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.form.contentEn')}</label>
          <textarea rows={5} value={values.contentEn} onChange={(e) => handleChange('contentEn', e.target.value)} className={`${inputClass} resize-y`} />
          {errors.contentEn && <p className={errorClass}>{errors.contentEn}</p>}
        </div>
        <div>
          <label className={labelClass}>{t('admin.form.contentAr')}</label>
          <textarea rows={5} dir="rtl" value={values.contentAr} onChange={(e) => handleChange('contentAr', e.target.value)} className={`${inputClass} resize-y`} />
          {errors.contentAr && <p className={errorClass}>{errors.contentAr}</p>}
        </div>
      </div>

      <div className="bg-[#F7F9FB] rounded-xl border border-[#00334a]/8 p-3">
        <p className="text-xs font-bold text-primary mb-2">{t('admin.form.rtlPreview')}</p>
        <p dir="rtl" className="text-sm text-secondary">
          {values.contentAr || t('admin.form.rtlPreviewHint')}
        </p>
      </div>

      {message && <p className="text-xs font-semibold text-[#2e7d32]">{message}</p>}

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
