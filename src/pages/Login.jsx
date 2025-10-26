import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../styles/auth.css'
import * as auth from '../services/auth'
import { useNotification } from '../context/NotificationContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const { show } = useNotification()

  React.useEffect(() => {
    if (location.state?.from) {
      show('Please log in to continue')
    }
  }, [])

  function validate() {
    const e = {}
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  async function submit(e) {
    e.preventDefault()
    const eobj = validate()
    setErrors(eobj)
    if (Object.keys(eobj).length) return
    try {
  await auth.login({ email, password })
  show('Login successful')
  const dest = location.state?.from?.pathname || '/dashboard'
  navigate(dest, { replace: true })
    } catch (err) {
      setErrors({ form: err.message })
      show(err.message)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit} noValidate>
        <h2>Login</h2>
        {errors.form && <div className="auth-error">{errors.form}</div>}

        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </label>

        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          {errors.password && <div className="field-error">{errors.password}</div>}
        </label>

        <div className="auth-actions">
          <button className="btn primary" type="submit">Login</button>
          <Link to="/auth/signup" className="btn ghost">Sign up</Link>
        </div>
      </form>
    </main>
  )
}
