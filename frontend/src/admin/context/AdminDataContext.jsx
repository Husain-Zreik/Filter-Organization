import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { rumorsApi, newsApi, reportsApi, teamApi, pagesApi, postsApi, mediaApi, settingsApi } from '../../services/api'

const AdminDataContext = createContext(null)

// ── Normalizers (API snake_case → frontend camelCase) ────────────────────
function normalizeRumor(r) {
  return {
    id:          r.id,
    title:       r.title       ?? '',
    description: r.description ?? '',
    status:      r.status      ?? 'unverified',
    category:    r.category    ?? 'health',
    source:      r.source      ?? '',
    image:       r.image       ?? '',
    verifiedAt:  r.verified_at ?? null,
    publishDate: r.publish_date ?? '',
    date:        r.publish_date ?? '',
  }
}

function normalizeNews(n) {
  return {
    id:          n.id,
    title:       n.title       ?? '',
    description: n.description ?? '',
    category:    n.category    ?? 'security',
    location:    n.location    ?? '',
    image:       n.image       ?? '',
    isFeatured:  !!n.is_featured,
    tags:        Array.isArray(n.tags) ? n.tags : [],
    publishDate: n.publish_date ?? '',
    date:        n.publish_date ?? '',
  }
}

function normalizeReport(r) {
  return {
    id:          r.id,
    title:       r.title       ?? '',
    description: r.description ?? '',
    category:    r.category    ?? 'periodic',
    url:         r.file_url    ?? '',
    image:       r.cover_image ?? '',
    fileType:    'PDF',
    fileSize:    r.file_size   ?? '',
    pages:       r.file_pages  ?? 0,
    isFeatured:  !!r.is_featured,
    publishDate: r.publish_date ?? '',
    date:        r.publish_date ?? '',
  }
}

function normalizeTeamMember(m) {
  return {
    id:          m.id,
    name:        m.name        ?? '',
    role:        m.role        ?? '',
    email:       m.email       ?? '',
    description: m.description ?? '',
    skills:      Array.isArray(m.skills) ? m.skills : [],
    image:       m.image       ?? '',
    initials:    m.initials    ?? '',
    sortOrder:   m.sort_order  ?? 0,
  }
}

function normalizePageOrPost(p) {
  return {
    id:              p.id,
    titleEn:         p.title_en    ?? '',
    titleAr:         p.title_ar    ?? '',
    slug:            p.slug        ?? '',
    category:        p.category    ?? 'general',
    status:          p.status      ?? 'draft',
    excerptEn:       p.excerpt_en  ?? '',
    excerptAr:       p.excerpt_ar  ?? '',
    contentEn:       p.content_en  ?? '',
    contentAr:       p.content_ar  ?? '',
    publishDate:     p.publish_date ?? '',
    updatedAt:       p.updated_at  ? p.updated_at.slice(0, 10) : '',
    featuredMediaId: p.featured_media?.id  ?? null,
    mediaUrl:        p.featured_media?.url ?? '',
    image:           p.featured_media?.url ?? '',
  }
}

function normalizeMedia(m) {
  return {
    id:         m.id,
    name:       m.name      ?? '',
    url:        m.url       ?? '',
    mimeType:   m.mime_type ?? '',
    sizeBytes:  m.size_bytes ?? 0,
    sizeLabel:  m.size_label ?? '',
    attachedTo: Array.isArray(m.attached_to) ? m.attached_to : [],
    createdAt:  m.created_at ? m.created_at.slice(0, 10) : '',
  }
}

function normalizeSetting(s) {
  return {
    id:        s.id,
    section:   s.section  ?? 'site',
    key:       s.key      ?? '',
    titleEn:   s.title_en ?? '',
    titleAr:   s.title_ar ?? '',
    valueEn:   s.value_en ?? '',
    valueAr:   s.value_ar ?? '',
    status:    s.status   ?? 'active',
    updatedAt: s.updated_at ? s.updated_at.slice(0, 10) : '',
  }
}

