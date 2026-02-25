import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageUp, X } from 'lucide-react'
import { INPUT_CLS, LABEL_CLS } from '../../constants/styles'
import { NEWS_CATEGORIES } from '../../constants/categories'

export default function NewsForm({ initialData, onSubmit, onCancel }) {
  const { t } = useTranslation()
  const fileRef = useRef(null)
  const [imageUrl,  setImageUrl]  = useState(initialData?.image ?? '')
  const [imageFile, setImageFile] = useState(null)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageUrl(URL.createObjectURL(file))
    }
  }

  function handleSave(e) {
    e.preventDefault()
    const fd    = new FormData(e.target)
    const raw   = Object.fromEntries(fd.entries())
    const image = imageUrl || ''
    const data  = {
      ...raw,
      isFeatured: fd.has('isFeatured'),
      tags: raw.tags ? raw.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
      publishDate: raw.date,
    }
    if (initialData) {
      onSubmit({ ...initialData, ...data, image, _imageFile: imageFile })
    } else {
      onSubmit({ ...data, id: Date.now(), image, _imageFile: imageFile })
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
          <select name="category" defaultValue={initialData?.category ?? 'security'} className={INPUT_CLS}>
            {NEWS_CATEGORIES.map((c) => (
              <option key={c} value={c}>{t(`categories.${c}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.form.location')}</label>
          <input name="location" defaultValue={initialData?.location ?? ''} className={INPUT_CLS} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL_CLS}>{t('admin.form.date')}</label>
          <input name="date" type="date"
            defaultValue={initialData?.publishDate ?? new Date().toISOString().slice(0, 10)}
            className={INPUT_CLS} />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-secondary">
            <input name="isFeatured" type="checkbox"
              defaultChecked={initialData?.isFeatured ?? false}
              className="w-4 h-4 rounded accent-primary" />
            {t('admin.form.isFeatured')}
          </label>
        </div>
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.tags')}</label>
        <input name="tags"
          defaultValue={Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : (initialData?.tags ?? '')}
          className={INPUT_CLS} placeholder="عاجل، رسمي، مباشر" />
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
              onClick={() => { setImageUrl(''); setImageFile(null); if (fileRef.current) fileRef.current.value = '' }}
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
