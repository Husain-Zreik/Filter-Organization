import { useState } from 'react'
import { Zap, Clock, Shield, TrendingUp, Heart, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import NewsCard from '../components/features/NewsCard'
import DetailModal from '../components/ui/DetailModal'
import { news, newsTicker, newsSummary } from '../data/mockData'

const tickerDotColor = {
  confirmed:  'bg-[#2e7d32]',
  false:      'bg-[#c62828]',
  unverified: 'bg-[#f9a825]',
}

const summaryIconMap = { TrendingUp, Heart, Shield, BookOpen }

export default function NewsPage() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)

  const featured = news.find((n) => n.isFeatured)
  const others   = news.filter((n) => !n.isFeatured)

  return (
    <div className="py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-primary mb-1">{t('news.pageTitle')}</h1>
          <p className="text-sm text-secondary opacity-65">{t('news.subtitle')}</p>
        </div>

        {/* Featured story — clickable */}
        {featured && (
          <div
            onClick={() => setSelected(featured)}
            className="relative rounded-2xl overflow-hidden mb-10 h-80 md:h-96 group cursor-pointer"
          >
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

            {/* Tags */}
            <div className="absolute top-4 end-4 flex gap-2 flex-wrap">
              {featured.tags?.map((tag) => (
                <span key={tag} className="text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 end-0 start-0 p-6">
              <div className="flex items-center gap-3 text-white/70 text-xs mb-3 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Zap size={12} className="text-accent" />
                  <span>{t('news.breaking')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{featured.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield size={12} />
                  <span>{t('news.official')}</span>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-2">
                {featured.title}
              </h2>
              <p className="text-sm text-white/75 leading-relaxed line-clamp-2 max-w-2xl">
                {featured.description}
              </p>
            </div>
          </div>
        )}

        {/* Main layout: news grid + ticker */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-8 mb-12">

          {/* News grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {others.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={() => setSelected(article)}
              />
            ))}
          </div>

          {/* News ticker */}
          <aside className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden">
            <div className="bg-primary text-white px-4 py-3">
              <h3 className="font-bold text-sm">{t('news.tickerTitle')}</h3>
            </div>
            <div className="p-4 divide-y divide-[#00334a]/6">
              {newsTicker.map((item) => (
                <div key={item.id} className="flex items-start gap-3 py-3">
                  <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${tickerDotColor[item.status] ?? 'bg-secondary'}`} />
                  <p className="text-xs text-secondary leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Quick summary section */}
        <div>
          <h2 className="text-lg font-extrabold text-primary mb-5">{t('news.summaryTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newsSummary.map((item) => {
              const Icon = summaryIconMap[item.icon] ?? Shield
              return (
                <div key={item.id} className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-4 text-center hover:shadow-md transition-all duration-300">
                  <Icon size={22} className={`mx-auto mb-2 ${item.color}`} />
                  <div className="text-xl font-extrabold text-primary">{item.count}</div>
                  <div className="text-xs text-secondary opacity-65 mt-1">
                    {t(`news.sectors.${item.sectorKey}`, { defaultValue: item.sectorKey })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <DetailModal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        item={selected}
        type="news"
      />
    </div>
  )
}
