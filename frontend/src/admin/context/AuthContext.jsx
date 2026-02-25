import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => {
    try { return JSON.parse(localStorage.getItem('auth_user')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  // If we have a token but no user in memory, re-fetch user info
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token && !user) {
      authApi.me()
        .then((r) => setUser(r.data.data))
        .catch(() => {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
        })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const res = await authApi.login(email, password)
      const { token, user: u } = res.data.data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(u))
      setUser(u)
      window.dispatchEvent(new Event('auth-changed'))
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed'
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch { /* ignore */ }
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setUser(null)
    window.dispatchEvent(new Event('auth-changed'))
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
