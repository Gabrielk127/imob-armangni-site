import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { properties } from '../data/properties'
import { useFavorites } from '../context/FavoritesContext'
import PropertyCard from '../components/PropertyCard'

export default function Favorites() {
  const { favorites } = useFavorites()
  const items = properties.filter((p) => favorites.includes(p.code))

  return (
    <section className="bg-white">
      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-3 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-500">
            <span className="h-px w-10 bg-brand-500/60" />
            Sua seleção
          </p>
          <h1 className="font-display text-4xl font-medium text-night-950 sm:text-5xl">
            Imóveis favoritos
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            {items.length === 0
              ? 'Você ainda não salvou nenhum imóvel.'
              : `${items.length} ${items.length === 1 ? 'imóvel salvo' : 'imóveis salvos'} na sua conta.`}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-neutral-100 text-neutral-300">
              <Heart className="h-7 w-7" />
            </span>
            <p className="mt-6 font-display text-2xl text-night-950">
              Sua lista de favoritos está vazia
            </p>
            <p className="mt-2 max-w-sm text-sm text-neutral-500">
              Clique no ícone de coração em qualquer imóvel para salvá-lo aqui e comparar suas
              opções favoritas.
            </p>
            <Link
              to="/imoveis"
              className="mt-8 bg-brand-500 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-night-950 transition-colors hover:bg-brand-400"
            >
              Explorar imóveis
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((property) => (
              <PropertyCard key={property.code} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
