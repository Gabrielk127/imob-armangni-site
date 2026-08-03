import type { SVGProps } from 'react'

/**
 * Glifos que o Solar não desenha soltos (só dentro de círculo/quadrado).
 * Traço 1.5 e pontas arredondadas para casar com o `-linear` do conjunto.
 */
function Glyph({ d, ...props }: SVGProps<SVGSVGElement> & { d: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d={d} />
    </svg>
  )
}

export const X = (props: SVGProps<SVGSVGElement>) => (
  <Glyph d='M6 6l12 12M18 6L6 18' {...props} />
)

export const Check = (props: SVGProps<SVGSVGElement>) => (
  <Glyph d='M5 13l4.5 4.5L19 7' {...props} />
)
