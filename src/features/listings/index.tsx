import { useEffect, useMemo, useState } from 'react'
import { useListingsSearch } from '@/hooks/use-listings-search'
import { ChevronDown, ChevronLeft, ChevronRight, Map, Search, SlidersHorizontal, X } from '@/components/icons'
import { usePropertiesList } from '@/hooks/use-properties-list'
import { usePropertyTypes } from '@/hooks/use-property-facets'
import { PropertyCard } from '@/components/property-card'
import { ListingsFilterSidebar } from '@/features/listings/components/listings-filter-sidebar'
import type { FilterState } from '@/features/listings/components/listings-filter-sidebar'

const PAGE_SIZE = 9

type SortKey = 'preco-desc' | 'preco-asc' | 'area-desc'

/** Campos numéricos chegam da URL como texto. */
function toNumber(value?: string) {
  const parsed = Number(value)
  return value && Number.isFinite(parsed) ? parsed : undefined
}

function getPaginationRange(currentPage: number, totalPages: number) {
  const delta = 1
  const range: (number | 'ellipsis')[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i)
    } else if (range[range.length - 1] !== 'ellipsis') {
      range.push('ellipsis')
    }
  }

  return range
}

const sortLabels: Record<SortKey, string> = {
  'preco-desc': 'Maior preço',
  'preco-asc': 'Menor preço',
  'area-desc': 'Maior área',
}

