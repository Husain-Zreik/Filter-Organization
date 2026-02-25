import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageUp, Link2, X } from 'lucide-react'
import { PAGE_CATEGORIES, POST_CATEGORIES } from '../../constants/categories'
import { CONTENT_STATUSES } from '../../constants/statuses'
import { INPUT_CLS, LABEL_CLS, ERR_CLS } from '../../constants/styles'

const CATEGORIES = {
  page: PAGE_CATEGORIES,
  post: POST_CATEGORIES,
}

function toSlug(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function validate(values, t) {
  const errors = {}
  if (!values.titleAr.trim())   errors.titleAr   = t('admin.validation.required')
  if (!values.titleEn.trim())   errors.titleEn   = t('admin.validation.required')
  if (!values.slug.trim())      errors.slug      = t('admin.validation.required')
  if (!/^[a-z0-9-]+$/.test(values.slug)) errors.slug = t('admin.validation.slug')
  if (!values.publishDate)      errors.publishDate = t('admin.validation.required')
  if (!values.contentAr.trim()) errors.contentAr = t('admin.validation.required')
  if (!values.contentEn.trim()) errors.contentEn = t('admin.validation.required')
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

function MediaTab({ active, icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150',
        active ? 'bg-white shadow-sm text-primary' : 'text-secondary/60 hover:text-secondary',
      ].join(' ')}
    >
      <Icon size={13} />
      {label}
    </button>
  )
}

