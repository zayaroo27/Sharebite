import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Notification } from './Notification'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <Notification />
      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}
