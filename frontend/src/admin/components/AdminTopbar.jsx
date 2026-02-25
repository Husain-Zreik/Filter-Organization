import { Menu, Bell, LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../components/ui/LanguageSwitcher'
import { useAuth } from '../context/AuthContext'

export default function AdminTopbar({ onMenuToggle }) {
  const { t }            = useTranslation()
  const { user, logout } = useAuth()

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'A'

  return (
    <header className="h-14 bg-white border-b border-[#00334a]/8 flex items-center justify-between px-4 shrink-0">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-secondary hover:bg-[#F7F9FB] transition-colors"
        >
          <Menu size={18} />
        </button>
        <span className="text-sm font-semibold text-primary hidden sm:block">
          {t('admin.topbar.title')}
        </span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <LanguageSwitcher className="!text-xs !px-3 !py-1.5" />

        <button className="relative p-2 rounded-lg text-secondary hover:bg-[#F7F9FB] transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 end-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <div className="flex items-center gap-2 ps-2 border-s border-[#00334a]/8 ms-1">
          <div className="h-7 w-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
            {initials}
          </div>
          <span className="text-xs font-semibold text-primary hidden sm:block">
            {user?.name || t('admin.topbar.admin')}
          </span>
          <button
            onClick={logout}
            title={t('admin.logout', 'Logout')}
            className="p-1.5 rounded-lg text-secondary hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </header>
  )
}
