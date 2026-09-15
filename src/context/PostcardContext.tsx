import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { deleteDraft, loadDrafts, upsertDraft } from '../lib/storage'
import type { PostcardData } from '../types'

interface PostcardContextValue {
  drafts: PostcardData[]
  saveDraft: (postcard: PostcardData) => void
  removeDraft: (id: string) => void
  refresh: () => void
}

const PostcardContext = createContext<PostcardContextValue | null>(null)

export function PostcardProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<PostcardData[]>(() => loadDrafts())

  const saveDraft = useCallback((postcard: PostcardData) => {
    setDrafts(upsertDraft(postcard))
  }, [])

  const removeDraft = useCallback((id: string) => {
    setDrafts(deleteDraft(id))
  }, [])

  const refresh = useCallback(() => {
    setDrafts(loadDrafts())
  }, [])

  const value = useMemo(
    () => ({ drafts, saveDraft, removeDraft, refresh }),
    [drafts, saveDraft, removeDraft, refresh],
  )

  return (
    <PostcardContext.Provider value={value}>{children}</PostcardContext.Provider>
  )
}

export function usePostcards() {
  const ctx = useContext(PostcardContext)
  if (!ctx) {
    throw new Error('usePostcards must be used within PostcardProvider')
  }
  return ctx
}
