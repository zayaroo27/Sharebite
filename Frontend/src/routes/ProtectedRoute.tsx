import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../app/auth'
import type { Role } from '../types/auth'

export function ProtectedRoute({ allowedRoles }: { allowedRoles?: Role[] }) {
  const { isAuthenticated, role } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
