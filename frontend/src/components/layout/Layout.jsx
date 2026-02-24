import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { i18n } = useTranslation()

  // Single source of truth for RTL/LTR.
  // Syncs <html dir> and <html lang> on every language change.
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
