import type { VercelRequest, VercelResponse } from '@vercel/node'

// Shared in-memory store — must live in a module that both handlers import.
// In production, replace with Vercel KV / Upstash Redis for cross-instance persistence.
import { store } from './_store'

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(204).end()

  const id = req.query.id
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing id' })
  }

  const data = store.get(id)
  if (!data) {
    return res.status(404).json({ error: 'Not found' })
  }

  res.setHeader('Cache-Control', 'public, max-age=86400')
  return res.status(200).json(JSON.parse(data) as unknown)
}
