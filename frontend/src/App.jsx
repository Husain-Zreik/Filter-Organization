import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import FilterToolPage from './pages/FilterToolPage'
import RumorsPage from './pages/RumorsPage'
import NewsPage from './pages/NewsPage'
import ReportsPage from './pages/ReportsPage'
import ArchivePage from './pages/ArchivePage'
import TeamPage from './pages/TeamPage'
import MorePage from './pages/MorePage'

import AdminGuard from './admin/components/AdminGuard'
import AdminLayout from './admin/components/AdminLayout'
import DashboardHome from './admin/pages/DashboardHome'
import PagesAdmin from './admin/pages/PagesAdmin'
import PostsAdmin from './admin/pages/PostsAdmin'
import MediaAdmin from './admin/pages/MediaAdmin'
import SettingsAdmin from './admin/pages/SettingsAdmin'
import { AdminDataProvider } from './admin/context/AdminDataContext'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="filter" element={<FilterToolPage />} />
        <Route path="rumors" element={<RumorsPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="more" element={<MorePage />} />
      </Route>

      {/* Admin dashboard */}
      <Route
        path="/admin"
        element={
          <AdminDataProvider>
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          </AdminDataProvider>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="pages"    element={<PagesAdmin />} />
        <Route path="posts"    element={<PostsAdmin />} />
        <Route path="media"    element={<MediaAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>
    </Routes>
  )
}
