import type { AccentColor, PostcardBackground, PostcardData } from '../types'

export const DRAFTS_KEY = 'little-letters-drafts'

export const BACKGROUNDS: {
  id: PostcardBackground
  label: string
  swatch: string
}[] = [
  { id: 'cream', label: 'Cream', swatch: '#f5f0e6' },
  { id: 'kraft', label: 'Kraft', swatch: '#c4a882' },
  { id: 'linen', label: 'Linen', swatch: '#ebe3d4' },
  { id: 'rose', label: 'Blush', swatch: '#ead5cc' },
]

export const ACCENTS: { id: AccentColor; label: string; color: string }[] = [
  { id: 'gold', label: 'Gold', color: '#c9a66b' },
  { id: 'rose', label: 'Dusty rose', color: '#d4a59a' },
  { id: 'sage', label: 'Sage', color: '#9caf88' },
  { id: 'ink', label: 'Ink', color: '#5c534a' },
]



export function createEmptyPostcard(partial?: Partial<PostcardData>): PostcardData {
  return {
    id: crypto.randomUUID(),
    to: '',
    from: '',
    message: '',
    background: 'cream',
    accent: 'gold',
    createdAt: Date.now(),
    ...partial,
  }
}

export const SAMPLE_POSTCARDS: PostcardData[] = [
  createEmptyPostcard({
    id: 'sample-1',
    to: 'Alex',
    from: 'Sam',
    message:
      'I found this moment between pages of an old book and thought of you. The light was soft. I hope yours is too.',
    background: 'cream',
    accent: 'gold',
  }),
  createEmptyPostcard({
    id: 'sample-2',
    to: 'Mae',
    from: 'Jules',
    message:
      'The kettle clicked. Rain on the window. I wrote your name in the steam and wished you were here for tea.',
    background: 'rose',
    accent: 'rose',
  }),
  createEmptyPostcard({
    id: 'sample-3',
    to: 'Theo',
    from: 'Ivy',
    message:
      'Sage is blooming early. I pressed a little of the afternoon into this note so you might keep it in your pocket.',
    background: 'linen',
    accent: 'sage',
  }),
]
