import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './app/auth'
import { NotificationProvider } from './app/notification'
import { AppLayout } from './components/AppLayout'
import { PublicLayout } from './components/PublicLayout'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { RoleRedirect } from './routes/RoleRedirect'
import { AddFood } from './pages/AddFood'
import { AdminDashboard } from './pages/AdminDashboard'
import { BrowseFood } from './pages/BrowseFood'
import { DonorDashboard } from './pages/DonorDashboard'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { MyDonations } from './pages/MyDonations'
import { MyRequests } from './pages/MyRequests'
import { NotFound } from './pages/NotFound'
import { RecipientDashboard } from './pages/RecipientDashboard'
import { Register } from './pages/Register'
import { Unauthorized } from './pages/Unauthorized'

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register/:role" element={<Register />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
            </Route>

            {/* Any authenticated user */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/redirect" element={<RoleRedirect />} />
                <Route path="/food/browse" element={<BrowseFood />} />
              </Route>
            </Route>

            {/* Donor-only */}
            <Route element={<ProtectedRoute allowedRoles={['DONOR']} />}>
              <Route element={<AppLayout />}>
                <Route path="/donor" element={<DonorDashboard />} />
                <Route path="/food/add" element={<AddFood />} />
                <Route path="/donations" element={<MyDonations />} />
              </Route>
            </Route>

            {/* Recipient-only */}
            <Route element={<ProtectedRoute allowedRoles={['RECIPIENT']} />}>
              <Route element={<AppLayout />}>
                <Route path="/recipient" element={<RecipientDashboard />} />
                <Route path="/requests" element={<MyRequests />} />
              </Route>
            </Route>

            {/* Admin-only */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route element={<AppLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
            </Route>

            <Route element={<AppLayout />}>
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/404" element={<NotFound />} />
            </Route>

            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}
