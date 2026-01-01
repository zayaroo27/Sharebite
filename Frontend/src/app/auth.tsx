/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from 'react'
import type { Role } from '../types/auth'
import { clearSession, getRole, getToken, setRole, setToken } from '../services/storage'

type AuthContextValue = {
  token: string | null
  role: Role | null
  isAuthenticated: boolean
  login: (token: string, role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tokenState, setTokenState] = useState<string | null>(() => getToken())
  const [roleState, setRoleState] = useState<Role | null>(() => getRole())

  const value = useMemo<AuthContextValue>(() => {
    return {
      token: tokenState,
      role: roleState,
      isAuthenticated: Boolean(tokenState && roleState),
      login: (token, role) => {
        setToken(token)
        setRole(role)
        setTokenState(token)
        setRoleState(role)
      },
      logout: () => {
        clearSession()
        setTokenState(null)
        setRoleState(null)
      },
    }
  }, [tokenState, roleState])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