export default function ContentEditorForm({
  mode,
  initialData,
  onCancel,
  onSubmit,
}) {
  const { t } = useTranslation()
  const fileInputRef = useRef(null)

  const [lang, setLang]         = useState('ar')
  const [mediaTab, setMediaTab] = useState('upload')
  const [urlInput, setUrlInput] = useState(initialData?.mediaUrl ?? initialData?.image ?? '')
  const [mediaFile, setMediaFile] = useState(null)

  const [values, setValues] = useState(() => ({
    id:          initialData?.id          ?? `${mode}-${Date.now()}`,
    titleEn:     initialData?.titleEn     ?? '',
    titleAr:     initialData?.titleAr     ?? '',
    slug:        initialData?.slug        ?? '',
    category:    initialData?.category    ?? CATEGORIES[mode][0],
    status:      initialData?.status      ?? 'draft',
    publishDate: initialData?.publishDate ?? new Date().toISOString().slice(0, 10),
    excerptEn:   initialData?.excerptEn   ?? '',
    excerptAr:   initialData?.excerptAr   ?? '',
    contentEn:   initialData?.contentEn   ?? '',
    contentAr:   initialData?.contentAr   ?? '',
    mediaUrl:    initialData?.mediaUrl    ?? initialData?.image ?? '',
    updatedAt:   new Date().toISOString().slice(0, 10),
  }))
  const [errors, setErrors]   = useState({})
  const [saving, setSaving]   = useState(false)
  const [message, setMessage] = useState('')

  const isAr       = lang === 'ar'
  const dir        = isAr ? 'rtl' : 'ltr'
  const titleKey   = isAr ? 'titleAr'   : 'titleEn'
  const excerptKey = isAr ? 'excerptAr' : 'excerptEn'
  const contentKey = isAr ? 'contentAr' : 'contentEn'

  const arHasErrors = Boolean(errors.titleAr || errors.contentAr)
  const enHasErrors = Boolean(errors.titleEn || errors.contentEn)

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setMediaFile(file)
    const objectUrl = URL.createObjectURL(file)
    handleChange('mediaUrl', objectUrl)
  }

  function handleUrlCommit() {
    handleChange('mediaUrl', urlInput.trim())
  }

  function clearMedia() {
    setMediaFile(null)
    handleChange('mediaUrl', '')
    setUrlInput('')
    if (fileInputRef.current) fileInputRef.current.value = ''
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
    setMessage('')
    await Promise.resolve()
    onSubmit({
      ...values,
      image:      values.mediaUrl || undefined,
      _mediaFile: mediaFile,
      updatedAt:  new Date().toISOString().slice(0, 10),
    })
    setSaving(false)
    setMessage(t('admin.saved'))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── Language switcher ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="flex bg-[#F7F9FB] border border-[#00334a]/10 rounded-xl p-1 gap-1">
          <LangTab active={isAr}  hasError={arHasErrors} label="AR عربي"    onClick={() => setLang('ar')} />
          <LangTab active={!isAr} hasError={enHasErrors} label="EN English" onClick={() => setLang('en')} />
        </div>
        <span className="text-[11px] text-secondary/50">
          {isAr ? 'تحرير المحتوى العربي' : 'Editing English content'}
        </span>
      </div>

      {/* ── Title ─────────────────────────────────────────────────────────── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.col.title')} *</label>
        <input
          key={`title-${lang}`}
          dir={dir}
          value={values[titleKey]}
          onChange={(e) => {
            handleChange(titleKey, e.target.value)
            if (!isAr && !initialData?.slug && !values.slug) {
              handleChange('slug', toSlug(e.target.value))
            }
          }}
          className={INPUT_CLS}
        />
        {errors[titleKey] && <p className={ERR_CLS}>{errors[titleKey]}</p>}
      </div>

      {/* ── Slug / Category / Status ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={LABEL_CLS}>{t('admin.form.slug')}</label>
          <input
            value={values.slug}
            dir="ltr"
            placeholder="my-slug"
            onChange={(e) => handleChange('slug', toSlug(e.target.value))}
            className={INPUT_CLS}
          />
          {errors.slug && <p className={ERR_CLS}>{errors.slug}</p>}
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.col.category')}</label>
          <select value={values.category} onChange={(e) => handleChange('category', e.target.value)} className={INPUT_CLS}>
            {CATEGORIES[mode].map((item) => (
              <option key={item} value={item}>{t(`admin.contentCategories.${item}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.col.status')}</label>
          <select value={values.status} onChange={(e) => handleChange('status', e.target.value)} className={INPUT_CLS}>
            {CONTENT_STATUSES.map((item) => (
              <option key={item} value={item}>{t(`admin.contentStatus.${item}`)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Publish Date ──────────────────────────────────────────────────── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.publishDate')}</label>
        <input
          type="date"
          value={values.publishDate}
          onChange={(e) => handleChange('publishDate', e.target.value)}
          className={INPUT_CLS}
        />
        {errors.publishDate && <p className={ERR_CLS}>{errors.publishDate}</p>}
      </div>

      {/* ── Media ─────────────────────────────────────────────────────────── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.featuredMedia')}</label>
        <div className="rounded-2xl border border-[#00334a]/12 overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center gap-1 bg-[#F7F9FB] px-3 py-2 border-b border-[#00334a]/10">
            <MediaTab
              active={mediaTab === 'upload'}
              icon={ImageUp}
              label={t('admin.form.mediaUpload')}
              onClick={() => setMediaTab('upload')}
            />
            <MediaTab
              active={mediaTab === 'url'}
              icon={Link2}
              label={t('admin.form.mediaUrlLink')}
              onClick={() => setMediaTab('url')}
            />
          </div>

          {/* Upload tab */}
          {mediaTab === 'upload' && (
            <div className="p-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 py-5 border-2 border-dashed border-[#00334a]/15 rounded-xl bg-[#F7F9FB] hover:border-accent hover:bg-accent/5 transition-colors duration-200 group"
              >
                <ImageUp size={22} className="text-secondary/40 group-hover:text-accent transition-colors" />
                <span className="text-xs font-semibold text-secondary/60 group-hover:text-accent transition-colors">
                  {t('admin.form.chooseFile')}
                </span>
              </button>
            </div>
          )}

          {/* URL tab */}
          {mediaTab === 'url' && (
            <div className="p-3">
              <input
                type="url"
                dir="ltr"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onBlur={handleUrlCommit}
                placeholder={t('admin.form.urlPlaceholder')}
                className={INPUT_CLS}
              />
            </div>
          )}
        </div>

        {/* Preview */}
        {values.mediaUrl && (
          <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-[#00334a]/12 bg-[#E8EDF0]">
            <img
              src={values.mediaUrl}
              alt="preview"
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <button
              type="button"
              onClick={clearMedia}
              className="absolute top-2 end-2 p-1.5 bg-white/90 rounded-full shadow hover:bg-white transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      {/* ── Excerpt ───────────────────────────────────────────────────────── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.excerptEn').replace(' (English)', '').replace(' (Arabic)', '')}</label>
        <textarea
          key={`excerpt-${lang}`}
          dir={dir}
          rows={2}
          value={values[excerptKey]}
          onChange={(e) => handleChange(excerptKey, e.target.value)}
          className={`${INPUT_CLS} resize-none`}
        />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.contentEn').replace(' (English)', '').replace(' (Arabic)', '')} *</label>
        <textarea
          key={`content-${lang}`}
          dir={dir}
          rows={6}
          value={values[contentKey]}
          onChange={(e) => handleChange(contentKey, e.target.value)}
          className={`${INPUT_CLS} resize-y`}
        />
        {errors[contentKey] && <p className={ERR_CLS}>{errors[contentKey]}</p>}
      </div>

      {message && <p className="text-xs font-semibold text-[#2e7d32]">{message}</p>}

      {/* ── Actions ───────────────────────────────────────────────────────── */}
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
