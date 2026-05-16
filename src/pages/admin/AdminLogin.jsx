// ============================================================
//  🔑 ADMIN LOGIN PAGE — src/pages/admin/AdminLogin.jsx
// ============================================================

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiLock, FiMail, FiAlertCircle, FiArrowLeft, FiLoader } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import './AdminLogin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      console.error(err)
      setError('Invalid credentials. Check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🔐</div>
          <h1>Admin Access</h1>
          <p>Sign in to manage your portfolio</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            id="btn-login-submit"
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading ? (
              <>
                <FiLoader className="spin" />
                Signing in…
              </>
            ) : (
              <>
                <FiLock />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="login-back">
          <Link to="/">
            <FiArrowLeft />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
