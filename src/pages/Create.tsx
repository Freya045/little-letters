import { useState } from 'react'
import { FlippablePostcard, Postcard } from '../components/Postcard'
import { savePostcard } from '../lib/encode'
import { ACCENTS, BACKGROUNDS, createEmptyPostcard } from '../lib/postcard'
import type { PostcardData } from '../types'

export function Create() {
  const [data, setData] = useState<PostcardData>(() => createEmptyPostcard())
  const [status, setStatus] = useState('')
  const [shareUrl, setShareUrl] = useState('')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [shortening, setShortening] = useState(false)

  const update = (patch: Partial<PostcardData>) => {
    setData((prev) => ({ ...prev, ...patch }))
    setShareUrl('')
    setStatus('')
  }

  const generateLink = async () => {
    setShortening(true)
    setShareUrl('')
    setStatus('Saving postcard…')
    const url = await savePostcard(data)
    setShareUrl(url)
    setShortening(false)
    void navigator.clipboard.writeText(url).then(
      () => setStatus('Link copied — share it like a sealed envelope.'),
      () => setStatus('Link ready. Copy it from the box below.'),
    )
  }



  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="fade-in rounded-[28px] bg-white/45 p-6 shadow-[0_20px_50px_-32px_rgba(45,42,38,0.35)] backdrop-blur-sm">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-ink sm:text-4xl">Write a postcard</h1>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">To</span>
            <input
              className="field mt-1 border-b border-ink/20 pb-1 font-[family-name:var(--font-script)] text-lg sm:text-xl"
              value={data.to}
              onChange={(e) => update({ to: e.target.value })}
              placeholder="a dear someone"
              autoComplete="off"
            />
          </label>
          <label className="block">
            <span className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">From</span>
            <input
              className="field mt-1 border-b border-ink/20 pb-1 font-[family-name:var(--font-script)] text-lg sm:text-xl"
              value={data.from}
              onChange={(e) => update({ from: e.target.value })}
              placeholder="your name"
              autoComplete="off"
            />
          </label>
        </div>



        <label className="mt-5 block">
          <span className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">Message</span>
          <textarea
            className="message-text lined-paper mt-2 min-h-[180px] w-full resize-y rounded-2xl border border-ink/10 bg-[#fdfbf7]/80 px-4 py-3"
            value={data.message}
            onChange={(e) => update({ message: e.target.value })}
            placeholder="Thinking of you between the pages…"
          />
        </label>



        <fieldset className="mt-6">
          <legend className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">Paper</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                type="button"
                onClick={() => update({ background: bg.id })}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
                  data.background === bg.id ? 'ring-2 ring-gold' : 'ring-1 ring-ink/10'
                }`}
              >
                <span className="h-4 w-4 rounded-full" style={{ background: bg.swatch }} />
                {bg.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-5">
          <legend className="text-[11px] tracking-[0.2em] text-ink-soft uppercase">Stamp color</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ACCENTS.map((accent) => (
              <button
                key={accent.id}
                type="button"
                onClick={() => update({ accent: accent.id })}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
                  data.accent === accent.id ? 'ring-2 ring-gold' : 'ring-1 ring-ink/10'
                }`}
              >
                <span className="h-4 w-4 rounded-full" style={{ background: accent.color }} />
                {accent.label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void generateLink()}
            disabled={shortening}
            className="rounded-full bg-[#c9a66b] px-5 py-2.5 text-sm text-ink disabled:opacity-60"
          >
            {shortening ? 'Shortening…' : 'Generate Link'}
          </button>
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="rounded-full px-5 py-2.5 text-sm text-ink-soft ring-1 ring-ink/15"
          >
            Preview Full
          </button>
        </div>
        {status ? <p className="mt-3 text-sm text-[#7d9270]">{status}</p> : null}
        {shareUrl ? (
          <p className="mt-2 break-all rounded-2xl bg-white/60 p-3 text-xs text-ink-soft">{shareUrl}</p>
        ) : null}
      </section>

      <section className="fade-in flex flex-col items-center lg:pt-6">
        <FlippablePostcard
          data={data}
          className="w-full max-w-[560px]"
        />
      </section>

      {previewOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2a26]/45 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
        >
          <div className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-[28px] bg-[#fdfbf7] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="preview-title" className="font-[family-name:var(--font-display)] text-2xl">
                Full postcard
              </h2>
              <button
                type="button"
                className="rounded-full px-3 py-1 text-sm text-ink-soft"
                onClick={() => setPreviewOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 py-4">
              <Postcard data={data} side="front" tilt={-1} />
              <Postcard data={data} side="back" tilt={1.2} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
