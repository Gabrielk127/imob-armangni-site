import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { cn } from '@/lib/utils'

/**
 * Estado de um trilho com scroll-snap nativo: sem biblioteca, arrasta com o
 * polegar no celular e responde a setas, teclado e trackpad no desktop.
 */
export function useCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ canPrev: false, canNext: false, page: 0, pages: 1 })

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    const pages = Math.max(1, Math.round(track.scrollWidth / track.clientWidth))
    const page = max <= 0 ? 0 : Math.round((track.scrollLeft / max) * (pages - 1))
    setState({
      canPrev: track.scrollLeft > 4,
      canNext: track.scrollLeft < max - 4,
      page,
      pages,
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    measure()
    track.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [measure])

  const scroll = useCallback((direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const item = track.querySelector<HTMLElement>('[data-carousel-item]')
    const gap = parseFloat(getComputedStyle(track).columnGap || '0')
    const step = item ? item.offsetWidth + gap : track.clientWidth
    const perView = Math.max(1, Math.floor((track.clientWidth + gap) / step))
    track.scrollBy({ left: direction * step * perView, behavior: 'smooth' })
  }, [])

  return { trackRef, scroll, measure, ...state }
}

type CarouselApi = ReturnType<typeof useCarousel>

export function CarouselControls({
  api,
  tone = 'light',
  className,
}: {
  api: CarouselApi
  tone?: 'light' | 'dark'
  className?: string
}) {
  const button = cn(
    'grid h-11 w-11 place-items-center rounded-card border transition-[background-color,color,border-color,opacity] duration-200 disabled:pointer-events-none disabled:opacity-30',
    tone === 'light'
      ? 'border-night-950/15 bg-white text-night-950 hover:border-night-950 hover:bg-night-950 hover:text-white'
      : 'border-white/20 text-white hover:border-white hover:bg-white hover:text-night-950'
  )

  if (!api.canPrev && !api.canNext) return null

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button type="button" aria-label="Anteriores" disabled={!api.canPrev} onClick={() => api.scroll(-1)} className={button}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" aria-label="Próximos" disabled={!api.canNext} onClick={() => api.scroll(1)} className={button}>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

/** Pontos de progresso — só no celular, onde as setas somem. */
export function CarouselDots({ api, tone = 'light' }: { api: CarouselApi; tone?: 'light' | 'dark' }) {
  if (api.pages <= 1) return null
  const pages = Math.min(api.pages, 8)
  const active = Math.min(api.page, pages - 1)

  return (
    <div className="mt-2 flex justify-center gap-1.5 md:hidden" aria-hidden>
      {Array.from({ length: pages }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            i === active ? 'w-6' : 'w-1.5',
            tone === 'light'
              ? i === active ? 'bg-night-950' : 'bg-night-950/20'
              : i === active ? 'bg-white' : 'bg-white/30'
          )}
        />
      ))}
    </div>
  )
}

export function CarouselTrack({
  api,
  children,
  label,
  className,
}: {
  api: CarouselApi
  children: ReactNode
  label: string
  className?: string
}) {
  return (
    <div
      ref={api.trackRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') api.scroll(1)
        if (event.key === 'ArrowLeft') api.scroll(-1)
      }}
      className={cn(
        'scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pt-2 pb-6 focus-visible:outline-offset-[-2px] sm:gap-6 touch-pan-x [webkit-overflow-scrolling:touch]',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CarouselItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-carousel-item
      className={cn(
        'w-[86%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] 2xl:w-[calc((100%-4.5rem)/4)]',
        className
      )}
    >
      {children}
    </div>
  )
}
