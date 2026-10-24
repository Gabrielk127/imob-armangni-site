import { useEffect, useMemo, useState } from 'react'
import { useListingsSearch } from '@/hooks/use-listings-search'
import { ChevronDown, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from '@/components/icons'
import { usePropertiesList } from '@/hooks/use-properties-list'
import { usePropertyTypes } from '@/hooks/use-property-facets'
import { PropertyCard } from '@/components/property-card'
import { ListingsFilterSidebar } from '@/features/listings/components/listings-filter-sidebar'
import type { FilterState } from '@/features/listings/components/listings-filter-sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { buttonClass } from '@/components/ui/button'

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
  'area-desc': 'Maior área útil',
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

  // Filtro, ordenação e paginação acontecem na API
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
    currentFilters.purpose === 'aluguel' ? 'Imóveis para alugar' : 'Imóveis à venda'

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
    <div className="min-h-screen bg-paper pb-24">
      {/* Cabeçalho da Listagem */}
      <section className="bg-surface/60 pt-28 pb-10 sm:pt-36 sm:pb-12">
        <div className="container-page">
          <p className="text-small font-medium tracking-wide text-brand-800">
            Portfólio Armangni
          </p>
          <h1 className="mt-2 font-display text-head font-light tracking-tight text-ink">
            {currentFilters.type ? `${currentFilters.type}s` : heading}
            {query && <span className="text-muted"> · “{query}”</span>}
          </h1>
          <p className="mt-2 text-body text-muted">
            Encontramos <span className="font-semibold text-ink">{total}</span>{' '}
            {total === 1 ? 'imóvel disponível' : 'imóveis disponíveis'} de acordo com seus critérios.
          </p>
        </div>
      </section>

      {/* Seção Principal de Filtros e Resultados */}
      <section className="py-8">
        <div className="container-page">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
            {/* Sidebar Lateral no Desktop */}
            <aside className="hidden lg:block lg:w-72 xl:w-80 lg:shrink-0 sticky lg:top-24">
              <ListingsFilterSidebar
                mode="desktop"
                currentFilters={currentFilters}
                onApply={handleApplyFilters}
              />
            </aside>

            {/* Conteúdo Principal (Barra de ferramentas + Grid) */}
            <main className="flex-1 min-w-0 space-y-6">
              {/* Barra de Ferramentas Superior */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-card bg-white p-3 shadow-[var(--shadow-card)]">
                <label className="flex w-full sm:flex-1 items-center gap-3 rounded-card bg-surface/60 px-3.5 py-2.5">
                  <Search className="h-4 w-4 shrink-0 text-muted" />
                  <input
                    defaultValue={params.get('q') ?? ''}
                    key={params.get('q') ?? ''}
                    placeholder="Bairro, cidade, empreendimento, código..."
                    className="w-full bg-transparent text-body text-ink outline-none placeholder:text-muted"
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

                <div className="flex items-center gap-3 justify-between sm:justify-start">
                  {/* Botão de Filtros no Mobile */}
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-card bg-brand-500 px-4 py-2.5 text-small font-semibold tracking-wide text-night-950 transition-colors hover:bg-brand-400 lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                  </button>

                  {/* Ordenação */}
                  <label className="relative flex-1 sm:flex-none flex items-center justify-between rounded-card bg-surface/60">
                    <span className="sr-only">Ordenar imóveis por</span>
                    <select
                      value={sort}
                      onChange={(event) => setSort(event.target.value as SortKey)}
                      className="w-full sm:w-auto appearance-none bg-transparent py-2.5 pl-3.5 pr-8 text-small font-medium text-ink outline-none cursor-pointer"
                    >
                      {Object.entries(sortLabels).map(([value, label]) => (
                        <option key={value} value={value} className="text-ink">
                          {label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted" />
                  </label>
                </div>
              </div>

              {/* Tags de Filtros Ativos */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 rounded-card bg-white p-3 shadow-xs">
                  <span className="text-small font-medium text-muted">
                    Filtros ativos:
                  </span>
                  {currentFilters.purpose && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      {currentFilters.purpose === 'venda' ? 'Comprar' : 'Alugar'}
                      <button type="button" onClick={() => removeFilterKey('finalidade')} aria-label="Remover filtro de finalidade">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}
                  {currentFilters.type && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      {currentFilters.type}
                      <button type="button" onClick={() => removeFilterKey('tipo')} aria-label="Remover filtro de tipo">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}
                  {currentFilters.neighborhood && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      {currentFilters.neighborhood}
                      <button type="button" onClick={() => removeFilterKey('bairro')} aria-label="Remover filtro de bairro">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minBedrooms && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      {currentFilters.minBedrooms}+ quartos
                      <button type="button" onClick={() => removeFilterKey('quartos')} aria-label="Remover filtro de quartos">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minSuites && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      {currentFilters.minSuites}+ suítes
                      <button type="button" onClick={() => removeFilterKey('suites')} aria-label="Remover filtro de suítes">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minParking && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      {currentFilters.minParking}+ vagas
                      <button type="button" onClick={() => removeFilterKey('vagas')} aria-label="Remover filtro de vagas">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}
                  {currentFilters.minPrice && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      Mín: R$ {Number(currentFilters.minPrice).toLocaleString('pt-BR')}
                      <button type="button" onClick={() => removeFilterKey('minPreco')} aria-label="Remover filtro de preço mínimo">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}
                  {currentFilters.maxPrice && (
                    <span className="inline-flex items-center gap-1.5 rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                      Máx: R$ {Number(currentFilters.maxPrice).toLocaleString('pt-BR')}
                      <button type="button" onClick={() => removeFilterKey('maxPreco')} aria-label="Remover filtro de preço máximo">
                        <X className="h-3.5 w-3.5 text-muted hover:text-ink" />
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setParams(new URLSearchParams())}
                    className="ml-auto text-small font-semibold text-brand-800 hover:underline"
                  >
                    Limpar todos
                  </button>
                </div>
              )}

              {/* Grid de Imóveis */}
              {isPending && !isPaused ? (
                <div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  aria-busy="true"
                  aria-label="Carregando imóveis"
                >
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-card bg-white p-4 shadow-[var(--shadow-card)] space-y-3"
                    >
                      <Skeleton className="aspect-[4/3] w-full" />
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : isError || isPaused ? (
                <div className="rounded-card bg-white p-16 text-center shadow-[var(--shadow-card)]">
                  <h3 className="font-display text-2xl font-light text-ink">
                    Não foi possível carregar os imóveis no momento.
                  </h3>
                  <p className="mt-2 text-body text-muted">
                    {isPaused
                      ? 'Você parece estar sem conexão com a internet. Tente novamente assim que reconectar.'
                      : 'Verifique sua conexão e tente novamente.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => void refetch()}
                    className={buttonClass({
                      variant: 'primary',
                      size: 'md',
                      className: 'mt-6 font-semibold',
                    })}
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : pageItems.length === 0 ? (
                <div className="rounded-card bg-white p-16 text-center shadow-[var(--shadow-card)]">
                  <h3 className="font-display text-2xl font-light text-ink">
                    Nenhum imóvel encontrado para os filtros selecionados.
                  </h3>
                  <p className="mt-2 text-body text-muted">
                    Tente relaxar alguns filtros laterais ou busque por outra região de Londrina.
                  </p>
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setParams(new URLSearchParams())}
                      className={buttonClass({
                        variant: 'primary',
                        size: 'md',
                        className: 'mt-6 font-semibold',
                      })}
                    >
                      Limpar todos os filtros
                    </button>
                  )}
                </div>
              ) : (
                <div
                  className={`grid gap-6 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 ${
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
                    className="grid h-11 w-11 place-items-center rounded-card border border-neutral-200 bg-white text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {getPaginationRange(page, totalPages).map((item, idx) =>
                    item === 'ellipsis' ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="grid h-11 w-8 place-items-center text-body font-medium text-muted select-none"
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
                        className={`grid h-11 w-11 place-items-center rounded-card text-small font-medium transition-colors ${
                          item === page
                            ? 'bg-night-950 text-white shadow-xs'
                            : 'border border-neutral-200 bg-white text-ink hover:border-ink'
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
                    className="grid h-11 w-11 place-items-center rounded-card border border-neutral-200 bg-white text-ink transition-colors hover:border-ink disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Drawer de Filtros Mobile */}
      <ListingsFilterSidebar
        mode="mobile"
        currentFilters={currentFilters}
        onApply={handleApplyFilters}
        isMobileOpen={isMobileFilterOpen}
        onMobileClose={() => setIsMobileFilterOpen(false)}
      />
    </div>
  )
}
