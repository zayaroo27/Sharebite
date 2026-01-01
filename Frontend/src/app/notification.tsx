/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type NotificationKind = 'success' | 'error' | 'info'

export type NotificationState = {
  kind: NotificationKind
  message: string
} | null

type NotificationContextValue = {
  notification: NotificationState
  show: (message: string, kind?: NotificationKind) => void
  clear: () => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<NotificationState>(null)

  const clear = useCallback(() => setNotification(null), [])
  const show = useCallback((message: string, kind: NotificationKind = 'info') => {
    setNotification({ message, kind })
  }, [])

  const value = useMemo(() => ({ notification, show, clear }), [notification, show, clear])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotification(): NotificationContextValue {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider')
  return ctx
}
