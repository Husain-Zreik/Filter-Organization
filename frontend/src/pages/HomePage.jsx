import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SlidersHorizontal, ArrowLeft, Info, Lock, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ContentCard from '../components/features/ContentCard'
import DetailModal from '../components/ui/DetailModal'
import { SkeletonCard } from '../components/ui/Skeleton'
import { quickLinks } from '../data/mockData'
import { useAdminData } from '../admin/context/AdminDataContext'

const quickLinkIcons = { Info, Lock, Mail }

export default function HomePage() {
  const { t } = useTranslation()
  const { rumors, news, reports } = useAdminData()
  const [selected, setSelected] = useState(null)

  // Build homepage cards from live context data (first items of each type)
  const homepageCards = [
    rumors[0]  ? { id: 'r1',  ...rumors[0],  type: 'rumor',  href: '/rumors'  } : null,
    news[1]    ? { id: 'n1',  ...news[1],    type: 'news',   href: '/news',   status: undefined } : null,
    reports[1] ? { id: 'rp1', ...reports[1], type: 'report', href: '/reports', status: undefined } : null,
    rumors[2]  ? { id: 'r2',  ...rumors[2],  type: 'rumor',  href: '/rumors'  } : null,
    news[2]    ? { id: 'n2',  ...news[2],    type: 'news',   href: '/news',   status: undefined } : null,
    reports[0] ? { id: 'rp2', ...reports[0], type: 'report', href: '/reports', status: undefined } : null,
  ].filter(Boolean)

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            {t('home.badge')}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            {t('home.titleLine1')}
            <br />
            <span className="text-accent">{t('home.titleLine2')}</span>
          </h1>

          <p className="text-base md:text-lg opacity-75 max-w-xl mx-auto mb-10 leading-relaxed">
            {t('home.subtitle')}
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              to="/filter"
              className="flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-primary transition-all duration-200"
            >
              <SlidersHorizontal size={16} />
              {t('home.cta')}
            </Link>
            <Link
              to="/more"
              className="flex items-center gap-2 border border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              {t('home.ctaSecondary')}
              <ArrowLeft size={16} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14 max-w-sm mx-auto md:max-w-md">
            {[
              { value: rumors.length || t('home.stat1Value'), label: t('home.stat1Label') },
              { value: t('home.stat2Value'),                  label: t('home.stat2Label') },
              { value: t('home.stat3Value'),                  label: t('home.stat3Label') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-accent">{stat.value}</div>
                <div className="text-xs opacity-60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Content ────────────────────────────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-primary">{t('home.latestTitle')}</h2>
              <p className="text-xs text-secondary opacity-60 mt-1">{t('home.latestSubtitle')}</p>
            </div>
            <Link
              to="/filter"
              className="flex items-center gap-1.5 text-xs font-bold text-accent hover:text-primary transition-colors duration-200"
            >
              <span>{t('common.viewAll')}</span>
              <ArrowLeft size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homepageCards.map((item) => (
              <ContentCard key={item.id} item={item} onClick={() => setSelected(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Links ───────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-[#F7F9FB]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-lg font-extrabold text-primary mb-6">{t('home.quickLinksTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {quickLinks.map((link) => {
              const Icon = quickLinkIcons[link.icon] ?? Info
              return (
                <Link
                  key={link.id}
                  to={link.href}
                  className="group bg-white rounded-2xl border border-[#00334a]/8 shadow-sm hover:shadow-md p-5 flex items-start gap-4 transition-all duration-300"
                >
                  <div className="p-2.5 bg-primary/8 rounded-xl text-primary group-hover:bg-accent group-hover:text-white transition-all duration-200 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm mb-1 group-hover:text-accent transition-colors duration-200">
                      {link.title}
                    </h3>
                    <p className="text-xs text-secondary opacity-70 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <DetailModal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        item={selected}
        type={selected?.type ?? 'rumor'}
      />
    </div>
  )
}
