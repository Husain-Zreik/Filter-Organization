import { createContext, useContext, useMemo, useState } from 'react'

const AdminDataContext = createContext(null)

const INITIAL_MEDIA = [
  {
    id: 1,
    name: 'homepage-hero.jpg',
    sizeBytes: 186000,
    sizeLabel: '182 KB',
    mimeType: 'image/jpeg',
    url: 'https://placehold.co/800x500/00334a/ffffff?text=Hero',
    createdAt: '2026-02-20',
    attachedTo: ['page-1', 'post-1'],
  },
  {
    id: 2,
    name: 'about-cover.webp',
    sizeBytes: 98000,
    sizeLabel: '96 KB',
    mimeType: 'image/webp',
    url: 'https://placehold.co/800x500/2d4a5c/ffffff?text=About',
    createdAt: '2026-02-21',
    attachedTo: ['page-2'],
  },
  {
    id: 3,
    name: 'policy-brief.pdf',
    sizeBytes: 650000,
    sizeLabel: '635 KB',
    mimeType: 'application/pdf',
    url: '',
    createdAt: '2026-02-22',
    attachedTo: ['post-2'],
  },
]

const INITIAL_PAGES = [
  {
    id: 'page-1',
    titleEn: 'Home',
    titleAr: 'الرئيسية',
    slug: 'home',
    category: 'general',
    status: 'published',
    publishDate: '2026-02-18',
    excerptEn: 'Landing page overview.',
    excerptAr: 'نظرة عامة على الصفحة الرئيسية.',
    contentEn: 'Main homepage content.',
    contentAr: 'المحتوى الرئيسي للصفحة.',
    featuredMediaId: 1,
    updatedAt: '2026-02-22',
  },
  {
    id: 'page-2',
    titleEn: 'About',
    titleAr: 'عن المنصة',
    slug: 'about',
    category: 'general',
    status: 'draft',
    publishDate: '2026-02-24',
    excerptEn: 'About the platform mission.',
    excerptAr: 'معلومات عن مهمة المنصة.',
    contentEn: 'About page content.',
    contentAr: 'محتوى صفحة عن المنصة.',
    featuredMediaId: 2,
    updatedAt: '2026-02-21',
  },
]

const INITIAL_POSTS = [
  {
    id: 'post-1',
    titleEn: 'Verification campaign launch',
    titleAr: 'إطلاق حملة التحقق',
    slug: 'verification-campaign-launch',
    category: 'news',
    status: 'published',
    publishDate: '2026-02-19',
    excerptEn: 'Official campaign to combat misinformation.',
    excerptAr: 'حملة رسمية لمكافحة المعلومات المضللة.',
    contentEn: 'Post body in English.',
    contentAr: 'نص المقال باللغة العربية.',
    featuredMediaId: 1,
    updatedAt: '2026-02-22',
  },
  {
    id: 'post-2',
    titleEn: 'Monthly policy update',
    titleAr: 'تحديث السياسات الشهري',
    slug: 'monthly-policy-update',
    category: 'update',
    status: 'scheduled',
    publishDate: '2026-02-28',
    excerptEn: 'Upcoming policy clarifications.',
    excerptAr: 'توضيحات السياسات القادمة.',
    contentEn: 'Policy update content.',
    contentAr: 'محتوى تحديث السياسات.',
    featuredMediaId: 3,
    updatedAt: '2026-02-20',
  },
]

const INITIAL_SETTINGS = [
  {
    id: 'setting-1',
    section: 'site',
    key: 'siteIdentity',
    titleEn: 'Site Identity',
    titleAr: 'هوية الموقع',
    valueEn: 'Filter',
    valueAr: 'فلتر',
    status: 'active',
    updatedAt: '2026-02-22',
  },
  {
    id: 'setting-2',
    section: 'announcement',
    key: 'announcementText',
    titleEn: 'Announcement Text',
    titleAr: 'نص شريط التنبيه',
    valueEn: 'Operational update available.',
    valueAr: 'تحديث تشغيلي متاح الآن.',
    status: 'active',
    updatedAt: '2026-02-21',
  },
]

function upsertById(list, item) {
  const foundIndex = list.findIndex((row) => row.id === item.id)
  if (foundIndex === -1) return [item, ...list]
  return list.map((row) => (row.id === item.id ? item : row))
}

function syncAttachment(mediaList, contentId, mediaId) {
  return mediaList.map((item) => {
    const removed = { ...item, attachedTo: item.attachedTo.filter((ref) => ref !== contentId) }
    if (String(item.id) === String(mediaId)) {
      return { ...removed, attachedTo: [...removed.attachedTo, contentId] }
    }
    return removed
  })
}

export function AdminDataProvider({ children }) {
  const [pages, setPages] = useState(INITIAL_PAGES)
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [media, setMedia] = useState(INITIAL_MEDIA)
  const [settings, setSettings] = useState(INITIAL_SETTINGS)

  const value = useMemo(
    () => ({
      pages,
      posts,
      media,
      settings,
      savePage: (data) => {
        setPages((prev) => upsertById(prev, data))
        setMedia((prev) => syncAttachment(prev, data.id, data.featuredMediaId))
      },
      deletePage: (id) => {
        setPages((prev) => prev.filter((row) => row.id !== id))
        setMedia((prev) => syncAttachment(prev, id, null))
      },
      savePost: (data) => {
        setPosts((prev) => upsertById(prev, data))
        setMedia((prev) => syncAttachment(prev, data.id, data.featuredMediaId))
      },
      deletePost: (id) => {
        setPosts((prev) => prev.filter((row) => row.id !== id))
        setMedia((prev) => syncAttachment(prev, id, null))
      },
      saveSetting: (data) => setSettings((prev) => upsertById(prev, data)),
      deleteSetting: (id) => setSettings((prev) => prev.filter((row) => row.id !== id)),
      addMedia: (entry) => setMedia((prev) => [entry, ...prev]),
      updateMedia: (entry) => setMedia((prev) => upsertById(prev, entry)),
      deleteMedia: (id) => {
        setMedia((prev) => prev.filter((row) => row.id !== id))
        setPages((prev) => prev.map((row) => (row.featuredMediaId === id ? { ...row, featuredMediaId: null } : row)))
        setPosts((prev) => prev.map((row) => (row.featuredMediaId === id ? { ...row, featuredMediaId: null } : row)))
      },
    }),
    [media, pages, posts, settings],
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) {
    throw new Error('useAdminData must be used within AdminDataProvider')
  }
  return context
}
