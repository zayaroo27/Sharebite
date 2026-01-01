import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
      <p className="mt-2 text-gray-700">The page you’re looking for doesn’t exist.</p>
      <p className="mt-4">
        <Link className="text-sm font-medium text-gray-900 underline" to="/">
          Go to home
        </Link>
      </p>
    </div>
  )
}
