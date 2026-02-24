import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Bell, Menu, X, SlidersHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../ui/LanguageSwitcher'

// Nav links use translation keys — labels resolved inside the component
const navLinks = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.rumors', href: '/rumors' },
  { key: 'nav.news', href: '/news' },
  { key: 'nav.reports', href: '/reports' },
  { key: 'nav.archive', href: '/archive' },
  { key: 'nav.team', href: '/team' },
  { key: 'nav.more', href: '/more' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#00334a]/8 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="/logo.webp" alt="فلتر" className="h-10 w-auto" />
          <span className="sr-only">فلتر</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link text-sm font-semibold transition-colors duration-200 pb-0.5 ${
                isActive(link.href)
                  ? 'text-accent active'
                  : 'text-primary hover:text-accent'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Filter tool shortcut */}
          <Link
            to="/filter"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-accent transition-colors duration-200"
          >
            <SlidersHorizontal size={14} />
            <span>{t('nav.filterTool')}</span>
          </Link>

          {/* Language switcher */}
          <LanguageSwitcher className="hidden sm:block" />

          {/* Search */}
          <button
            aria-label={t('nav.search')}
            className="p-2 text-secondary hover:text-accent rounded-lg hover:bg-[#F7F9FB] transition-colors duration-200"
          >
            <Search size={18} />
          </button>

          {/* Notifications */}
          <button
            aria-label={t('nav.notifications')}
            className="relative p-2 text-secondary hover:text-accent rounded-lg hover:bg-[#F7F9FB] transition-colors duration-200"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 left-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          {/* Mobile menu toggle */}
          <button
            aria-label={t('nav.menu')}
            className="lg:hidden p-2 text-secondary hover:text-accent rounded-lg hover:bg-[#F7F9FB] transition-colors duration-200"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#00334a]/8 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-semibold px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive(link.href)
                  ? 'bg-accent/10 text-accent'
                  : 'text-primary hover:bg-[#F7F9FB]'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link
            to="/filter"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-sm font-semibold bg-primary text-white px-3 py-2 rounded-lg hover:bg-accent transition-colors duration-200 mt-1"
          >
            <SlidersHorizontal size={14} />
            <span>{t('nav.filterToolFull')}</span>
          </Link>
          <div className="pt-2 border-t border-[#00334a]/8 mt-1">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
