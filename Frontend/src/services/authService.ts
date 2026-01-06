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

  if (!baseUrl) {
    throw new Error('API base URL is not configured. Set VITE_API_BASE_URL in your .env file.')
  }

  // Expected Spring Boot endpoint shape (adjust later to your backend contract)
  return apiFetch<AuthSession>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: input.email, password: input.password }),
  })
}

export async function register(input: RegisterInput): Promise<void> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

  if (!baseUrl) {
    throw new Error('API base URL is not configured. Set VITE_API_BASE_URL in your .env file.')
  }

  await apiFetch<void>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
