import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Entrada padrão das seções: sobe 24px com opacidade, uma vez, quando entra na
 * tela. Filhos com `<Reveal.Item>` entram em sequência (70ms entre eles).
 * Sem JS ou com movimento reduzido o conteúdo aparece direto.
 */
export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'ul' | 'header'
  delay?: number
}) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  if (reduce) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  )
}

function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'p' | 'h2'
}) {
  const reduce = useReducedMotion()
  const Component = motion[as]

  if (reduce) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
      }}
    >
      {children}
    </Component>
  )
}

Reveal.Item = RevealItem
