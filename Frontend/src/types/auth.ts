export type Role = 'DONOR' | 'RECIPIENT' | 'ADMIN'

export type AuthUser = {
  role: Role
}

export type AuthSession = {
  token: string
  user: AuthUser
}
