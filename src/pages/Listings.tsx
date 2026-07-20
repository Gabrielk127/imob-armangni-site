import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, Map, Search, SlidersHorizontal } from 'lucide-react'
import { properties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import Testimonials from '../components/Testimonials'

const PAGE_SIZE = 8

type SortKey = 'preco-desc' | 'preco-asc' | 'area-desc'

const sortLabels: Record<SortKey, string> = {
  'preco-desc': 'Maior preço',
  'preco-asc': 'Menor preço',
  'area-desc': 'Maior área',
}

export default function Listings() {
  const [params, setParams] = useSearchParams()
  const [sort, setSort] = useState<SortKey>('preco-desc')
  const [page, setPage] = useState(1)

  const purpose = params.get('finalidade')
  const type = params.get('tipo')
  const query = params.get('q')?.toLowerCase() ?? ''

  useEffect(() => {
    setPage(1)
  }, [purpose, type, query, sort])

  const results = useMemo(() => {
    const filtered = properties.filter((p) => {
      if (purpose && p.purpose !== purpose) return false
      if (type && p.type !== type) return false
      if (query) {
        const haystack =
          `${p.title} ${p.subtitle} ${p.neighborhood} ${p.city} ${p.code}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })

    return filtered.sort((a, b) => {
      if (sort === 'area-desc') return b.area - a.area
      const priceA = a.price ?? -1
      const priceB = b.price ?? -1
      return sort === 'preco-asc' && priceA >= 0 && priceB >= 0
        ? priceA - priceB
        : priceB - priceA
    })
  }, [purpose, type, query, sort])

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const pageItems = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const heading = purpose === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis para comprar'

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-3 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-500">
            <span className="h-px w-10 bg-brand-500/60" />
            Portfólio Armangni
          </p>
          <h1 className="font-display text-4xl font-medium text-night-950 sm:text-5xl">
            {type ?? heading}
            {query && <span className="text-neutral-400"> · “{params.get('q')}”</span>}
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Foram encontrados <span className="font-semibold text-night-950">{results.length}</span>{' '}
            {results.length === 1 ? 'imóvel' : 'imóveis'} para sua busca.
          </p>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <label className="flex min-w-0 flex-1 items-center gap-3 border border-neutral-200 px-4 sm:max-w-md">
            <Search className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              defaultValue={params.get('q') ?? ''}
              key={params.get('q') ?? ''}
              placeholder="Bairro, cidade, empreendimento ou referência"
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-neutral-400"
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return
                const value = (event.target as HTMLInputElement).value.trim()
                const next = new URLSearchParams(params)
                if (value) next.set('q', value)
                else next.delete('q')
                setParams(next)
              }}
            />
          </label>

          <button
            type="button"
            className="flex items-center gap-2 bg-brand-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-night-950 transition-colors hover:bg-brand-400"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtrar
          </button>

          <label className="relative flex items-center border border-neutral-200">
            <span className="sr-only">Ordenar por</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              className="appearance-none bg-transparent py-2.5 pl-4 pr-9 text-sm outline-none"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-neutral-400" />
          </label>

          <button
            type="button"
            className="ml-auto flex items-center gap-2 border border-neutral-200 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600 transition-colors hover:border-night-950 hover:text-night-950"
          >
            <Map className="h-4 w-4" />
            Mapa
          </button>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {pageItems.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-3xl text-night-950">Nenhum imóvel encontrado.</p>
              <p className="mt-3 text-sm text-neutral-500">
                Ajuste os filtros ou fale com um de nossos especialistas.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((property) => (
                <PropertyCard key={property.code} property={property} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Paginação">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setPage(n)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`grid h-11 w-11 place-items-center text-sm font-medium transition-colors ${
                    n === page
                      ? 'bg-night-950 text-white'
                      : 'border border-neutral-200 text-neutral-600 hover:border-night-950 hover:text-night-950'
                  }`}
                >
                  {n}
                </button>
              ))}
            </nav>
          )}
        </div>
      </section>

      <Testimonials />
    </>
  )
}
