import type { AuthSession, Role } from '../types/auth'
import { apiFetch } from './api'

export type LoginInput = {
  email: string
  password: string
  // Used for demo-only mode until backend exists
  roleHint?: Role
}

export type RegisterInput = {
  name: string
  email: string
  password: string
  role: Role
}

export async function login(input: LoginInput): Promise<AuthSession> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

  // If backend isn't configured yet, fall back to a demo session.
  if (!baseUrl) {
    return {
      token: 'demo-token',
      user: { role: input.roleHint ?? 'DONOR' },
    }
  }

  // Expected Spring Boot endpoint shape (adjust later to your backend contract)
  return apiFetch<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: input.email, password: input.password }),
  })
}

export async function register(input: RegisterInput): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

  // Demo-only: pretend success when backend isn't configured.
  if (!baseUrl) return

  await apiFetch<void>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
