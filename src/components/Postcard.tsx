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
  const size = compact
    ? 'aspect-[1.5/1] w-full max-w-[340px]'
    : 'aspect-[1.55/1] w-full max-w-[560px]'

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
  return (
    <div className={`relative z-10 grid h-full grid-cols-[1.15fr_0.85fr] ${compact ? 'gap-3 p-3' : 'gap-4 p-5'}`}>
      <div className="flex min-h-0 flex-col pr-3 md:pr-4">
        <p
          className={`message-text min-h-0 flex-1 overflow-hidden ${compact ? 'text-[0.85rem]' : 'text-[1rem] md:text-[1.05rem]'}`}
        >
          {data.message || 'Your words will rest here, like a note tucked into a book…'}
        </p>
        <p className="mt-2 font-[family-name:var(--font-script)] text-sm">
          — {data.from || 'Someone who thought of you'}
        </p>
      </div>
      <div className="flex min-h-0 flex-col">
        <div className="flex justify-end">
          <Stamp accent={data.accent} />
        </div>
        <div className="mt-4 space-y-3">
          <AddressLine label="To" value={data.to || '—'} />
          <AddressLine label="From" value={data.from || '—'} />
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
      <p className="text-[10px] tracking-[0.2em] text-ink-soft/70 uppercase">{label}</p>
      <p
        className={`font-[family-name:var(--font-script)] ${compact ? 'text-xs' : 'text-base'}`}
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
}: {
  data: PostcardData
  tilt?: number
  className?: string
}) {
  const [flipped, setFlipped] = useState(false)
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
