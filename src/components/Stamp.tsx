import type { AccentColor } from '../types'

const accentFill: Record<AccentColor, string> = {
  gold: '#c9a66b',
  rose: '#d4a59a',
  sage: '#9caf88',
  ink: '#5c534a',
}

const stampIllustrations: Record<AccentColor, React.ReactNode> = {
  rose: (
    <g transform="translate(40, 50)">
      <path d="M -14 20 C -10 10, -2 -5, 12 -20 C 8 -5, 0 8, -12 20" fill="currentColor" />
      <path d="M -5 5 C 8 2, 14 10, 18 16 C 8 12, 2 8, -5 5" fill="currentColor" opacity="0.85" />
      <path d="M 0 -6 C 12 -12, 20 -4, 25 2 C 15 -2, 8 -4, 0 -6" fill="currentColor" opacity="0.75" />
      <path d="M -10 12 C -18 12, -22 4, -25 -2 C -18 6, -14 10, -10 12" fill="currentColor" opacity="0.65" />
      <circle cx="12" cy="-12" r="1.5" fill="currentColor" />
      <circle cx="6" cy="-18" r="1.2" fill="currentColor" opacity="0.8" />
      <circle cx="16" cy="-6" r="1" fill="currentColor" opacity="0.7" />
    </g>
  ),
  sage: (
    <g transform="translate(40, 48)">
      <path d="M -10 20 C 0 5, 5 -10, 10 -20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M -5 13 C -10 8, -15 5, -20 5 C -15 10, -10 15, -5 13" fill="currentColor" opacity="0.8" />
      <path d="M 0 3 C -8 0, -15 -5, -18 -12 C -12 -8, -5 -2, 0 3" fill="currentColor" opacity="0.7" />
      <path d="M 5 -7 C -2 -12, -8 -18, -10 -25 C -5 -20, 2 -12, 5 -7" fill="currentColor" opacity="0.6" />
      <path d="M 0 10 C 8 12, 15 15, 20 20 C 12 18, 5 15, 0 10" fill="currentColor" opacity="0.8" />
      <path d="M 5 0 C 12 -2, 20 -2, 25 0 C 18 2, 10 4, 5 0" fill="currentColor" opacity="0.7" />
    </g>
  ),
  gold: (
    <g transform="translate(40, 46)">
      <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 0 -12 L 0 -18 M 0 12 L 0 18 M -12 0 L -18 0 M 12 0 L 18 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M -8 -8 L -12 -12 M 8 8 L 12 12 M -8 8 L -12 12 M 8 -8 L 12 -12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      <circle cx="0" cy="0" r="2.5" fill="currentColor" opacity="0.8" />
      <circle cx="0" cy="-24" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="0" cy="24" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="-24" cy="0" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="24" cy="0" r="1" fill="currentColor" opacity="0.5" />
    </g>
  ),
  ink: (
    <g transform="translate(40, 48)">
      <path d="M -15 20 C 0 5, 12 -8, 20 -22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M -10 15 C 5 15, 20 5, 20 -22 C 10 -12, -5 -2, -15 20 C -15 20, -12 17, -10 15" fill="currentColor" opacity="0.8" />
      <circle cx="-20" cy="22" r="1.5" fill="currentColor" />
      <circle cx="-14" cy="26" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="-24" cy="16" r="0.8" fill="currentColor" opacity="0.4" />
    </g>
  ),
}

export function Stamp({
  accent = 'gold',
}: {
  accent?: AccentColor
}) {
  const fill = accentFill[accent]
  return (
    <div className="flex flex-col items-end gap-2">
      <div
        className="relative z-10 w-[68px] select-none transition-transform hover:scale-[1.02]"
        style={{ color: fill }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 80 96"
          className="h-auto w-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]"
          style={{ transform: 'rotate(3deg)' }}
        >
          {/* Stamp paper base with slight texture color */}
          <rect x="2" y="2" width="76" height="92" fill="#fdfbf7" />
          
          {/* Outer Border */}
          <rect x="6" y="6" width="68" height="84" fill="none" stroke={fill} strokeWidth="1" />
          
          {/* Inner Border */}
          <rect x="9" y="9" width="62" height="78" fill="none" stroke="currentColor" strokeWidth="0.4" />
          
          {/* Center Illustration - changes by accent color */}
          {stampIllustrations[accent]}

          {/* Value / Text */}
          <text x="14" y="22" fill="currentColor" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">¢</text>
          <text x="40" y="81" textAnchor="middle" fill="currentColor" fontSize="7" fontFamily="Georgia, serif" letterSpacing="3">POST</text>
        </svg>
      </div>
    </div>
  )
}
