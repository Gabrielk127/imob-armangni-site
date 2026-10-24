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
import { usePrefetchProperty } from '@/hooks/use-prefetch-property'

export function PropertyCard({ property }: { property: Property }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const prefetch = usePrefetchProperty()
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
    property.bedrooms ? { icon: BedDouble, value: `${property.bedrooms} qtos` } : null,
    property.suites ? { icon: ShowerHead, value: `${property.suites} suítes` } : null,
    property.parking ? { icon: Car, value: `${property.parking} vagas` } : null,
  ].filter(Boolean) as { icon: typeof Ruler; value: string }[]

  const onPreload = () => {
    if (property.code) prefetch(property.code)
  }

  return (
    <article
      data-card
      onMouseEnter={onPreload}
      onTouchStart={onPreload}
      onFocus={onPreload}
      className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Imagem e Mini-Carrossel Interno */}
      <div className="group/carousel relative block aspect-[4/3] w-full overflow-hidden bg-surface">
        <Link
          to="/imovel/$code"
          params={{ code: property.code }}
          className="block h-full w-full"
          tabIndex={-1}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-[var(--ease-out)]"
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
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <PhotoPlaceholder />
            )}
          </div>
        </Link>

        {/* Badge do Código do Imóvel (Texto >= 13px em caixa mista, sem tracking excessivo) */}
        <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-1.5">
          <span className="rounded-sm bg-night-950/90 px-2.5 py-1 text-small font-medium text-white">
            Cód. {property.code}
          </span>
          {property.featured && (
            <span className="rounded-sm bg-brand-500 px-2.5 py-1 text-small font-semibold text-night-950">
              Destaque
            </span>
          )}
        </div>

        {/* Botões do Mini-Carrossel Interno */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto anterior"
              className="absolute left-2.5 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-night-950/10 bg-white/95 text-night-950 opacity-0 transition-all duration-200 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 focus-visible:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima foto"
              className="absolute right-2.5 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-night-950/10 bg-white/95 text-night-950 opacity-0 transition-all duration-200 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 focus-visible:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Indicadores do carrossel */}
        {total > 1 && (
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5" aria-hidden>
            {images.slice(0, 6).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentIdx(idx)
                }}
                aria-label={`Ir para foto ${idx + 1}`}
                className={`transition-all duration-300 ${
                  idx === currentIdx
                    ? 'h-1.5 w-4 rounded-full bg-white'
                    : 'h-1.5 w-1.5 rounded-full bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <Link
        to="/imovel/$code"
        params={{ code: property.code }}
        className="flex flex-1 flex-col p-5 focus-visible:outline-offset-2"
      >
        {/* Preço em destaque */}
        <div className="pb-2.5">
          <p
            className={`font-sans tracking-tight text-ink ${
              !property.price || property.price <= 0
                ? 'text-body italic text-muted'
                : 'text-lead font-semibold'
            }`}
          >
            {formatPrice(property)}
          </p>
        </div>

        {/* Título & Subtítulo */}
        <div className="min-w-0">
          <h3 className="font-display text-[1.35rem] font-medium leading-snug text-ink transition-colors group-hover:text-brand-900">
            {property.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-body text-muted">
            {property.subtitle}
          </p>
        </div>

        {/* Localização */}
        <p className="mt-3 flex items-center gap-1.5 text-small text-muted">
          <MapPin className="h-4 w-4 shrink-0 text-brand-700" />
          <span className="truncate">
            {property.condominium
              ? `${property.condominium} · `
              : property.neighborhood
                ? `${property.neighborhood} · `
                : ''}
            {property.city || 'Londrina'}
          </span>
        </p>

        {/* Características Técnicas */}
        <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-small text-muted">
          {stats.map(({ icon: Icon, value }) => (
            <li key={value} className="flex items-center gap-1.5 tabular">
              <Icon className="h-4 w-4 text-brand-600 shrink-0" />
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </Link>
    </article>
  )
}