// ── FormData Builders (frontend camelCase → API snake_case) ───────────────
function buildRumorFd(data, isUpdate = false) {
  const fd = new FormData()
  if (isUpdate) fd.append('_method', 'PUT')
  fd.append('title',    data.title    || '')
  fd.append('status',   data.status   || 'unverified')
  fd.append('category', data.category || 'health')
  if (data.description) fd.append('description', data.description)
  if (data.source)      fd.append('source',      data.source)
  if (data.verifiedAt)  fd.append('verified_at', data.verifiedAt)
  const pd = data.publishDate || data.date || ''
  if (pd) fd.append('publish_date', pd)
  if (data._imageFile instanceof File) fd.append('image', data._imageFile)
  return fd
}

function buildNewsFd(data, isUpdate = false) {
  const fd = new FormData()
  if (isUpdate) fd.append('_method', 'PUT')
  fd.append('title',       data.title    || '')
  fd.append('category',    data.category || 'security')
  fd.append('is_featured', data.isFeatured ? '1' : '0')
  if (data.description) fd.append('description', data.description)
  if (data.location)    fd.append('location',    data.location)
  const pd = data.publishDate || data.date || ''
  if (pd) fd.append('publish_date', pd)
  const tags = Array.isArray(data.tags)
    ? data.tags
    : (data.tags || '').split(',').map((t) => t.trim()).filter(Boolean)
  tags.forEach((tag) => fd.append('tags[]', tag))
  if (data._imageFile instanceof File) fd.append('image', data._imageFile)
  return fd
}

function buildReportFd(data, isUpdate = false) {
  const fd = new FormData()
  if (isUpdate) fd.append('_method', 'PUT')
  fd.append('title',       data.title    || '')
  fd.append('category',    data.category || 'periodic')
  fd.append('is_featured', data.isFeatured ? '1' : '0')
  if (data.description) fd.append('description', data.description)
  const pd = data.publishDate || data.date || ''
  if (pd) fd.append('publish_date', pd)
  if (data.pages) fd.append('file_pages', String(data.pages))
  if (data._pdfFile   instanceof File) fd.append('file',        data._pdfFile)
  if (data._coverFile instanceof File) fd.append('cover_image', data._coverFile)
  return fd
}

function buildTeamFd(data, isUpdate = false) {
  const fd = new FormData()
  if (isUpdate) fd.append('_method', 'PUT')
  fd.append('name', data.name || '')
  if (data.role)        fd.append('role',        data.role)
  if (data.email)       fd.append('email',       data.email)
  if (data.description) fd.append('description', data.description)
  if (data.initials)    fd.append('initials',    data.initials)
  const skills = Array.isArray(data.skills)
    ? data.skills
    : (data.skills || '').split(',').map((s) => s.trim()).filter(Boolean)
  skills.forEach((skill) => fd.append('skills[]', skill))
  if (data._imageFile instanceof File) fd.append('image', data._imageFile)
  return fd
}

function buildPageOrPostPayload(data) {
  return {
    title_en:          data.titleEn    || '',
    title_ar:          data.titleAr    || '',
    slug:              data.slug       || '',
    category:          data.category   || 'general',
    status:            data.status     || 'draft',
    excerpt_en:        data.excerptEn  || '',
    excerpt_ar:        data.excerptAr  || '',
    content_en:        data.contentEn  || '',
    content_ar:        data.contentAr  || '',
    publish_date:      data.publishDate || null,
    featured_media_id: data.featuredMediaId || null,
  }
}

function buildSettingPayload(data) {
  return {
    section:  data.section  || 'site',
    key:      data.key      || '',
    title_en: data.titleEn  || '',
    title_ar: data.titleAr  || '',
    value_en: data.valueEn  || '',
    value_ar: data.valueAr  || '',
    status:   data.status   || 'active',
  }
}

// ── Fetch helper ─────────────────────────────────────────────────────────
async function fetchList(apiFn, normalize) {
  try {
    const res = await apiFn({ per_page: 500 })
    const raw = res.data?.data
    if (Array.isArray(raw)) return raw.map(normalize)
    return []
  } catch {
    return []
  }
}

