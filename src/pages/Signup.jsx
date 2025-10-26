import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../styles/auth.css'
import * as auth from '../services/auth'
import { useNotification } from '../context/NotificationContext'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const { show } = useNotification()

  function validate() {
    const e = {}
    if (!name) e.name = 'Name is required'
    if (!email) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email'
    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Password must be >= 6 characters'
    if (password !== confirm) e.confirm = 'Passwords do not match'
    return e
  }

  async function submit(e) {
    e.preventDefault()
    const eobj = validate()
    setErrors(eobj)
    if (Object.keys(eobj).length) return
    try {
  await auth.signup({ name, email, password })
  show('Account created — logged in')
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
        <h2>Create account</h2>
        {errors.form && <div className="auth-error">{errors.form}</div>}

        <label>
          Full name
          <input value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </label>

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

        <label>
          Confirm password
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" />
          {errors.confirm && <div className="field-error">{errors.confirm}</div>}
        </label>

        <div className="auth-actions">
          <button className="btn primary" type="submit">Create account</button>
          <Link to="/auth/login" className="btn ghost">Login</Link>
        </div>
      </form>
    </main>
  )
}
