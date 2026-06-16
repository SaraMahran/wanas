import { useState } from 'react'
import { register, login, logout, getMe } from './services/auth'

function App() {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  const handleRegister = async () => {
    try {
      await register('testuser', 'test@test.com', '12345678')
      setMessage('Registered successfully')
    } catch (err) {
      setMessage(err.response?.data?.username?.[0] || 'Register failed')
    }
  }

  const handleLogin = async () => {
    try {
      await login('testuser', '12345678')
      setMessage('Logged in successfully')
    } catch (err) {
      setMessage('Login failed')
    }
  }

  const handleMe = async () => {
    try {
      const data = await getMe()
      setUser(data)
      setMessage('Got user profile')
    } catch (err) {
      setMessage('Not authenticated')
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      setMessage('Logged out')
    } catch (err) {
      setMessage('Logout failed')
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Wanas ونس — Connection Test</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleMe}>Get My Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {message && <p style={{ color: 'green' }}><strong>{message}</strong></p>}

      {user && (
        <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  )
}

export default App