import { Navigate } from 'react-router-dom'
import { useAuth } from '../app/auth'
import { defaultRouteForRole } from '../app/routes'

export function RoleRedirect() {
  const { role } = useAuth()
  if (!role) return <Navigate to="/login" replace />
  return <Navigate to={defaultRouteForRole(role)} replace />
}
