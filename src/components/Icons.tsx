import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function EnvelopeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3.5 7.2 12 12.4 20.5 7.2M4.2 6h15.6A1.7 1.7 0 0 1 21.5 7.7v8.6a1.7 1.7 0 0 1-1.7 1.7H4.2A1.7 1.7 0 0 1 2.5 16.3V7.7A1.7 1.7 0 0 1 4.2 6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 20s-7.2-4.3-9-8.4C1.6 8.4 3.3 5 6.6 5c1.8 0 3.2 1 3.9 2.3C11.2 6 12.6 5 14.4 5c3.3 0 5 3.4 3.6 6.6C19.2 15.7 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16.5H7.8A2.8 2.8 0 0 0 5 22.3V5.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M5 19.2h12.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m12 3.5 2.2 5.4 5.8.5-4.4 3.8 1.3 5.7L12 16.4 6.9 18.9l1.3-5.7-4.4-3.8 5.8-.5L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
