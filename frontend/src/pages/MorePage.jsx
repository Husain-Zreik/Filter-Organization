import { Info, Play, Mail, Shield, Eye, Users, CheckCircle, Search, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { howToSteps, policies } from '../data/mockData'

const policyIconMap = { Shield, Eye, Users }
const infoCardDefs = [
  { key: 'infoInstant', Icon: CheckCircle, color: 'text-[#2e7d32]' },
  { key: 'infoSources', Icon: Shield,      color: 'text-primary'   },
  { key: 'infoSearch',  Icon: Search,      color: 'text-accent'    },
  { key: 'infoShare',   Icon: Share2,      color: 'text-[#f9a825]' },
]

export default function MorePage() {
  const { t } = useTranslation()

  return (
    <div className="py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Hero info section */}
        <div className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: text */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-accent mb-4">
                <Info size={14} />
                <span>{t('more.badge')}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-primary leading-tight mb-4">{t('more.title')}</h1>
              <p className="text-sm text-secondary opacity-75 leading-relaxed mb-6">{t('more.body')}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="flex items-center gap-2 bg-primary text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-accent transition-all duration-200">
                  <Play size={14} />{t('more.tourBtn')}
                </button>
                <button className="flex items-center gap-2 border border-primary/30 text-primary font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200">
                  <Mail size={14} />{t('more.contactBtn')}
                </button>
              </div>
            </div>

            {/* Right: info cards grid */}
            <div className="bg-[#F7F9FB] p-6 flex items-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                {infoCardDefs.map(({ key, Icon, color }) => (
                  <div key={key} className="bg-white rounded-xl border border-[#00334a]/8 p-4 text-center shadow-sm">
                    <Icon size={22} className={`mx-auto mb-2 ${color}`} />
                    <p className="text-xs font-bold text-primary">{t(`more.${key}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How-to section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-xl font-extrabold text-primary mb-2">{t('more.howTitle')}</h2>
            <p className="text-sm text-secondary opacity-65">{t('more.howSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howToSteps.map((step) => (
              <div key={step.id} className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                <div className="overflow-hidden h-40 bg-[#E8EDF0]">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-extrabold text-accent/30">{step.step}</span>
                    <h3 className="font-bold text-primary text-sm">{step.title}</h3>
                  </div>
                  <p className="text-xs text-secondary opacity-70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policies section */}
        <div>
          <h2 className="text-lg font-extrabold text-primary mb-5 pb-3 border-b border-[#00334a]/8">
            {t('more.policiesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {policies.map((policy) => {
              const Icon = policyIconMap[policy.icon] ?? Shield
              return (
                <div key={policy.id} className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-6 hover:shadow-md transition-all duration-300">
                  <div className="p-3 bg-primary/8 rounded-xl w-fit mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-primary text-sm mb-2">{policy.title}</h3>
                  <p className="text-xs text-secondary opacity-70 leading-relaxed">{policy.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
