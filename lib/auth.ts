import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me'
const TOKEN_COOKIE = 'elite_admin_token'

export function createToken(username: string): string {
  return jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { username: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { username: string; role: string }
  } catch {
    return null
  }
}

export function getTokenFromCookies(): string | null {
  const cookieStore = cookies()
  return cookieStore.get(TOKEN_COOKIE)?.value || null
}

export function isAuthenticated(): boolean {
  const token = getTokenFromCookies()
  if (!token) return false
  return verifyToken(token) !== null
}

export function validateCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME || 'admin'
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'
  return username === adminUser && password === adminPass
}

export { TOKEN_COOKIE }
