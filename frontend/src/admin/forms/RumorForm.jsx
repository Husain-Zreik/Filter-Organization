import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageUp, X } from 'lucide-react'
import { INPUT_CLS, LABEL_CLS } from '../../constants/styles'
import { RUMOR_CATEGORIES } from '../../constants/categories'
import { RUMOR_STATUSES } from '../../constants/statuses'

export default function RumorForm({ initialData, onSubmit, onCancel }) {
  const { t } = useTranslation()
  const fileRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(initialData?.image ?? '')

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (file) setImageUrl(URL.createObjectURL(file))
  }

  function handleSave(e) {
    e.preventDefault()
    const fd    = new FormData(e.target)
    const data  = Object.fromEntries(fd.entries())
    const image = imageUrl || 'https://placehold.co/800x450/00334a/ffffff?text=شائعة'
    if (initialData) {
      onSubmit({ ...initialData, ...data, image })
    } else {
      onSubmit({ ...data, id: Date.now(), image })
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
          <label className={LABEL_CLS}>{t('admin.form.status')}</label>
          <select name="status" defaultValue={initialData?.status ?? 'unverified'} className={INPUT_CLS}>
            {RUMOR_STATUSES.map((s) => (
              <option key={s} value={s}>{t(`status.${s}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.form.category')}</label>
          <select name="category" defaultValue={initialData?.category ?? 'health'} className={INPUT_CLS}>
            {RUMOR_CATEGORIES.map((c) => (
              <option key={c} value={c}>{t(`categories.${c}`)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL_CLS}>{t('admin.form.source')}</label>
          <input name="source" defaultValue={initialData?.source ?? ''} className={INPUT_CLS} />
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.form.date')}</label>
          <input name="date" type="date"
            defaultValue={initialData?.publishDate ?? new Date().toISOString().slice(0, 10)}
            className={INPUT_CLS} />
        </div>
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.verifiedAt')}</label>
        <input name="verifiedAt" defaultValue={initialData?.verifiedAt ?? ''} className={INPUT_CLS} />
      </div>

      {/* ── Cover image ── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.image')}</label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {imageUrl ? (
          <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#00334a]/12 bg-[#E8EDF0]">
            <img src={imageUrl} alt="preview" className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <button type="button"
              onClick={() => { setImageUrl(''); if (fileRef.current) fileRef.current.value = '' }}
              className="absolute top-2 end-2 p-1.5 bg-white/90 rounded-full shadow hover:bg-white transition-colors">
              <X size={12} />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => fileRef.current?.click()}
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
