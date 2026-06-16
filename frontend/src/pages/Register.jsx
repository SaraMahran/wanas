import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register, login } from '../services/auth'
import './AuthForm.css'

export default function Register({ dark }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(form.username, form.email, form.password)
      await login(form.username, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Registration failed')
    }
  }

  return (
    <main className={`auth-page ${dark ? 'dark' : ''}`}>
      <div className="auth-card">
        <h1 className="auth-title">Join Wanas</h1>
        <p className="auth-sub">Create your account to save and discover quotes</p>

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
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password (min 8 characters)"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <button className="auth-btn" type="submit">Create account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  )
}