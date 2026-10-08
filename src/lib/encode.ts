import type { PostcardData } from '../types'

function toBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(payload: string): string {
  const padded = payload.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  const binary = atob(padded + pad)
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodePostcard(data: PostcardData): string {
  const shareable: PostcardData = { ...data }
  return toBase64Url(JSON.stringify(shareable))
}

export function decodePostcard(payload: string): PostcardData | null {
  try {
    const parsed = JSON.parse(fromBase64Url(payload)) as Partial<PostcardData>
    if (typeof parsed !== 'object' || parsed === null) return null
    if (typeof parsed.message !== 'string' && typeof parsed.to !== 'string') {
      return null
    }
    return {
      id: typeof parsed.id === 'string' ? parsed.id : crypto.randomUUID(),
      to: parsed.to ?? '',
      from: parsed.from ?? '',
      title: parsed.title ?? '',
      message: parsed.message ?? '',
      photo: parsed.photo,
      date: parsed.date ?? '',
      background: parsed.background ?? 'cream',
      accent: parsed.accent ?? 'gold',
      vintage: Boolean(parsed.vintage),
      createdAt: parsed.createdAt ?? Date.now(),
    }
  } catch {
    return null
  }
}

export function postcardShareUrl(data: PostcardData): string {
  const encoded = encodePostcard(data)
  return `${window.location.origin}/postcard#${encoded}`
}

/**
 * POSTs the postcard to /api/shorten, which stores it server-side
 * and returns a 6-char alphanumeric ID.
 * Returns a short URL like /p/Ab3xK2 on success, or the long hash URL as fallback.
 */
export async function savePostcard(data: PostcardData): Promise<string> {
  try {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('API error')
    const json = (await res.json()) as { id?: string }
    if (!json.id) throw new Error('No ID returned')
    return `${window.location.origin}/p/${json.id}`
  } catch {
    // Fallback: encode everything in the URL the old way
    return postcardShareUrl(data)
  }
}
