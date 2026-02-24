import { createContext, useContext, useMemo, useState } from 'react'
import { rumors as INITIAL_RUMORS }         from '../../data/mock/rumors'
import { news as INITIAL_NEWS }             from '../../data/mock/news'
import { reports as INITIAL_REPORTS }       from '../../data/mock/reports'
import { teamMembers as INITIAL_TEAM }      from '../../data/mock/team'
import {
  media    as INITIAL_MEDIA,
  pages    as INITIAL_PAGES,
  posts    as INITIAL_POSTS,
  settings as INITIAL_SETTINGS,
} from '../../data/mock/cms'

const AdminDataContext = createContext(null)

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AdminDataProvider({ children }) {
  const [rumors, setRumors]           = useState(INITIAL_RUMORS)
  const [news, setNews]               = useState(INITIAL_NEWS)
  const [reports, setReports]         = useState(INITIAL_REPORTS)
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM)
  const [pages, setPages]             = useState(INITIAL_PAGES)
  const [posts, setPosts]             = useState(INITIAL_POSTS)
  const [media, setMedia]             = useState(INITIAL_MEDIA)
  const [settings, setSettings]       = useState(INITIAL_SETTINGS)

  const value = useMemo(
    () => ({
      // ── data ──
      rumors,
      news,
      reports,
      teamMembers,
      pages,
      posts,
      media,
      settings,

      // ── rumors ──
      saveRumor:   (data) => setRumors((prev) => upsertById(prev, data)),
      deleteRumor: (id)   => setRumors((prev) => prev.filter((row) => row.id !== id)),

      // ── news ──
      saveNews:   (data) => setNews((prev) => upsertById(prev, data)),
      deleteNews: (id)   => setNews((prev) => prev.filter((row) => row.id !== id)),

      // ── reports ──
      saveReport:   (data) => setReports((prev) => upsertById(prev, data)),
      deleteReport: (id)   => setReports((prev) => prev.filter((row) => row.id !== id)),

      // ── team ──
      saveTeamMember:   (data) => setTeamMembers((prev) => upsertById(prev, data)),
      deleteTeamMember: (id)   => setTeamMembers((prev) => prev.filter((row) => row.id !== id)),

      // ── pages / posts ──
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

      // ── settings ──
      saveSetting:   (data) => setSettings((prev) => upsertById(prev, data)),
      deleteSetting: (id)   => setSettings((prev) => prev.filter((row) => row.id !== id)),

      // ── media ──
      addMedia:    (entry) => setMedia((prev) => [entry, ...prev]),
      updateMedia: (entry) => setMedia((prev) => upsertById(prev, entry)),
      deleteMedia: (id) => {
        setMedia((prev) => prev.filter((row) => row.id !== id))
        setPages((prev) => prev.map((row) => (row.featuredMediaId === id ? { ...row, featuredMediaId: null } : row)))
        setPosts((prev) => prev.map((row) => (row.featuredMediaId === id ? { ...row, featuredMediaId: null } : row)))
      },
    }),
    [media, news, pages, posts, reports, rumors, settings, teamMembers],
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
