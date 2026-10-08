import type { VercelRequest, VercelResponse } from '@vercel/node'

// Shared in-memory store — same Map instance across requests in the same container.
// For production persistence, swap for Vercel KV / Upstash Redis.
import { store } from './_store'

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'

function makeId(len = 6): string {
  let id = ''
  for (let i = 0; i < len; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return id
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS so the Vite dev server can call this endpoint
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body as unknown
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid body' })
  }

  // Generate a unique ID
  let id = makeId()
  while (store.has(id)) id = makeId()

  store.set(id, JSON.stringify(body))

  return res.status(200).json({ id })
}
