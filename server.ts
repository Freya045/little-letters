/**
 * Local dev API server — mirrors the Vercel serverless functions
 * at api/shorten.ts and api/load.ts.
 *
 * Run with: npx tsx server.ts
 * Listens on :3000 so the Vite proxy (/api → localhost:3000) works.
 */
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())

// In-memory store (same semantics as the Vercel serverless functions)
const store = new Map<string, string>()

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
function makeId(len = 6): string {
  let id = ''
  for (let i = 0; i < len; i++) {
    id += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return id
}

// POST /api/shorten — save postcard, return short ID
app.post('/api/shorten', (req, res) => {
  const body = req.body as unknown
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Invalid body' })
    return
  }
  let id = makeId()
  while (store.has(id)) id = makeId()
  store.set(id, JSON.stringify(body))
  res.json({ id })
})

// GET /api/load?id=xxx — retrieve postcard by short ID
app.get('/api/load', (req, res) => {
  const id = req.query.id as string | undefined
  if (!id) {
    res.status(400).json({ error: 'Missing id' })
    return
  }
  const data = store.get(id)
  if (!data) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.json(JSON.parse(data) as unknown)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`[api] Local dev server running on http://localhost:${PORT}`)
})
