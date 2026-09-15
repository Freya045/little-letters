import html2canvas from 'html2canvas'
import { useMemo, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { FlippablePostcard } from '../components/Postcard'
import { decodePostcard } from '../lib/encode'
import { SAMPLE_POSTCARDS } from '../lib/postcard'
import type { PostcardData } from '../types'

function fromQuery(params: URLSearchParams): PostcardData | null {
  const to = params.get('to')
  const from = params.get('from')
  const message = params.get('message')
  if (!to && !from && !message) return null
  const bg = params.get('bg')
  const accent = params.get('accent')
  return {
    id: 'query',
    to: to ?? '',
    from: from ?? '',
    title: params.get('title') ?? '',
    message: message ?? '',
    date: params.get('date') ?? '',
    background:
      bg === 'kraft' || bg === 'linen' || bg === 'rose' || bg === 'cream'
        ? bg
        : 'cream',
    accent:
      accent === 'rose' || accent === 'sage' || accent === 'ink' || accent === 'gold'
        ? accent
        : 'gold',
    vintage: params.get('vintage') === '1',
    createdAt: Date.now(),
  }
}

export function Viewer() {
  const { payload } = useParams()
  const [search] = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloadError, setDownloadError] = useState('')

  const postcard = useMemo(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (hash) {
      const decoded = decodePostcard(hash)
      if (decoded) return decoded
    }
    if (payload) {
      const decoded = decodePostcard(decodeURIComponent(payload))
      if (decoded) return decoded
    }
    const fromParams = fromQuery(search)
    if (fromParams) return fromParams
    if (search.get('sample') === '1') return SAMPLE_POSTCARDS[0]
    return null
  }, [payload, search])



  const download = async () => {
    if (!cardRef.current) return
    setDownloadError('')
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      })
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'little-letter.png'
      a.click()
    } catch {
      setDownloadError('The postcard could not be saved as an image just now.')
    }
  }

  if (!postcard) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center fade-in">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">This note went missing</h1>
        <p className="mt-3 text-ink-soft">
          The link looks worn or incomplete — like a postcard that never quite arrived.
        </p>
        <Link
          to="/create"
          className="mt-8 inline-block rounded-full bg-[#c9a66b] px-6 py-3 text-sm text-ink"
        >
          Send your own
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-4">
      <p className="fade-in mb-8 font-[family-name:var(--font-display)] text-2xl italic text-ink-soft">
        For {postcard.to || 'you'}, from {postcard.from || 'someone who cares'}
      </p>
      
      <div className="relative w-full max-w-[560px] fade-in">
        {/* Soft magical glow behind the postcard to make it pop and feel less dull */}
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[20px] bg-gradient-to-tr from-[#c9a66b]/30 to-[#d4a59a]/30 blur-2xl opacity-70"></div>
        
        <div ref={cardRef} className="relative w-full">
          <FlippablePostcard data={postcard} />
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => void download()}
          className="rounded-full bg-white/70 px-5 py-2.5 text-sm shadow-sm transition-colors hover:bg-white"
        >
          Download image
        </button>
      </div>
      {downloadError ? <p className="mt-3 text-sm text-[#a15c4c]">{downloadError}</p> : null}

      <Link
        to="/create"
        className="soft-lift mt-12 rounded-full bg-[#c9a66b] px-6 py-3 text-sm text-ink"
      >
        Send your own
      </Link>
    </div>
  )
}
