import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../app/auth'
import { defaultRouteForRole } from '../app/routes'

export function Home() {
  const { isAuthenticated, role } = useAuth()

  // If the user is already logged in, keep the existing role-based redirect behavior.
  if (isAuthenticated && role) return <Navigate to={defaultRouteForRole(role)} replace />

  // Public landing page: the user chooses a role *before* seeing the registration form.
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-lg border border-gray-200 bg-white p-6 sm:p-10">
        <h1 className="text-3xl font-semibold text-gray-900">ShareBite</h1>
        <p className="mt-2 text-sm text-gray-600">
          Choose how you want to use ShareBite. Your role is selected here and will be fixed during signup.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            to="/register/donor"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Sign up to Donate
          </Link>

          <Link
            to="/register/recipient"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Sign up to Receive
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link className="font-medium text-gray-900 underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
