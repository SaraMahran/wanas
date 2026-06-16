import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/auth'
import './AuthForm.css'

export default function Login({ dark }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form.username, form.password)
      navigate('/')
    } catch {
      setError('Invalid username or password')
    }
  }

  return (
    <main className={`auth-page ${dark ? 'dark' : ''}`}>
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your Wanas account</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <button className="auth-btn" type="submit">Sign in</button>
        </form>

        <p className="auth-switch">
          No account? <Link to="/register">Join Wanas</Link>
        </p>
      </div>
    </main>
  )
}