import { useState } from 'react'
import { SlidersHorizontal, RotateCcw, Info, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import ContentCard from '../components/features/ContentCard'
import DetailModal from '../components/ui/DetailModal'
import { rumors, news, reports } from '../data/mockData'

const allContent = [
  ...rumors.map((r) => ({ ...r, type: 'rumor',  href: '/rumors'  })),
  ...news.map((n)   => ({ ...n, type: 'news',   href: '/news',   status: undefined })),
  ...reports.map((r)=> ({ ...r, type: 'report', href: '/reports', status: undefined })),
]

const initialFilters = { type: '', status: '', category: '', date: '' }

function SelectField({ name, label, options, value, onChange }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-secondary opacity-80">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full appearance-none bg-[#F7F9FB] border border-[#00334a]/15 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent transition-colors duration-200 pr-10"
        >
          <option value="">{t('common.all')}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary opacity-50 pointer-events-none" />
      </div>
    </div>
  )
}

export default function FilterToolPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState(initialFilters)
  const [applied, setApplied] = useState(false)
  const [selected, setSelected] = useState(null)

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setApplied(false)
  }
  const handleApply = () => setApplied(true)
  const handleReset = () => { setFilters(initialFilters); setApplied(false) }

  const filtered = applied
    ? allContent.filter((item) => {
        if (filters.type     && item.type     !== filters.type)     return false
        if (filters.status   && item.status   !== filters.status)   return false
        if (filters.category && item.category !== filters.category) return false
        return true
      })
    : allContent.slice(0, 3)

  return (
    <div className="py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-primary rounded-xl text-white">
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-primary">{t('filter.title')}</h1>
            <p className="text-xs text-secondary opacity-65 mt-0.5">{t('filter.subtitle')}</p>
          </div>
        </div>

        {/* Filter card */}
        <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <SelectField
              name="type" label={t('filter.typeLabel')} value={filters.type} onChange={handleChange}
              options={[
                { value: 'rumor',  label: t('filter.types.rumor')  },
                { value: 'news',   label: t('filter.types.news')   },
                { value: 'report', label: t('filter.types.report') },
              ]}
            />
            <SelectField
              name="status" label={t('filter.statusLabel')} value={filters.status} onChange={handleChange}
              options={[
                { value: 'confirmed',  label: t('status.confirmed')  },
                { value: 'false',      label: t('status.false')      },
                { value: 'unverified', label: t('status.unverified') },
              ]}
            />
            <SelectField
              name="category" label={t('filter.categoryLabel')} value={filters.category} onChange={handleChange}
              options={[
                { value: 'health',    label: t('categories.health')    },
                { value: 'security',  label: t('categories.security')  },
                { value: 'economy',   label: t('categories.economy')   },
                { value: 'education', label: t('categories.education') },
              ]}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-secondary opacity-80">{t('filter.dateLabel')}</label>
              <input
                type="date" name="date" value={filters.date} onChange={handleChange}
                className="w-full bg-[#F7F9FB] border border-[#00334a]/15 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:border-accent transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button variant="primary" size="md" onClick={handleApply}>
              <SlidersHorizontal size={15} />{t('filter.applyBtn')}
            </Button>
            <Button variant="secondary" size="md" onClick={handleReset}>
              <RotateCcw size={15} />{t('common.reset')}
            </Button>
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2 bg-accent/8 border border-accent/20 rounded-xl px-4 py-3 mb-8 text-sm text-primary">
          <Info size={16} className="text-accent mt-0.5 shrink-0" />
          <span>{applied ? t('filter.results', { count: filtered.length }) : t('filter.hint')}</span>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <ContentCard
                key={`${item.type}-${item.id}`}
                item={item}
                onClick={() => setSelected(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-secondary opacity-50">
            <SlidersHorizontal size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">{t('filter.noResultsTitle')}</p>
            <p className="text-xs mt-1">{t('filter.noResultsHint')}</p>
          </div>
        )}
      </div>

      <DetailModal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        item={selected}
        type={selected?.type ?? 'rumor'}
      />
    </div>
  )
}
