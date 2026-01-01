import { Link } from 'react-router-dom'

export function Unauthorized() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Unauthorized</h1>
      <p className="mt-2 text-gray-700">You don’t have access to this page.</p>
      <p className="mt-4">
        <Link className="text-sm font-medium text-gray-900 underline" to="/">
          Go to home
        </Link>
      </p>
    </div>
  )
}
