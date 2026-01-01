import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../app/auth'
import { useNotification } from '../app/notification'
import { defaultRouteForRole } from '../app/routes'

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return `rounded px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
  }`
}

export function Navbar() {
  const { isAuthenticated, role, logout } = useAuth()
  const { show } = useNotification()
  const navigate = useNavigate()

  const homeHref = role ? defaultRouteForRole(role) : '/'

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to={homeHref} className="text-lg font-semibold text-gray-900">
          ShareBite
        </Link>

        {isAuthenticated ? (
          <nav className="flex items-center gap-1">
            {role === 'DONOR' ? (
              <>
                <NavLink to="/donor" className={navLinkClassName}>
                  Dashboard
                </NavLink>
                <NavLink to="/food/add" className={navLinkClassName}>
                  Add Food
                </NavLink>
                <NavLink to="/donations" className={navLinkClassName}>
                  My Donations
                </NavLink>
              </>
            ) : null}

            {role === 'RECIPIENT' ? (
              <>
                <NavLink to="/recipient" className={navLinkClassName}>
                  Dashboard
                </NavLink>
                <NavLink to="/food/browse" className={navLinkClassName}>
                  Browse Food
                </NavLink>
                <NavLink to="/requests" className={navLinkClassName}>
                  My Requests
                </NavLink>
              </>
            ) : null}

            {role === 'ADMIN' ? (
              <>
                <NavLink to="/admin" className={navLinkClassName}>
                  Dashboard
                </NavLink>
                <NavLink to="/food/browse" className={navLinkClassName}>
                  Browse Food
                </NavLink>
              </>
            ) : null}

            <button
              type="button"
              className="ml-2 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => {
                logout()
                show('Logged out', 'info')
                navigate('/login')
              }}
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-1">
            <NavLink to="/login" className={navLinkClassName}>
              Login
            </NavLink>
            <NavLink to="/" className={navLinkClassName}>
              Sign up
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  )
}
