import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const { t }        = useTranslation()
  const { login }    = useAuth()
  const navigate     = useNavigate()
  const location     = useLocation()
  const from         = location.state?.from?.pathname || '/admin'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPwd,  setShowPwd]  = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Logo / Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto">
            <Lock size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary mt-3">
            {t('admin.login.title', 'Admin Login')}
          </h1>
          <p className="text-sm text-secondary/60">
            {t('admin.login.subtitle', 'Sign in to access the dashboard')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-secondary mb-1.5">
              {t('admin.login.email', 'Email')}
            </label>
            <div className="relative">
              <Mail size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary/40 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@filter.org"
                className="w-full ps-9 pe-4 py-2.5 text-sm rounded-xl border border-[#00334a]/15 bg-[#F7F9FB] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-secondary mb-1.5">
              {t('admin.login.password', 'Password')}
            </label>
            <div className="relative">
              <Lock size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary/40 pointer-events-none" />
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full ps-9 pe-10 py-2.5 text-sm rounded-xl border border-[#00334a]/15 bg-[#F7F9FB] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-secondary transition-colors"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-accent transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? t('admin.login.signingIn', 'Signing in…') : t('admin.login.signIn', 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  )
}
