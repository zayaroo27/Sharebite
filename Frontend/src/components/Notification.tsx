import { useEffect } from 'react'
import { useNotification } from '../app/notification'

export function Notification() {
  const { notification, clear } = useNotification()

  useEffect(() => {
    if (!notification) return
    const id = window.setTimeout(() => clear(), 3500)
    return () => window.clearTimeout(id)
  }, [notification, clear])

  if (!notification) return null

  const styles =
    notification.kind === 'success'
      ? 'bg-green-50 text-green-800 border-green-200'
      : notification.kind === 'error'
        ? 'bg-red-50 text-red-800 border-red-200'
        : 'bg-blue-50 text-blue-800 border-blue-200'

  return (
    <div className="fixed left-1/2 top-4 z-50 w-[min(92vw,520px)] -translate-x-1/2">
      <div className={`rounded-md border px-4 py-3 text-sm shadow-sm ${styles}`}>
        <div className="flex items-start justify-between gap-3">
          <p className="leading-5">{notification.message}</p>
          <button
            type="button"
            onClick={clear}
            className="rounded px-2 py-1 text-xs font-medium hover:bg-black/5"
            aria-label="Dismiss notification"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
