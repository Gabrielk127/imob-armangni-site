interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  dark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-500 ${
            centered ? 'justify-center' : ''
          }`}
        >
          {!centered && <span className="h-px w-10 bg-brand-500/60" />}
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl font-medium leading-tight sm:text-[44px] ${
          dark ? 'text-white' : 'text-night-950'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-[15px] font-light leading-relaxed ${
            dark ? 'text-neutral-300' : 'text-neutral-500'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
