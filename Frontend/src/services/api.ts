import { getToken } from './storage'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined

export type ApiError = {
  status: number
  message: string
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')

  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const url = API_BASE_URL ? `${API_BASE_URL}${path}` : path

  const response = await fetch(url, {
    ...init,
    headers,
  })

  if (!response.ok) {
    const message = await safeReadErrorMessage(response)
    throw { status: response.status, message } satisfies ApiError
  }

  // Handle empty responses (e.g., 204)
  const text = await response.text()
  return (text ? (JSON.parse(text) as T) : (undefined as T))
}

async function safeReadErrorMessage(response: Response): Promise<string> {
  try {
    const text = await response.text()
    return text || response.statusText
  } catch {
    return response.statusText
  }
}
