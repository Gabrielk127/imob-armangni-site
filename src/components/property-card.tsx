import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  BedDouble,
  Car,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Ruler,
  ShowerHead,
} from '@/components/icons'
import type { Property } from '@/data/properties'
import { formatArea, formatPrice } from '@/lib/format'
import { PhotoPlaceholder } from '@/components/photo-placeholder'

export function PropertyCard({ property }: { property: Property }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  // `/placeholder.jpg` não existe no projeto: sem foto, o card usa o bloco
  // neutro renderizado mais abaixo em vez de uma imagem quebrada.
  const images = property.images ?? []
  const total = Math.max(1, images.length)

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev - 1 + total) % total)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev + 1) % total)
  }

  const stats = [
    { icon: Ruler, value: formatArea(property.area) },
    property.bedrooms ? { icon: BedDouble, value: `${property.bedrooms} quartos` } : null,
    property.suites ? { icon: ShowerHead, value: `${property.suites} suítes` } : null,
    property.parking ? { icon: Car, value: `${property.parking} vagas` } : null,
  ].filter(Boolean) as { icon: typeof Ruler; value: string }[]

  return (
    <article
      data-card
      className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-neutral-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(10,10,11,0.35)]"
    >
      <div className="group/carousel relative block aspect-[4/3] overflow-hidden">
        <Link to='/imovel/$code'
        params={{ code: property.code }} className="block h-full w-full">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${total * 100}%`,
              transform: `translateX(-${(currentIdx / total) * 100}%)`,
            }}
          >
            {images.length > 0 ? (
              images.map((imgUrl, idx) => (
                <div key={idx} className="h-full" style={{ width: `${100 / total}%` }}>
                  <img
                    src={imgUrl}
                    alt={`${property.title} — foto ${idx + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
        </Link>

        {/* Badge do Código do Imóvel no topo da imagem */}
        <span className="absolute left-4 top-4 z-10 border border-white/40 bg-night-950/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          CÓD. {property.code}
        </span>

        {/* Carousel Navigation Buttons */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Imagem anterior"
              className="absolute left-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night-950 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 group-hover/carousel:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima imagem"
              className="absolute right-2.5 top-1/2 z-20 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night-950 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 group-hover/carousel:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Carousel Dots */}
        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentIdx(idx)
                }}
                aria-label={`Ir para foto ${idx + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIdx
                    ? 'h-1.5 w-4 bg-white shadow-sm'
                    : 'h-1.5 w-1.5 bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <Link to='/imovel/$code'
        params={{ code: property.code }} className="flex flex-1 flex-col gap-3 p-5">
        {/* Preço fora da imagem */}
        <div className="border-b border-neutral-100 pb-3">
          <p
            className={`font-sans text-night-950 ${
              property.price == null
                ? 'text-lg italic font-normal text-neutral-500'
                : 'text-2xl font-bold tracking-tight'
            }`}
          >
            {formatPrice(property)}
          </p>
        </div>

        <div>
          <h3 className="font-display text-[22px] font-medium leading-tight text-night-950">
            {property.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-neutral-500">{property.subtitle}</p>
        </div>
        <p className="flex items-center gap-1.5 text-[13px] text-neutral-500">
          <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
          {property.neighborhood} · {property.city}
        </p>
        <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200/80 pt-4 text-xs text-neutral-500">
          {stats.map(({ icon: Icon, value }) => (
            <li key={value} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 text-neutral-400" />
              {value}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  )
}
