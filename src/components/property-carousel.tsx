import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import type { Property } from '@/data/properties'
import { PropertyCard } from '@/components/property-card'

export function PropertyCarousel({ properties }: { properties: Property[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 28 : track.clientWidth
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-4 pb-2 pt-1 sm:mx-0 sm:px-1"
      >
        {properties.map((property) => (
          <div
            key={property.code}
            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[calc((100%-3.5rem)/3)]"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute -left-5 -right-5 top-[38%] hidden justify-between lg:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Anterior"
          className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-neutral-200 bg-white text-night-950 shadow-md transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Próximo"
          className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-neutral-200 bg-white text-night-950 shadow-md transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
