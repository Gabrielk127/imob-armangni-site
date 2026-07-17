import { Link } from 'react-router-dom'
import { BedDouble, Car, Heart, MapPin, Ruler, ShowerHead } from 'lucide-react'
import type { Property } from '../data/properties'
import { formatArea, formatPrice } from '../lib/format'
import { useFavorites } from '../context/FavoritesContext'

export default function PropertyCard({ property }: { property: Property }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(property.code)

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
      <Link to={`/imovel/${property.code}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.subtitle}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/10 to-night-950/20" />
        <span className="absolute left-4 top-4 border border-white/40 bg-night-950/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white backdrop-blur-sm">
          {property.purpose === 'venda' ? 'Venda' : 'Locação'}
        </span>
        <div className="absolute inset-x-4 bottom-3.5 flex items-end justify-between gap-3">
          <p
            className={`font-display text-white ${
              property.price == null ? 'text-xl italic' : 'text-[26px] font-medium'
            }`}
          >
            {formatPrice(property)}
          </p>
          <span className="pb-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
            Ref {property.code}
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(property.code)}
        aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        className="absolute right-4 top-3.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all hover:bg-white/30"
      >
        <Heart
          className={`h-[18px] w-[18px] transition-colors ${
            favorite ? 'fill-brand-400 text-brand-400' : ''
          }`}
        />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-5">
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
      </div>
    </article>
  )
}
