import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174A4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function Facebook(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function Youtube(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )
}

export function Linkedin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Twitter(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 4.01c-.88.6-2.6 1.34-3.46 1.5A4.48 4.48 0 0 0 16.11 3c-2.5 0-4.51 2.02-4.51 4.51 0 .35.04.7.11 1.03C8.05 8.36 4.75 6.6 2.5 3.9c-.38.66-.6 1.43-.6 2.24 0 1.56.8 2.94 2 3.75-.73-.02-1.42-.22-2.02-.56v.06c0 2.18 1.55 4 3.6 4.42a4.5 4.5 0 0 1-2.02.08c.57 1.79 2.23 3.09 4.2 3.13A9.02 9.02 0 0 1 1 19.54 12.76 12.76 0 0 0 7.9 21.5c8.28 0 12.8-6.86 12.8-12.8 0-.2 0-.39-.01-.58A9.14 9.14 0 0 0 23 5.8a8.9 8.9 0 0 1-2.57.7 4.5 4.5 0 0 0 1.97-2.49z" />
    </svg>
  )
}
