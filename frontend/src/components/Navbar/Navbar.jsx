import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ dark, setDark }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={`navbar ${dark ? 'dark' : ''}`}>
      <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
        <img src="/logo.png" alt="Wanas ونس" className="logo-img" />
      </Link>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-right ${menuOpen ? 'menu-open' : ''}`}>
        <Link
          to="/login"
          className={`nav-link ${location.pathname === '/login' ? 'nav-link-active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`nav-link-accent ${location.pathname === '/register' ? 'nav-link-accent-active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Join
        </Link>

        {/* Dark / Light toggle */}
        <button
          className="theme-toggle"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle theme"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}