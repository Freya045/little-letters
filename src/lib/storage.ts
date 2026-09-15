import { DRAFTS_KEY } from './postcard'
import type { PostcardData } from '../types'

export function loadDrafts(): PostcardData[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as PostcardData[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveDrafts(drafts: PostcardData[]): void {
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts))
}

export function upsertDraft(postcard: PostcardData): PostcardData[] {
  const drafts = loadDrafts()
  const index = drafts.findIndex((d) => d.id === postcard.id)
  const next = { ...postcard, createdAt: Date.now() }
  if (index >= 0) {
    drafts[index] = next
  } else {
    drafts.unshift(next)
  }
  saveDrafts(drafts)
  return drafts
}

export function deleteDraft(id: string): PostcardData[] {
  const drafts = loadDrafts().filter((d) => d.id !== id)
  saveDrafts(drafts)
  return drafts
}

export function getDraft(id: string): PostcardData | undefined {
  return loadDrafts().find((d) => d.id === id)
}
