// Shared in-memory KV store used by both /api/shorten and /api/load.
// When the serverless instance is warm, the same Map is reused.
export const store = new Map<string, string>()
