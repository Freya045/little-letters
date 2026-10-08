import html2canvas from 'html2canvas'
import { useEffect, useMemo, useRef, useState } from 'react'
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
  const { payload, shortId } = useParams<{ payload?: string; shortId?: string }>()
  const [search] = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloadError, setDownloadError] = useState('')

  // State for short-ID lookups (/p/:shortId route)
  const [shortData, setShortData] = useState<PostcardData | null>(null)
  const [shortLoading, setShortLoading] = useState(false)
  const [shortError, setShortError] = useState(false)

  useEffect(() => {
    if (!shortId) return
    setShortLoading(true)
    setShortError(false)
    fetch(`/api/load?id=${encodeURIComponent(shortId)}`)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.json() as Promise<PostcardData>
      })
      .then((data) => {
        setShortData(data)
        setShortLoading(false)
      })
      .catch(() => {
        setShortError(true)
        setShortLoading(false)
      })
  }, [shortId])

  const postcard = useMemo(() => {
    // Short-ID route: data comes from state fetched from API
    if (shortId) return shortData

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
  }, [payload, shortId, shortData, search])



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

  if (shortLoading) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center fade-in">
        <p className="text-ink-soft">Opening your postcard…</p>
      </div>
    )
  }

  if (shortError) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center fade-in">
        <h1 className="font-[family-name:var(--font-display)] text-4xl">This note went missing</h1>
        <p className="mt-3 text-ink-soft">
          The link may have expired. Postcards are kept as long as the server is warm.
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
      <p className="fade-in mb-6 font-[family-name:var(--font-display)] text-lg italic text-ink-soft sm:text-2xl">
        For {postcard.to || 'you'}, from {postcard.from || 'someone who cares'}
      </p>
      
      <div className="relative w-full max-w-[560px] fade-in overflow-hidden rounded-2xl">
        {/* Soft glow behind the postcard */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-[#c9a66b]/25 to-[#d4a59a]/25 blur-xl opacity-80"></div>
        
        <div ref={cardRef} className="relative w-full">
          <FlippablePostcard data={postcard} startFlipped />
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
