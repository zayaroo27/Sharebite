import type { Role } from '../types/auth'

const TOKEN_KEY = 'sharebite_token'
const ROLE_KEY = 'sharebite_role'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getRole(): Role | null {
  const value = localStorage.getItem(ROLE_KEY)
  if (value === 'DONOR' || value === 'RECIPIENT' || value === 'ADMIN') return value
  return null
}

export function setRole(role: Role): void {
  localStorage.setItem(ROLE_KEY, role)
}

export function clearRole(): void {
  localStorage.removeItem(ROLE_KEY)
}

export function clearSession(): void {
  clearToken()
  clearRole()
}
