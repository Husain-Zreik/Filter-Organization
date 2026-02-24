import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  FileText,
  NotebookPen,
  Image,
  Settings,
  X,
} from 'lucide-react'

const navItems = [
  { key: 'admin.nav.dashboard', to: '/admin',          Icon: LayoutDashboard, end: true },
  { key: 'admin.nav.pages',     to: '/admin/pages',    Icon: FileText },
  { key: 'admin.nav.posts',     to: '/admin/posts',    Icon: NotebookPen },
  { key: 'admin.nav.media',     to: '/admin/media',    Icon: Image },
  { key: 'admin.nav.settings',  to: '/admin/settings', Icon: Settings },
]

export default function AdminSidebar({ open, onClose }) {
  const { t } = useTranslation()

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed top-0 bottom-0 start-0 w-60 bg-primary text-white z-40',
          'flex flex-col transition-transform duration-300',
          'lg:!translate-x-0 lg:static lg:z-auto',
          open
            ? 'translate-x-0'
            : 'ltr:-translate-x-full rtl:translate-x-full',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-lg font-extrabold tracking-tight">
            {t('admin.brand')}
          </span>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(({ key, to, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => onClose()}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150',
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                ].join(' ')
              }
            >
              <Icon size={16} />
              {t(key)}
            </NavLink>
          ))}
        </nav>

        {/* Footer hint */}
        <div className="px-5 py-4 border-t border-white/10 text-xs text-white/40">
          {t('admin.version', { v: '1.0' })}
        </div>
      </aside>
    </>
  )
}
