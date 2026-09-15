import { Link } from 'react-router-dom'
import { Postcard } from '../components/Postcard'
import { EnvelopeIcon, HeartIcon } from '../components/Icons'
import { SAMPLE_POSTCARDS } from '../lib/postcard'

export function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8">
      <section className="grid items-center gap-10 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-10">
        <div className="fade-in">

          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
            Little Letters
          </h1>
          <p className="mt-4 max-w-md font-[family-name:var(--font-display)] text-2xl italic text-ink-soft">
            Send someone a quiet moment
          </p>
          <p className="mt-5 max-w-lg text-ink-soft">
            Make a postcard that feels like it slipped from an old book — warm paper,
            a little tilt, words in a familiar hand.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/create"
              className="soft-lift rounded-full bg-[#c9a66b] px-6 py-3 text-sm tracking-wide text-[#2d2a26] shadow-sm"
            >
              Create a Postcard
            </Link>
          </div>
          <ul className="mt-10 flex gap-6 text-ink-soft">
            <li className="flex items-center gap-2 text-sm">
              <EnvelopeIcon className="h-4 w-4" /> sealed with care
            </li>
            <li className="flex items-center gap-2 text-sm">
              <HeartIcon className="h-4 w-4" /> meant to be kept
            </li>
          </ul>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-[520px] fade-in sm:h-[480px]">
          <div className="float-a absolute top-8 left-0 w-[78%] [--tilt:-6deg]">
            <Postcard data={SAMPLE_POSTCARDS[0]} tilt={-6} compact />
          </div>
          <div className="float-b absolute top-28 right-0 w-[72%] [--tilt:5deg]">
            <Postcard data={SAMPLE_POSTCARDS[1]} side="front" tilt={5} compact />
          </div>
          <div className="float-c absolute bottom-2 left-[12%] w-[70%] [--tilt:-2deg]">
            <Postcard data={SAMPLE_POSTCARDS[2]} tilt={-2} compact />
          </div>
        </div>
      </section>
    </div>
  )
}
