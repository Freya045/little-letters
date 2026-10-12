export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { longUrl } = req.body

  if (!longUrl) {
    return res.status(400).json({ error: 'Missing longUrl' })
  }

  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    )
    const shortUrl = await response.text()
    return res.status(200).send(shortUrl)
  } catch (err) {
    return res.status(500).json({ error: 'Failed to shorten URL' })
  }
}
