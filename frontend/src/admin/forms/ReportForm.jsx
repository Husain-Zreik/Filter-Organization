import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FileUp, ImageUp, X, FileText } from 'lucide-react'
import { INPUT_CLS, LABEL_CLS } from '../../constants/styles'
import { REPORT_CATEGORIES } from '../../constants/categories'

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

export default function ReportForm({ initialData, onSubmit, onCancel }) {
  const { t } = useTranslation()

  const docRef   = useRef(null)
  const imgRef   = useRef(null)

  const [docUrl,  setDocUrl]  = useState(initialData?.url  ?? '')
  const [docName, setDocName] = useState(initialData?.name ?? '')
  const [docSize, setDocSize] = useState(initialData?.fileSize ?? '')
  const [imageUrl, setImageUrl] = useState(initialData?.image ?? '')

  function handleDoc(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setDocUrl(URL.createObjectURL(file))
    setDocName(file.name)
    setDocSize(formatBytes(file.size))
  }

  function handleImg(e) {
    const file = e.target.files?.[0]
    if (file) setImageUrl(URL.createObjectURL(file))
  }

  function handleSave(e) {
    e.preventDefault()
    const fd   = new FormData(e.target)
    const raw  = Object.fromEntries(fd.entries())
    const data = {
      ...raw,
      pages:       Number(raw.pages) || 0,
      isFeatured:  fd.has('isFeatured'),
      publishDate: raw.date,
      fileType:    'PDF',
      url:         docUrl,
      fileSize:    docSize || raw.fileSize,
      image:       imageUrl || 'https://placehold.co/800x450/00334a/ffffff?text=تقرير',
    }
    if (initialData) {
      onSubmit({ ...initialData, ...data })
    } else {
      onSubmit({ ...data, id: Date.now() })
    }
  }

  return (
    <form key={initialData?.id ?? 'new'} onSubmit={handleSave} className="space-y-4">
      <div>
        <label className={LABEL_CLS}>{t('admin.form.title')} *</label>
        <textarea name="title" defaultValue={initialData?.title ?? ''} required rows={2}
          className={INPUT_CLS} />
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.description')}</label>
        <textarea name="description" defaultValue={initialData?.description ?? ''} rows={4}
          className={INPUT_CLS} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL_CLS}>{t('admin.form.category')}</label>
          <select name="category" defaultValue={initialData?.category ?? 'periodic'} className={INPUT_CLS}>
            {REPORT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{t(`categories.${c}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.form.date')}</label>
          <input name="date" type="date"
            defaultValue={initialData?.publishDate ?? new Date().toISOString().slice(0, 10)}
            className={INPUT_CLS} />
        </div>
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.pages')}</label>
        <input name="pages" type="number" min="1" defaultValue={initialData?.pages ?? ''}
          className={INPUT_CLS} />
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-secondary">
          <input name="isFeatured" type="checkbox"
            defaultChecked={initialData?.isFeatured ?? false}
            className="w-4 h-4 rounded accent-primary" />
          {t('admin.form.isFeatured')}
        </label>
      </div>

      {/* ── PDF document upload ── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.document')} (PDF)</label>
        <input ref={docRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleDoc} />
        {docUrl ? (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#00334a]/15 bg-[#F7F9FB]">
            <FileText size={22} className="text-[#c62828] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary truncate">{docName}</p>
              {docSize && <p className="text-[11px] text-secondary/60">{docSize}</p>}
            </div>
            <button type="button"
              onClick={() => { setDocUrl(''); setDocName(''); setDocSize(''); if (docRef.current) docRef.current.value = '' }}
              className="p-1.5 hover:bg-[#00334a]/8 rounded-lg transition-colors">
              <X size={14} className="text-secondary" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => docRef.current?.click()}
            className="w-full flex flex-col items-center gap-2 py-6 border-2 border-dashed border-[#00334a]/15 rounded-xl bg-[#F7F9FB] hover:border-accent hover:bg-accent/5 transition-colors group">
            <FileUp size={22} className="text-secondary/40 group-hover:text-accent transition-colors" />
            <span className="text-xs font-semibold text-secondary/60 group-hover:text-accent transition-colors">
              {t('admin.form.choosePdf')}
            </span>
          </button>
        )}
      </div>

      {/* ── Cover image upload ── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.image')}</label>
        <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
        {imageUrl ? (
          <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#00334a]/12 bg-[#E8EDF0]">
            <img src={imageUrl} alt="preview" className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <button type="button"
              onClick={() => { setImageUrl(''); if (imgRef.current) imgRef.current.value = '' }}
              className="absolute top-2 end-2 p-1.5 bg-white/90 rounded-full shadow hover:bg-white transition-colors">
              <X size={12} />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => imgRef.current?.click()}
            className="w-full flex flex-col items-center gap-2 py-6 border-2 border-dashed border-[#00334a]/15 rounded-xl bg-[#F7F9FB] hover:border-accent hover:bg-accent/5 transition-colors group">
            <ImageUp size={20} className="text-secondary/40 group-hover:text-accent transition-colors" />
            <span className="text-xs font-semibold text-secondary/60 group-hover:text-accent transition-colors">
              {t('admin.form.chooseFile')}
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="text-sm font-semibold text-secondary px-4 py-2 rounded-xl border border-[#00334a]/20 hover:bg-[#F7F9FB] transition-colors">
          {t('admin.cancel')}
        </button>
        <button type="submit"
          className="text-sm font-bold bg-primary text-white px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200">
          {t('admin.save')}
        </button>
      </div>
    </form>
  )
}
