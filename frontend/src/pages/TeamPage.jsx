import { Users, UserPlus, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TeamCard from '../components/features/TeamCard'
import { teamMembers } from '../data/mockData'

export default function TeamPage() {
  const { t } = useTranslation()

  return (
    <div className="py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Page intro */}
        <div className="bg-primary text-white rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="p-3 bg-white/10 rounded-xl">
              <Users size={28} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold mb-2">{t('team.pageTitle')}</h1>
              <p className="text-sm opacity-75 leading-relaxed max-w-xl">{t('team.subtitle')}</p>
              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <button className="flex items-center gap-2 bg-accent text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-white hover:text-primary transition-all duration-200">
                  <UserPlus size={15} />{t('team.joinBtn')}
                </button>
                <button className="flex items-center gap-2 border border-white/30 text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <Mail size={15} />{t('team.contactBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Team stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: teamMembers.length,        label: t('team.statMembersLabel')  },
            { value: t('team.statReportsValue'), label: t('team.statReportsLabel') },
            { value: t('team.statCheckedValue'), label: t('team.statCheckedLabel') },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-[#00334a]/8 shadow-sm p-4 text-center">
              <div className="text-2xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-xs text-secondary opacity-60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team grid */}
        <div>
          <h2 className="text-base font-bold text-primary mb-5 pb-3 border-b border-[#00334a]/8">
            {t('team.membersTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
