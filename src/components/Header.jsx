import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as auth from '../services/auth'
import { useNotification } from '../context/NotificationContext'
import '../styles/header.css'

export default function Header() {
  const navigate = useNavigate()
  const { show } = useNotification()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    auth.logout()
    show('Logged out')
    navigate('/')
  }

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <div className="brand">
          <Link to="/" className="no-deco-link brand-link" aria-label="TicketFlow home">
            {/* small inline SVG logo for crisp scaling */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2" y="6" width="20" height="12" rx="2" fill="#0ea5e9" />
              <path d="M6 9h6v6H6z" fill="#04263b" />
            </svg>
            <span className="brand-text">TicketFlow</span>
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-controls="main-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span className="hamburger" aria-hidden="true"></span>
        </button>

        <nav id="main-nav" className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <ul className="nav-list">
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Tickets</Link></li>
          </ul>

          <div className="nav-actions">
            {auth.isAuthenticated() ? (
              <button onClick={() => { setMenuOpen(false); handleLogout() }} className="btn ghost">Logout</button>
            ) : (
              <>
                <Link to="/auth/login" className="btn-link" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/auth/signup" className="btn primary" onClick={() => setMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
