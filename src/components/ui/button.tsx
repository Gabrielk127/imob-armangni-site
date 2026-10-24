import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'outline-light' | 'ghost' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex select-none items-center justify-center gap-2.5 rounded-card font-sans font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-night-950 text-white hover:bg-night-700',
  accent: 'bg-brand-500 text-night-950 hover:bg-brand-300',
  outline: 'border border-night-950/80 text-night-950 hover:bg-night-950 hover:text-white',
  'outline-light': 'border border-white/50 text-white hover:border-white hover:bg-white hover:text-night-950',
  ghost: 'text-night-950 hover:bg-surface',
  whatsapp: 'bg-[#1fae55] text-white hover:bg-[#178f45]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-small',
  md: 'h-12 px-6 text-body',
  lg: 'h-14 px-8 text-body',
}

/**
 * Classe do botão padrão do site. Usada tanto em `<button>` quanto em `<Link>`
 * e `<a>`, para que todo CTA tenha o mesmo formato, altura e estados.
 */
export function buttonClass({
  variant = 'primary',
  size = 'md',
  block = false,
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  className?: string
} = {}) {
  return cn(base, variants[variant], sizes[size], block && 'w-full', className)
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
}

export function Button({ variant, size, block, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClass({ variant, size, block, className })} {...props} />
}
