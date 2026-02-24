import { CheckCircle, XCircle, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const styleConfig = {
  confirmed:  { Icon: CheckCircle, bg: 'bg-[#2e7d32]/10', text: 'text-[#2e7d32]' },
  false:      { Icon: XCircle,     bg: 'bg-[#c62828]/10', text: 'text-[#c62828]' },
  unverified: { Icon: Clock,       bg: 'bg-[#f9a825]/10', text: 'text-[#f9a825]' },
}

/**
 * @param {{ status: 'confirmed' | 'false' | 'unverified', size?: 'sm' | 'md' }} props
 */
export default function StatusBadge({ status, size = 'sm' }) {
  const { t } = useTranslation()
  const { Icon, bg, text } = styleConfig[status] ?? styleConfig.unverified
  const label = t(`status.${status}`, { defaultValue: status })
  const sizeClasses = size === 'md'
    ? 'text-xs px-3 py-1.5 gap-1.5'
    : 'text-[11px] px-2.5 py-1 gap-1'

  return (
    <span className={`inline-flex items-center rounded-full font-bold ${sizeClasses} ${bg} ${text}`}>
      <Icon size={size === 'md' ? 13 : 11} />
      {label}
    </span>
  )
}
