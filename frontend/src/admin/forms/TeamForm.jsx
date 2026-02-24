import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageUp, X } from 'lucide-react'
import { INPUT_CLS, LABEL_CLS } from '../../constants/styles'

export default function TeamForm({ initialData, onSubmit, onCancel }) {
  const { t } = useTranslation()
  const fileRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(initialData?.image ?? '')

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (file) setImageUrl(URL.createObjectURL(file))
  }

  function handleSave(e) {
    e.preventDefault()
    const fd   = new FormData(e.target)
    const raw  = Object.fromEntries(fd.entries())
    const data = {
      ...raw,
      skills: raw.skills ? raw.skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
    }
    const image = imageUrl || `https://placehold.co/200x200/00334a/ffffff?text=${raw.initials || '؟'}`
    if (initialData) {
      onSubmit({ ...initialData, ...data, image })
    } else {
      onSubmit({ ...data, id: Date.now(), image })
    }
  }

  return (
    <form key={initialData?.id ?? 'new'} onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL_CLS}>{t('admin.form.name')} *</label>
          <input name="name" defaultValue={initialData?.name ?? ''} required className={INPUT_CLS} />
        </div>
        <div>
          <label className={LABEL_CLS}>{t('admin.form.initials')}</label>
          <input name="initials" defaultValue={initialData?.initials ?? ''} maxLength={3}
            className={INPUT_CLS} placeholder="سأ" />
        </div>
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.role')}</label>
        <input name="role" defaultValue={initialData?.role ?? ''} className={INPUT_CLS} />
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.email')}</label>
        <input name="email" type="email" defaultValue={initialData?.email ?? ''} className={INPUT_CLS} />
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.description')}</label>
        <textarea name="description" defaultValue={initialData?.description ?? ''} rows={3}
          className={INPUT_CLS} />
      </div>
      <div>
        <label className={LABEL_CLS}>{t('admin.form.skills')}</label>
        <input name="skills"
          defaultValue={Array.isArray(initialData?.skills) ? initialData.skills.join(', ') : (initialData?.skills ?? '')}
          className={INPUT_CLS} placeholder="التحقق من الحقائق، تحليل البيانات" />
      </div>

      {/* ── Photo upload ── */}
      <div>
        <label className={LABEL_CLS}>{t('admin.form.image')}</label>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        {imageUrl ? (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#00334a]/12 bg-[#E8EDF0]">
            <img src={imageUrl} alt="preview" className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <button type="button"
              onClick={() => { setImageUrl(''); if (fileRef.current) fileRef.current.value = '' }}
              className="absolute top-1 end-1 p-1 bg-white/90 rounded-full shadow hover:bg-white transition-colors">
              <X size={10} />
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
