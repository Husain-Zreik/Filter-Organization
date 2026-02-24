import { useTranslation } from 'react-i18next'

/**
 * Toggles between Arabic (RTL) and English (LTR).
 * Updates document dir + lang via the Layout effect — nothing extra needed here.
 */
export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  return (
    <button
      onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
      className={`text-xs font-bold border border-primary/20 px-2.5 py-1.5 rounded-lg
        text-primary hover:bg-primary hover:text-white transition-colors duration-200 ${className}`}
      aria-label="Switch language"
    >
      {isArabic ? 'EN' : 'AR'}
    </button>
  )
}
