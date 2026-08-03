import { Camera } from '@/components/icons'

interface PhotoPlaceholderProps {
  /** `dark` para as áreas sobre fundo escuro, como o topo do detalhe. */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Ocupa o lugar da foto enquanto o anúncio não tem imagem cadastrada.
 *
 * Sem isso o `<img>` fica com `src` vazio e o navegador desenha o ícone de
 * imagem quebrada — passa impressão de erro, e não de anúncio em preparação.
 */
export function PhotoPlaceholder({
  tone = 'light',
  className = '',
}: PhotoPlaceholderProps) {
  const isDark = tone === 'dark'

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-3 ${
        isDark ? 'bg-night-900' : 'bg-neutral-100'
      } ${className}`}
    >
      <Camera
        className={`h-8 w-8 ${isDark ? 'text-white/25' : 'text-neutral-300'}`}
      />
      <span
        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
          isDark ? 'text-white/40' : 'text-neutral-400'
        }`}
      >
        Fotos em breve
      </span>
    </div>
  )
}
