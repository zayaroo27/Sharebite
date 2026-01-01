import type { Role } from '../types/auth'

export function defaultRouteForRole(role: Role): string {
  switch (role) {
    case 'DONOR':
      return '/donor'
    case 'RECIPIENT':
      return '/recipient'
    case 'ADMIN':
      return '/admin'
  }
}
