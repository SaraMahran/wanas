import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ dark, setDark }) {
  return (
    <nav className={`navbar ${dark ? 'dark' : ''}`}>
      <Link to="/" className="navbar-logo">
        <img src="/logo.png" alt="Wanas ونس" className="logo-img" />
      </Link>

      <div className="navbar-right">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link nav-link-accent">Join</Link>

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