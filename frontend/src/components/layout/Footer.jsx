import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  // Page + tool links use translation keys
  const pageLinks = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.rumors', href: '/rumors' },
    { key: 'nav.news', href: '/news' },
    { key: 'nav.reports', href: '/reports' },
    { key: 'nav.archive', href: '/archive' },
    { key: 'nav.team', href: '/team' },
    { key: 'nav.more', href: '/more' },
  ]

  const toolLinks = [
    { key: 'nav.filterTool', href: '/filter' },
    { key: 'nav.reports', href: '/reports' },
    { key: 'nav.archive', href: '/archive' },
  ]

  return (
    <footer className="bg-[#F7F9FB] border-t border-[#00334a]/8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img src="/logo.webp" alt="فلتر" className="h-10 w-auto mb-3" />
            </Link>
            <p className="text-sm text-secondary leading-relaxed opacity-80">
              {t('footer.description')}
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-bold text-primary text-sm mb-4">{t('footer.pages')}</h4>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary hover:text-accent transition-colors duration-200 opacity-80 hover:opacity-100"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold text-primary text-sm mb-4">{t('footer.tools')}</h4>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-secondary hover:text-accent transition-colors duration-200 opacity-80 hover:opacity-100"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-primary text-sm mb-4">{t('footer.newsletter')}</h4>
            <p className="text-xs text-secondary opacity-75 mb-3 leading-relaxed">
              {t('footer.newsletterDesc')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="flex-1 text-xs border border-[#00334a]/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-accent transition-colors duration-200"
              />
              <button
                aria-label={t('footer.subscribe')}
                className="bg-primary hover:bg-accent text-white p-2 rounded-lg transition-colors duration-200 shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#00334a]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary opacity-60">
          <span>{t('footer.copyright')}</span>
          <div className="flex items-center gap-4">
            <Link to="/more" className="hover:text-accent transition-colors duration-200">
              {t('footer.privacy')}
            </Link>
            <span>•</span>
            <Link to="/more" className="hover:text-accent transition-colors duration-200">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