// ── Provider ─────────────────────────────────────────────────────────────
export function AdminDataProvider({ children }) {
  const [rumors,      setRumors]      = useState([])
  const [news,        setNews]        = useState([])
  const [reports,     setReports]     = useState([])
  const [teamMembers, setTeamMembers] = useState([])
  const [pages,       setPages]       = useState([])
  const [posts,       setPosts]       = useState([])
  const [media,       setMedia]       = useState([])
  const [settings,    setSettings]    = useState([])
  const [loading,     setLoading]     = useState(true)

  const loadAll = useCallback(async () => {
    setLoading(true)
    try {
      const [r, n, rep, tm, pg, po, med, set] = await Promise.all([
        fetchList(rumorsApi.list,   normalizeRumor),
        fetchList(newsApi.list,     normalizeNews),
        fetchList(reportsApi.list,  normalizeReport),
        fetchList(teamApi.list,     normalizeTeamMember),
        fetchList(pagesApi.list,    normalizePageOrPost),
        fetchList(postsApi.list,    normalizePageOrPost),
        fetchList(mediaApi.list,    normalizeMedia),
        fetchList(settingsApi.list, normalizeSetting),
      ])
      setRumors(r)
      setNews(n)
      setReports(rep)
      setTeamMembers(tm)
      setPages(pg)
      setPosts(po)
      setMedia(med)
      setSettings(set)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
    window.addEventListener('auth-changed', loadAll)
    return () => window.removeEventListener('auth-changed', loadAll)
  }, [loadAll])

  // ── Rumors ───────────────────────────────────────────────────────────
  async function saveRumor(data) {
    const isUpdate = rumors.some((r) => r.id === data.id)
    const fd = buildRumorFd(data, isUpdate)
    if (isUpdate) {
      const res     = await rumorsApi.update(data.id, fd)
      const updated = normalizeRumor(res.data.data)
      setRumors((prev) => prev.map((r) => (r.id === data.id ? updated : r)))
      return updated
    }
    const res     = await rumorsApi.create(fd)
    const created = normalizeRumor(res.data.data)
    setRumors((prev) => [created, ...prev])
    return created
  }

  async function deleteRumor(id) {
    await rumorsApi.destroy(id)
    setRumors((prev) => prev.filter((r) => r.id !== id))
  }

  // ── News ─────────────────────────────────────────────────────────────
  async function saveNews(data) {
    const isUpdate = news.some((n) => n.id === data.id)
    const fd = buildNewsFd(data, isUpdate)
    if (isUpdate) {
      const res     = await newsApi.update(data.id, fd)
      const updated = normalizeNews(res.data.data)
      setNews((prev) => prev.map((n) => (n.id === data.id ? updated : n)))
      return updated
    }
    const res     = await newsApi.create(fd)
    const created = normalizeNews(res.data.data)
    setNews((prev) => [created, ...prev])
    return created
  }

  async function deleteNews(id) {
    await newsApi.destroy(id)
    setNews((prev) => prev.filter((n) => n.id !== id))
  }

  // ── Reports ───────────────────────────────────────────────────────────
  async function saveReport(data) {
    const isUpdate = reports.some((r) => r.id === data.id)
    const fd = buildReportFd(data, isUpdate)
    if (isUpdate) {
      const res     = await reportsApi.update(data.id, fd)
      const updated = normalizeReport(res.data.data)
      setReports((prev) => prev.map((r) => (r.id === data.id ? updated : r)))
      return updated
    }
    const res     = await reportsApi.create(fd)
    const created = normalizeReport(res.data.data)
    setReports((prev) => [created, ...prev])
    return created
  }

  async function deleteReport(id) {
    await reportsApi.destroy(id)
    setReports((prev) => prev.filter((r) => r.id !== id))
  }

  // ── Team ─────────────────────────────────────────────────────────────
  async function saveTeamMember(data) {
    const isUpdate = teamMembers.some((m) => m.id === data.id)
    const fd = buildTeamFd(data, isUpdate)
    if (isUpdate) {
      const res     = await teamApi.update(data.id, fd)
      const updated = normalizeTeamMember(res.data.data)
      setTeamMembers((prev) => prev.map((m) => (m.id === data.id ? updated : m)))
      return updated
    }
    const res     = await teamApi.create(fd)
    const created = normalizeTeamMember(res.data.data)
    setTeamMembers((prev) => [created, ...prev])
    return created
  }

  async function deleteTeamMember(id) {
    await teamApi.destroy(id)
    setTeamMembers((prev) => prev.filter((m) => m.id !== id))
  }

  // ── Pages ─────────────────────────────────────────────────────────────
  async function savePage(data) {
    let featuredMediaId = data.featuredMediaId ?? null

    if (data._mediaFile instanceof File) {
      try {
        const mfd = new FormData()
        mfd.append('file', data._mediaFile)
        const mRes    = await mediaApi.upload(mfd)
        const newMedia = normalizeMedia(mRes.data.data)
        setMedia((prev) => [newMedia, ...prev])
        featuredMediaId = newMedia.id
      } catch { /* continue without media */ }
    }

    const payload  = buildPageOrPostPayload({ ...data, featuredMediaId })
    const isUpdate = pages.some((p) => p.id === data.id)
    if (isUpdate) {
      const res     = await pagesApi.update(data.id, payload)
      const updated = normalizePageOrPost(res.data.data)
      setPages((prev) => prev.map((p) => (p.id === data.id ? updated : p)))
      return updated
    }
    const res     = await pagesApi.create(payload)
    const created = normalizePageOrPost(res.data.data)
    setPages((prev) => [created, ...prev])
    return created
  }

  async function deletePage(id) {
    await pagesApi.destroy(id)
    setPages((prev) => prev.filter((p) => p.id !== id))
  }

  // ── Posts ─────────────────────────────────────────────────────────────
  async function savePost(data) {
    let featuredMediaId = data.featuredMediaId ?? null

    if (data._mediaFile instanceof File) {
      try {
        const mfd = new FormData()
        mfd.append('file', data._mediaFile)
        const mRes    = await mediaApi.upload(mfd)
        const newMedia = normalizeMedia(mRes.data.data)
        setMedia((prev) => [newMedia, ...prev])
        featuredMediaId = newMedia.id
      } catch { /* continue without media */ }
    }

    const payload  = buildPageOrPostPayload({ ...data, featuredMediaId })
    const isUpdate = posts.some((p) => p.id === data.id)
    if (isUpdate) {
      const res     = await postsApi.update(data.id, payload)
      const updated = normalizePageOrPost(res.data.data)
      setPosts((prev) => prev.map((p) => (p.id === data.id ? updated : p)))
      return updated
    }
    const res     = await postsApi.create(payload)
    const created = normalizePageOrPost(res.data.data)
    setPosts((prev) => [created, ...prev])
    return created
  }

  async function deletePost(id) {
    await postsApi.destroy(id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  // ── Settings ──────────────────────────────────────────────────────────
  async function saveSetting(data) {
    const payload  = buildSettingPayload(data)
    const isUpdate = settings.some((s) => s.id === data.id)
    if (isUpdate) {
      const res     = await settingsApi.upsert(data.id, payload)
      const updated = normalizeSetting(res.data.data)
      setSettings((prev) => prev.map((s) => (s.id === data.id ? updated : s)))
      return updated
    }
    const res     = await settingsApi.create(payload)
    const created = normalizeSetting(res.data.data)
    setSettings((prev) => [created, ...prev])
    return created
  }

  async function deleteSetting(id) {
    await settingsApi.destroy(id)
    setSettings((prev) => prev.filter((s) => s.id !== id))
  }

  // ── Media ─────────────────────────────────────────────────────────────
  async function uploadMedia(file) {
    const fd = new FormData()
    fd.append('file', file)
    const res     = await mediaApi.upload(fd)
    const created = normalizeMedia(res.data.data)
    setMedia((prev) => [created, ...prev])
    return created
  }

  async function deleteMedia(id) {
    await mediaApi.destroy(id)
    setMedia((prev) => prev.filter((m) => m.id !== id))
    setPages((prev) => prev.map((p) => p.featuredMediaId === id ? { ...p, featuredMediaId: null, mediaUrl: '', image: '' } : p))
    setPosts((prev) => prev.map((p) => p.featuredMediaId === id ? { ...p, featuredMediaId: null, mediaUrl: '', image: '' } : p))
  }

  const value = {
    // data
    loading,
    rumors, news, reports, teamMembers, pages, posts, media, settings,
    // rumors
    saveRumor, deleteRumor,
    // news
    saveNews, deleteNews,
    // reports
    saveReport, deleteReport,
    // team
    saveTeamMember, deleteTeamMember,
    // pages
    savePage, deletePage,
    // posts
    savePost, deletePost,
    // settings
    saveSetting, deleteSetting,
    // media
    uploadMedia, deleteMedia,
    // legacy alias used by MediaAdmin
    addMedia: uploadMedia,
  }

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) throw new Error('useAdminData must be used within AdminDataProvider')
  return context
}
