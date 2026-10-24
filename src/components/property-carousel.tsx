import type { Property } from '@/data/properties'
import { PropertyCard } from '@/components/property-card'
import {
  CarouselControls,
  CarouselDots,
  CarouselItem,
  CarouselTrack,
  useCarousel,
} from '@/components/ui/carousel'

interface PropertyCarouselProps {
  properties: Property[]
  label?: string
  tone?: 'light' | 'dark'
}

export function PropertyCarousel({
  properties,
  label = 'Carrossel de imóveis',
  tone = 'light',
}: PropertyCarouselProps) {
  const carousel = useCarousel()

  if (!properties || properties.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* Barra de controle no desktop (se mais de 3 cards) */}
      <div className="mb-4 hidden items-center justify-end sm:flex">
        <CarouselControls api={carousel} tone={tone} />
      </div>

      <CarouselTrack api={carousel} label={label}>
        {properties.map((property) => (
          <CarouselItem key={property.code}>
            <PropertyCard property={property} />
          </CarouselItem>
        ))}
      </CarouselTrack>

      <CarouselDots api={carousel} tone={tone} />
    </div>
  )
}
