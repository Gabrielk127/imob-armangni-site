import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  category?: string
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  dark?: boolean
  className?: string
}

export function SectionHeading({
  title,
  description,
  align = 'left',
  dark = false,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'max-w-3xl space-y-2.5',
        centered ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >

      <h2
        className={cn(
          'font-display text-head font-light leading-[1.08] tracking-tight',
          dark ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'text-body leading-relaxed max-w-2xl',
            dark ? 'text-neutral-300' : 'text-muted'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
