export type PostcardBackground = 'cream' | 'kraft' | 'linen' | 'rose'
export type AccentColor = 'gold' | 'rose' | 'sage' | 'ink'

export interface PostcardData {
  id: string
  to: string
  from: string
  message: string
  background: PostcardBackground
  accent: AccentColor
  createdAt: number
  title?: string
  date?: string
  photo?: string
  vintage?: boolean
}

export type PostcardSide = 'front' | 'back'
