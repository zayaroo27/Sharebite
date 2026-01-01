import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import type { Role } from '../types/auth'
import { useNotification } from '../app/notification'
import * as authService from '../services/authService'

function roleFromInput(raw: string | undefined): Role | null {
  if (!raw) return null
  const normalized = raw.trim().toLowerCase()

  // Public registration must never allow ADMIN.
  if (normalized === 'admin') return null

  // Allow friendly URLs like /register/donor and /register/recipient
  if (normalized === 'donor' || normalized === 'donate') return 'DONOR'
  if (normalized === 'recipient' || normalized === 'receive') return 'RECIPIENT'

  return null
}

export function Register() {
  const navigate = useNavigate()
  const { show } = useNotification()
  const { role: roleParam } = useParams<{ role?: string }>()
  const location = useLocation()
  const roleFromState = (location.state as { role?: string } | undefined)?.role

  // Role is chosen *before* registration (landing page) and is not editable in the form.
  const registrationRole = useMemo(() => roleFromInput(roleParam ?? roleFromState), [roleParam, roleFromState])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // If someone navigates directly to /register (or tries /register/admin), send them back.
  if (!registrationRole) return <Navigate to="/" replace />

  // After the guard above, this is guaranteed to be a real Role.
  const fixedRole: Role = registrationRole

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await authService.register({ name, email, password, role: fixedRole })
      show('Registration successful. Please login.', 'success')
      navigate('/login')
    } catch {
      show('Registration failed. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-2xl font-semibold text-gray-900">
        {registrationRole === 'DONOR' ? 'Donor Registration' : 'Recipient Registration'}
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Create your ShareBite account. Your role is already selected and cannot be changed here.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-400 focus:outline-none"
            placeholder="Your name"
            required
          />
        </div>

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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link className="font-medium text-gray-900 underline" to="/login">
          Login
        </Link>
      </p>

      <p className="mt-3 text-sm text-gray-600">
        Picked the wrong option?{' '}
        <Link className="font-medium text-gray-900 underline" to="/">
          Go back
        </Link>
      </p>
    </div>
  )
}
