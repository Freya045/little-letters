import { NavLink, Outlet } from 'react-router-dom'
import { EnvelopeIcon } from './Icons'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-1.5 text-sm tracking-wide transition-colors ${
    isActive ? 'bg-gold/20 text-ink' : 'text-ink-soft hover:bg-linen/80'
  }`

export function Layout() {
  return (
    <div className="page-wash relative min-h-svh overflow-x-hidden">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.07]" />
      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <NavLink to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold">
            <EnvelopeIcon className="h-5 w-5" />
          </span>
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-ink">
            Little Letters
          </span>
        </NavLink>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/create" className={linkClass}>
            Create
          </NavLink>
        </nav>
      </header>
      <main className="relative z-10">
        <Outlet />
      </main>
      <footer className="relative z-10 mx-auto mt-16 max-w-6xl px-5 pb-10 text-center text-sm text-ink-soft/80">
        <p className="font-[family-name:var(--font-display)] italic">
          A quiet note, folded into the internet.
        </p>
        <p className="mt-1">made with lotss of love, freya</p>
      </footer>
    </div>
  )
}
