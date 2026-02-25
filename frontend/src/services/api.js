import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json' },
})

// Inject auth token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      window.dispatchEvent(new Event('auth-changed'))
    }
    return Promise.reject(err)
  }
)

export default api

// ── Auth ──────────────────────────────────────────────────────
export const authApi = {
  login:  (email, password) => api.post('/auth/login', { email, password }),
  logout: ()                => api.post('/auth/logout'),
  me:     ()                => api.get('/auth/me'),
}

// ── Rumors ────────────────────────────────────────────────────
export const rumorsApi = {
  list:    (params) => api.get('/rumors', { params }),
  show:    (id)     => api.get(`/rumors/${id}`),
  create:  (fd)     => api.post('/rumors', fd),
  update:  (id, fd) => api.post(`/rumors/${id}`, fd),  // POST with _method=PUT
  destroy: (id)     => api.delete(`/rumors/${id}`),
}

// ── News ──────────────────────────────────────────────────────
export const newsApi = {
  list:    (params) => api.get('/news', { params }),
  show:    (id)     => api.get(`/news/${id}`),
  create:  (fd)     => api.post('/news', fd),
  update:  (id, fd) => api.post(`/news/${id}`, fd),
  destroy: (id)     => api.delete(`/news/${id}`),
}

// ── Reports ───────────────────────────────────────────────────
export const reportsApi = {
  list:    (params) => api.get('/reports', { params }),
  show:    (id)     => api.get(`/reports/${id}`),
  create:  (fd)     => api.post('/reports', fd),
  update:  (id, fd) => api.post(`/reports/${id}`, fd),
  destroy: (id)     => api.delete(`/reports/${id}`),
}

// ── Team ──────────────────────────────────────────────────────
export const teamApi = {
  list:    (params) => api.get('/team', { params }),
  show:    (id)     => api.get(`/team/${id}`),
  create:  (fd)     => api.post('/team', fd),
  update:  (id, fd) => api.post(`/team/${id}`, fd),
  destroy: (id)     => api.delete(`/team/${id}`),
}

// ── Pages ─────────────────────────────────────────────────────
export const pagesApi = {
  list:    (params)   => api.get('/pages', { params }),
  show:    (id)       => api.get(`/pages/${id}`),
  create:  (data)     => api.post('/pages', data),
  update:  (id, data) => api.put(`/pages/${id}`, data),
  destroy: (id)       => api.delete(`/pages/${id}`),
}

// ── Posts ─────────────────────────────────────────────────────
export const postsApi = {
  list:    (params)   => api.get('/posts', { params }),
  show:    (id)       => api.get(`/posts/${id}`),
  create:  (data)     => api.post('/posts', data),
  update:  (id, data) => api.put(`/posts/${id}`, data),
  destroy: (id)       => api.delete(`/posts/${id}`),
}

// ── Media ─────────────────────────────────────────────────────
export const mediaApi = {
  list:    (params) => api.get('/media', { params }),
  show:    (id)     => api.get(`/media/${id}`),
  upload:  (fd)     => api.post('/media', fd),
  destroy: (id)     => api.delete(`/media/${id}`),
}

// ── Settings ──────────────────────────────────────────────────
export const settingsApi = {
  list:    (params)   => api.get('/settings', { params }),
  create:  (data)     => api.post('/settings', data),
  upsert:  (id, data) => api.put(`/settings/${id}`, data),
  destroy: (id)       => api.delete(`/settings/${id}`),
}

// ── Dashboard ─────────────────────────────────────────────────
export const dashboardApi = {
  stats: () => api.get('/dashboard'),
}
