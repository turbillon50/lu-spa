const ADMIN_COOKIE = 'lucienne_admin'
const SESSION_HOURS = 12

export { ADMIN_COOKIE }

export function adminEmail() {
  return (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function textToBase64Url(value: string) {
  return bytesToBase64Url(new TextEncoder().encode(value))
}

function base64UrlToText(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4)
  const binary = atob(padded)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function constantTimeEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length)
  let mismatch = left.length ^ right.length
  for (let index = 0; index < length; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0)
  }
  return mismatch === 0
}

async function signature(payload: string) {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return ''
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signed = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return bytesToBase64Url(new Uint8Array(signed))
}

export async function createAdminSession(email: string) {
  const payload = textToBase64Url(JSON.stringify({
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  }))
  return `${payload}.${await signature(payload)}`
}

export async function verifyAdminSession(token?: string | null) {
  if (!token) return false
  const [payload, suppliedSignature] = token.split('.')
  if (!payload || !suppliedSignature) return false
  const expectedSignature = await signature(payload)
  if (!expectedSignature || !constantTimeEqual(suppliedSignature, expectedSignature)) return false

  try {
    const parsed = JSON.parse(base64UrlToText(payload)) as { email?: string; expiresAt?: number }
    return parsed.email === adminEmail() && Number(parsed.expiresAt) > Date.now()
  } catch {
    return false
  }
}

export function validAdminCredentials(email: string, password: string) {
  const expectedPassword = process.env.ADMIN_PASSWORD || ''
  const expectedEmail = adminEmail()
  return expectedEmail.length > 3
    && email.trim().toLowerCase() === expectedEmail
    && expectedPassword.length >= 8
    && constantTimeEqual(password, expectedPassword)
}
