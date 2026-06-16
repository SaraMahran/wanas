import api from './api'

export const register = async (username, email, password) => {
  const res = await api.post('/api/register/', { username, email, password })
  return res.data
}

export const login = async (username, password) => {
  const res = await api.post('/api/token/', { username, password })
  // Store tokens in localStorage
  localStorage.setItem('access_token', res.data.access)
  localStorage.setItem('refresh_token', res.data.refresh)
  return res.data
}

export const logout = async () => {
  const refresh = localStorage.getItem('refresh_token')
  await api.post('/api/logout/', { refresh })
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const getMe = async () => {
  const res = await api.get('/api/me/')
  return res.data
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('access_token')
}