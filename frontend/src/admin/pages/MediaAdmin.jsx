import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image as ImageIcon, Plus, UploadCloud } from 'lucide-react'
import AdminModal from '../components/AdminModal'
import AdminDataTable from '../components/AdminDataTable'
import { useAdminData } from '../context/AdminDataContext'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE_BYTES = 10 * 1024 * 1024

function typeLabel(mimeType, t) {
  if (!mimeType) return t('admin.media.file')
  if (mimeType.startsWith('image/')) return t('admin.media.image')
  if (mimeType === 'application/pdf') return 'PDF'
  return t('admin.media.file')
}

function MediaPreview({ item }) {
  const { t } = useTranslation()
  if (!item) return null
  const isImage = item.mimeType?.startsWith('image/')

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#00334a]/10 overflow-hidden bg-[#F7F9FB] h-44 flex items-center justify-center">
        {isImage && item.url ? (
          <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <ImageIcon size={30} className="text-secondary opacity-40" />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-bold text-primary">{item.name}</p>
        <p className="text-xs text-secondary opacity-70">{item.sizeLabel}</p>
        <p className="text-xs text-secondary opacity-70">{typeLabel(item.mimeType, t)}</p>
        <p className="text-xs text-secondary opacity-70">{item.createdAt}</p>
        <p className="text-xs text-secondary opacity-70">
          {t('admin.media.attachedTo')}: {item.attachedTo.length ? item.attachedTo.join(', ') : t('admin.media.notAttached')}
        </p>
      </div>
    </div>
  )
}

export default function MediaAdmin() {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const { loading: dataLoading, media, uploadMedia, deleteMedia } = useAdminData()

  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [selected, setSelected] = useState(null)

  const columns = useMemo(
    () => [
      { key: 'name', label: t('admin.media.fileName'), sortable: true },
      { key: 'mimeType', label: t('admin.media.fileType'), sortable: true, render: (val) => typeLabel(val, t) },
      { key: 'sizeLabel', label: t('admin.media.fileSize'), sortable: true },
      { key: 'createdAt', label: t('admin.col.date'), sortable: true },
      {
        key: 'attachedTo',
        label: t('admin.media.attachedTo'),
        sortable: false,
        render: (val) => (val.length ? val.length : t('admin.media.notAttached')),
      },
    ],
    [t],
  )

  const filterConfig = useMemo(
    () => ({
      mimeType: [
        { value: 'image/jpeg', label: 'JPG' },
        { value: 'image/png', label: 'PNG' },
        { value: 'image/webp', label: 'WEBP' },
        { value: 'application/pdf', label: 'PDF' },
      ],
    }),
    [],
  )

  async function addFiles(fileList) {
    const files = Array.from(fileList ?? [])
    if (files.length === 0) return
    setLoading(true)

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setFeedback(`${file.name}: ${t('admin.media.invalidType')}`)
        continue
      }
      if (file.size > MAX_SIZE_BYTES) {
        setFeedback(`${file.name}: ${t('admin.media.invalidSize')}`)
        continue
      }
      try {
        await uploadMedia(file)
        setFeedback(t('admin.messages.uploadSuccess'))
      } catch (err) {
        setFeedback(`${file.name}: ${err.response?.data?.message || t('admin.media.uploadFailed', 'Upload failed')}`)
      }
    }

    setLoading(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  async function handleDelete(row) {
    if (!window.confirm(t('admin.confirmDelete'))) return
    try {
      await deleteMedia(row.id)
      setFeedback(t('admin.messages.deleteSuccess'))
    } catch (err) {
      setFeedback(err.response?.data?.message || 'Delete failed.')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-primary">{t('admin.nav.media')}</h1>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-accent transition-all duration-200"
        >
          <Plus size={14} />
          {t('admin.media.upload')}
        </button>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={[
          'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200',
          dragging ? 'border-accent bg-accent/5' : 'border-[#00334a]/20 hover:border-primary hover:bg-[#F7F9FB]',
        ].join(' ')}
      >
        <UploadCloud size={30} className="mx-auto mb-2 text-secondary opacity-55" />
        <p className="text-sm font-semibold text-primary">{t('admin.media.dropzone')}</p>
        <p className="text-xs text-secondary opacity-60 mt-1">{t('admin.media.dropzoneHint')}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED_TYPES.join(',')}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {feedback && (
        <div className="bg-[#00334a]/5 text-primary text-xs font-semibold rounded-xl px-3 py-2 border border-[#00334a]/15">
          {feedback}
        </div>
      )}

      <AdminDataTable
        columns={columns}
        rows={media}
        searchKeys={['name']}
        filterConfig={filterConfig}
        dateKey="createdAt"
        loading={dataLoading}
        onView={(row) => setSelected(row)}
        onDelete={handleDelete}
      />

      <AdminModal isOpen={Boolean(selected)} title={t('admin.media.preview')} onClose={() => setSelected(null)}>
        <MediaPreview item={selected} />
      </AdminModal>
    </div>
  )
}
