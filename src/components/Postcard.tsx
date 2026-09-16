import type { CSSProperties } from 'react'
import { useState } from 'react'
import type { PostcardData, PostcardSide } from '../types'
import { Stamp } from './Stamp'

const bgClass: Record<PostcardData['background'], string> = {
  cream: 'bg-cream',
  kraft: 'bg-kraft',
  linen: 'bg-linen',
  rose: 'bg-rose',
}

interface PostcardProps {
  data: PostcardData
  side?: PostcardSide
  tilt?: number
  className?: string
  compact?: boolean
}

export function Postcard({
  data,
  side = 'back',
  tilt = -1.2,
  className = '',
  compact = false,
}: PostcardProps) {
  const style = { '--tilt': `${tilt}deg`, transform: `rotate(${tilt}deg)` } as CSSProperties
  // Always enforce aspect ratio so the card is never clipped on mobile
  const size = compact
    ? 'aspect-[3/2] w-full max-w-[340px]'
    : 'aspect-[3/2] w-full max-w-[560px]'

  return (
    <article
      className={`postcard ${bgClass[data.background]} ${size} ${className}`}
      style={style}
      aria-label={`Postcard to ${data.to || 'someone'}`}
    >
      {side === 'front' ? <Front data={data} compact={compact} /> : <Back data={data} compact={compact} />}
    </article>
  )
}

function Front({ data, compact }: { data: PostcardData; compact: boolean }) {
  return (
    <div className={`relative z-10 flex h-full flex-col ${compact ? 'p-4' : 'p-6'}`}>
      <p className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.28em] text-ink-soft/70 uppercase">
        Little Letters
      </p>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="mt-3 font-[family-name:var(--font-note)] text-base text-ink-soft">
            for {data.to || 'a dear someone'}
          </p>
        </div>
      </div>
    </div>
  )
}

function Back({ data, compact }: { data: PostcardData; compact: boolean }) {
  const pad = compact ? 'p-3' : 'p-4 sm:p-5'
  const msgSize = compact ? 'text-[0.75rem]' : 'text-[0.82rem] sm:text-[1rem]'

  return (
    // Two-column layout at all sizes: left = message, right = stamp + address
    <div className={`relative z-10 grid h-full grid-cols-[1.2fr_0.8fr] ${pad} gap-3 sm:gap-4`}>
      {/* Left: message + from */}
      <div className="flex min-h-0 flex-col justify-between overflow-hidden">
        <p className={`message-text ${msgSize} line-clamp-6 sm:line-clamp-none`}>
          {data.message || 'Your words will rest here, like a note tucked into a book…'}
        </p>
        <p className={`font-[family-name:var(--font-script)] ${compact ? 'text-[0.7rem]' : 'text-[0.78rem] sm:text-sm'} mt-1`}>
          — {data.from || 'Someone who thought of you'}
        </p>
      </div>

      {/* Right: stamp top, address bottom */}
      <div className="flex flex-col justify-between">
        <div className="flex justify-end">
          <Stamp accent={data.accent} />
        </div>
        <div className="space-y-2 text-right">
          <AddressLine label="To" value={data.to || '—'} compact={compact} />
          <AddressLine label="From" value={data.from || '—'} compact={compact} />
        </div>
      </div>
    </div>
  )
}

function AddressLine({
  label,
  value,
  compact,
}: {
  label: string
  value: string
  compact?: boolean
}) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.2em] text-ink-soft/70 uppercase">{label}</p>
      <p
        className={`font-[family-name:var(--font-script)] truncate ${compact ? 'text-[0.65rem]' : 'text-[0.72rem] sm:text-sm'}`}
      >
        {value}
      </p>
    </div>
  )
}


export function FlippablePostcard({
  data,
  tilt = -1,
  className = '',
  startFlipped = false,
}: {
  data: PostcardData
  tilt?: number
  className?: string
  startFlipped?: boolean
}) {
  const [flipped, setFlipped] = useState(startFlipped)
  return (
    <div className={`flip-scene cursor-pointer ${className}`} onClick={() => setFlipped(!flipped)}>
      <div className={`flip-card ${flipped ? 'is-flipped' : ''}`}>
        <div className="flip-face">
          <Postcard data={data} side="front" tilt={tilt} className="!transform-none" />
        </div>
        <div className="flip-face back">
          <Postcard data={data} side="back" tilt={tilt} className="!transform-none" />
        </div>
      </div>
    </div>
  )
}
