import api from './api'

// Register new user
export const register = async (username, email, password) => {
  const res = await api.post('/api/register/', { username, email, password })
  return res.data
}

// Login and store tokens in localStorage
export const login = async (username, password) => {
  const res = await api.post('/api/token/', { username, password })
  localStorage.setItem('access_token', res.data.access)
  localStorage.setItem('refresh_token', res.data.refresh)
  return res.data
}

// Blacklist refresh token on server then clear localStorage
export const logout = async () => {
  const refresh = localStorage.getItem('refresh_token')
  await api.post('/api/logout/', { refresh })
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

// Get current logged-in user profile
export const getMe = async () => {
  const res = await api.get('/api/me/')
  return res.data
}

// Check if user is logged in by checking for access token
export const isLoggedIn = () => {
  return !!localStorage.getItem('access_token')
}