import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Role } from '../types/auth'
import { useAuth } from '../app/auth'
import { useNotification } from '../app/notification'
import { defaultRouteForRole } from '../app/routes'
import * as authService from '../services/authService'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { show } = useNotification()

  const demoMode = useMemo(() => !import.meta.env.VITE_API_BASE_URL, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [roleHint, setRoleHint] = useState<Role>('DONOR')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const session = await authService.login({ email, password, roleHint })
      login(session.token, session.user.role)

      show('Login successful', 'success')
      navigate(defaultRouteForRole(session.user.role), { replace: true })
    } catch {
      show('Login failed. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
      <p className="mt-1 text-sm text-gray-600">Welcome back to ShareBite.</p>

      {demoMode ? (
        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Demo mode: backend not configured (set `VITE_API_BASE_URL` later).
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={roleHint}
            onChange={(e) => setRoleHint(e.target.value as Role)}
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
          >
            <option value="DONOR">DONOR</option>
            <option value="RECIPIENT">RECIPIENT</option>
            
          </select>
          <p className="mt-1 text-xs text-gray-500">Used for demo mode until backend login is connected.</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link className="font-medium text-gray-900 underline" to="/">
          Choose your role to sign up
        </Link>
      </p>
    </div>
  )
}