export function Listings() {
  const [params, setParams] = useListingsSearch()
  const [sort, setSort] = useState<SortKey>('preco-desc')
  const [page, setPage] = useState(1)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const currentFilters: FilterState = useMemo(
    () => ({
      purpose: params.get('finalidade') ?? undefined,
      type: params.get('tipo') ?? undefined,
      neighborhood: params.get('bairro') ?? undefined,
      minPrice: params.get('minPreco') ?? undefined,
      maxPrice: params.get('maxPreco') ?? undefined,
      minArea: params.get('minArea') ?? undefined,
      maxArea: params.get('maxArea') ?? undefined,
      minBedrooms: params.get('quartos') ?? undefined,
      minSuites: params.get('suites') ?? undefined,
      minParking: params.get('vagas') ?? undefined,
      isFeatured: params.get('destaque') === 'true' ? true : undefined,
    }),
    [params]
  )

  const query = params.get('q') ?? ''

  useEffect(() => {
    setPage(1)
  }, [params, sort])

  // O select do site guarda o nome do tipo; a API filtra por id.
  const { data: propertyTypes = [] } = usePropertyTypes()
  const typeId = propertyTypes.find(
    (item) => item.name === currentFilters.type
  )?.id

  // Filtro, ordenação e paginação acontecem na API — a tela só traduz os
  // parâmetros da URL para a query pública.
  const [sortBy, sortOrder] =
    sort === 'area-desc'
      ? (['area', 'desc'] as const)
      : sort === 'preco-asc'
        ? (['price', 'asc'] as const)
        : (['price', 'desc'] as const)

  const { data, isPending, isPaused, isError, isPlaceholderData, refetch } =
    usePropertiesList({
    page,
    limit: PAGE_SIZE,
    search: query || undefined,
    purpose:
      currentFilters.purpose === 'venda'
        ? 'SALE'
        : currentFilters.purpose === 'aluguel'
          ? 'RENT'
          : undefined,
    typeId: currentFilters.type ? (typeId ?? '__sem-correspondencia__') : undefined,
    neighborhood: currentFilters.neighborhood,
    minPrice: toNumber(currentFilters.minPrice),
    maxPrice: toNumber(currentFilters.maxPrice),
    minArea: toNumber(currentFilters.minArea),
    maxArea: toNumber(currentFilters.maxArea),
    minBedrooms: toNumber(currentFilters.minBedrooms),
    minSuites: toNumber(currentFilters.minSuites),
    minParkingSpaces: toNumber(currentFilters.minParking),
    isFeatured: currentFilters.isFeatured || undefined,
    sortBy,
    sortOrder,
  })

  const results = data?.data ?? []
  const total = data?.meta.total ?? 0
  const totalPages = Math.max(1, data?.meta.totalPages ?? 1)
  const pageItems = results

  const heading =
    currentFilters.purpose === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis para comprar'

  const activeFiltersCount = Object.entries(currentFilters).filter(
    ([_, v]) => v !== undefined && v !== false
  ).length

  const handleApplyFilters = (newFilters: FilterState) => {
    const next = new URLSearchParams(params)

    const setOrDelete = (paramKey: string, val?: string | boolean) => {
      if (val !== undefined && val !== '' && val !== false) {
        next.set(paramKey, String(val))
      } else {
        next.delete(paramKey)
      }
    }

    setOrDelete('finalidade', newFilters.purpose)
    setOrDelete('tipo', newFilters.type)
    setOrDelete('bairro', newFilters.neighborhood)
    setOrDelete('minPreco', newFilters.minPrice)
    setOrDelete('maxPreco', newFilters.maxPrice)
    setOrDelete('minArea', newFilters.minArea)
    setOrDelete('maxArea', newFilters.maxArea)
    setOrDelete('quartos', newFilters.minBedrooms)
    setOrDelete('suites', newFilters.minSuites)
    setOrDelete('vagas', newFilters.minParking)
    setOrDelete('destaque', newFilters.isFeatured)

    setParams(next)
  }

  const removeFilterKey = (key: string) => {
    const next = new URLSearchParams(params)
    next.delete(key)
    setParams(next)
  }

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 pt-28 pb-10 sm:pt-36 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-3 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-500">
            <span className="h-px w-10 bg-brand-500/60" />
            Portfólio Armangni
          </p>
          <h1 className="font-display text-4xl font-medium text-night-950 sm:text-5xl">
            {currentFilters.type ?? heading}
            {query && <span className="text-neutral-400"> · “{params.get('q')}”</span>}
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Foram encontrados <span className="font-semibold text-night-950">{total}</span>{' '}
            {total === 1 ? 'imóvel' : 'imóveis'} para sua busca.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50/50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            {/* Sidebar Lateral no Desktop */}
            <aside className="hidden lg:block lg:w-72 xl:w-80 lg:shrink-0 sticky lg:top-24">
              <ListingsFilterSidebar
                mode="desktop"
                currentFilters={currentFilters}
                onApply={handleApplyFilters}
              />
            </aside>

            {/* Conteúdo Principal (Barra de ferramentas + Grid de Imóveis) */}
            <main className="flex-1 min-w-0 space-y-6">
              {/* Barra de Ferramentas */}
              <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 shadow-sm border border-neutral-200">
                <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2">
                  <Search className="h-4 w-4 shrink-0 text-neutral-400" />
                  <input
                    defaultValue={params.get('q') ?? ''}
                    key={params.get('q') ?? ''}
                    placeholder="Buscar por bairro, cidade, código..."
                    className="w-full bg-transparent text-xs text-night-950 outline-none placeholder:text-neutral-400 sm:text-sm"
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

                {/* Botão de Filtros no Mobile */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-night-950 transition-colors hover:bg-brand-400 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>

                <label className="relative flex items-center rounded-xl border border-neutral-200 bg-white">
                  <span className="sr-only">Ordenar por</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortKey)}
                    className="appearance-none bg-transparent py-2 pl-3.5 pr-8 text-xs font-medium text-night-950 outline-none sm:text-sm"
                  >
                    {Object.entries(sortLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-neutral-400" />
                </label>

                <button
                  type="button"
                  className="hidden sm:flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 transition-colors hover:border-night-950 hover:text-night-950"
                >
                  <Map className="h-4 w-4" />
                  Mapa
                </button>
              </div>

              {/* Tags de Filtros Ativos */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200/80 bg-white p-3 shadow-xs">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Filtros ativos:
                  </span>
                  {currentFilters.purpose && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      {currentFilters.purpose === 'venda' ? 'Comprar' : 'Alugar'}
                      <button type="button" onClick={() => removeFilterKey('finalidade')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.type && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      {currentFilters.type}
                      <button type="button" onClick={() => removeFilterKey('tipo')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.neighborhood && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      {currentFilters.neighborhood}
                      <button type="button" onClick={() => removeFilterKey('bairro')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minBedrooms && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      {currentFilters.minBedrooms}+ quartos
                      <button type="button" onClick={() => removeFilterKey('quartos')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minSuites && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      {currentFilters.minSuites}+ suítes
                      <button type="button" onClick={() => removeFilterKey('suites')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minParking && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      {currentFilters.minParking}+ vagas
                      <button type="button" onClick={() => removeFilterKey('vagas')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minPrice && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      Min: R$ {Number(currentFilters.minPrice).toLocaleString('pt-BR')}
                      <button type="button" onClick={() => removeFilterKey('minPreco')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.maxPrice && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      Max: R$ {Number(currentFilters.maxPrice).toLocaleString('pt-BR')}
                      <button type="button" onClick={() => removeFilterKey('maxPreco')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minArea && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      Min: {currentFilters.minArea} m²
                      <button type="button" onClick={() => removeFilterKey('minArea')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.maxArea && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      Max: {currentFilters.maxArea} m²
                      <button type="button" onClick={() => removeFilterKey('maxArea')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}
                  {currentFilters.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-night-950">
                      Destaques
                      <button type="button" onClick={() => removeFilterKey('destaque')}>
                        <X className="h-3 w-3 text-neutral-400 hover:text-night-950" />
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setParams(new URLSearchParams())}
                    className="ml-auto text-[11px] font-semibold uppercase tracking-wider text-brand-600 hover:underline"
                  >
                    Limpar todos
                  </button>
                </div>
              )}

              {/* Grid de Imóveis (3 cards por linha) */}
              {isPending && !isPaused ? (
                <div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  aria-busy="true"
                  aria-label="Carregando imóveis"
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
                    >
                      <div className="aspect-[4/3] w-full animate-pulse bg-neutral-100" />
                      <div className="space-y-3 p-5">
                        <div className="h-3 w-24 animate-pulse rounded bg-neutral-100" />
                        <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-100" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : isError || isPaused ? (
                <div className="rounded-2xl border border-neutral-200 bg-white py-24 text-center">
                  <p className="font-display text-3xl text-night-950">
                    Não foi possível carregar os imóveis.
                  </p>
                  <p className="mt-3 text-sm text-neutral-500">
                    {isPaused
                      ? 'Você parece estar sem conexão. Assim que a internet voltar, tente de novo.'
                      : 'Verifique sua conexão e tente novamente.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => void refetch()}
                    className="mt-6 border border-night-950 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-night-950 transition-colors hover:bg-night-950 hover:text-white"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : pageItems.length === 0 ? (
                <div className="rounded-2xl border border-neutral-200 bg-white py-24 text-center">
                  <p className="font-display text-3xl text-night-950">Nenhum imóvel encontrado.</p>
                  <p className="mt-3 text-sm text-neutral-500">
                    Ajuste os filtros laterais ou fale com um de nossos especialistas.
                  </p>
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setParams(new URLSearchParams())}
                      className="mt-6 border border-night-950 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-night-950 transition-colors hover:bg-night-950 hover:text-white"
                    >
                      Limpar filtros
                    </button>
                  )}
                </div>
              ) : (
                <div
                  className={`grid gap-6 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${
                    isPlaceholderData ? 'opacity-60' : ''
                  }`}
                >
                  {pageItems.map((property) => (
                    <PropertyCard key={property.code} property={property} />
                  ))}
                </div>
              )}

              {/* Paginação */}
              {totalPages > 1 && (
                <nav className="pt-8 flex items-center justify-center gap-2" aria-label="Paginação">
                  <button
                    type="button"
                    onClick={() => {
                      if (page > 1) {
                        setPage(page - 1)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    disabled={page === 1}
                    aria-label="Página anterior"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-night-950 hover:text-night-950 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {getPaginationRange(page, totalPages).map((item, idx) =>
                    item === 'ellipsis' ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="grid h-10 w-8 place-items-center text-sm font-medium text-neutral-400 select-none"
                      >
                        •••
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setPage(item)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-medium transition-colors ${
                          item === page
                            ? 'bg-night-950 text-white shadow-sm'
                            : 'border border-neutral-200 bg-white text-neutral-600 hover:border-night-950 hover:text-night-950'
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (page < totalPages) {
                        setPage(page + 1)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    disabled={page === totalPages}
                    aria-label="Próxima página"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-night-950 hover:text-night-950 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Drawer Sidebar */}
      <ListingsFilterSidebar
        mode="mobile"
        currentFilters={currentFilters}
        onApply={handleApplyFilters}
        isMobileOpen={isMobileFilterOpen}
        onMobileClose={() => setIsMobileFilterOpen(false)}
      />
    </>
  )
}
