import { useState, useEffect } from 'react'
import { X, Filter, Building2, MapPin, Home, DollarSign, Ruler, Star, RotateCcw } from '@/components/icons'
import { useNeighborhoods, usePropertyTypes } from '@/hooks/use-property-facets'
import { buttonClass } from '@/components/ui/button'

export interface FilterState {
  purpose?: string
  type?: string
  neighborhood?: string
  minPrice?: string
  maxPrice?: string
  minArea?: string
  maxArea?: string
  minBedrooms?: string
  minSuites?: string
  minParking?: string
  isFeatured?: boolean
}

interface ListingsFilterSidebarProps {
  currentFilters: FilterState
  onApply: (filters: FilterState) => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
  mode?: 'desktop' | 'mobile' | 'both'
}

export function ListingsFilterSidebar({
  currentFilters,
  onApply,
  isMobileOpen = false,
  onMobileClose,
  mode = 'both',
}: ListingsFilterSidebarProps) {
  const { data: types = [] } = usePropertyTypes()
  const { data: availableNeighborhoods = [] } = useNeighborhoods()
  const propertyTypes = ['Todos os tipos', ...types.map((type) => type.name)]

  const [filters, setFilters] = useState<FilterState>(currentFilters)

  useEffect(() => {
    setFilters(currentFilters)
  }, [currentFilters])

  const handleUpdate = (updates: Partial<FilterState>) => {
    const next = { ...filters, ...updates }
    setFilters(next)
    onApply(next)
  }

  const handleClear = () => {
    const empty: FilterState = {}
    setFilters(empty)
    onApply(empty)
    if (onMobileClose) onMobileClose()
  }

  const activeCount = Object.entries(filters).filter(([_, v]) => {
    if (typeof v === 'boolean') return v
    return v && v !== '' && v !== 'all' && v !== 'Todos os tipos' && v !== 'Todos'
  }).length

  const filterFormContent = (
    <div className="space-y-6">
      {/* Finalidade */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-small font-medium text-ink">
          <Building2 className="h-4 w-4 text-brand-700" />
          <span>Finalidade</span>
        </label>
        <div className="flex rounded-card bg-surface/70 p-1">
          {[
            { id: '', label: 'Todas' },
            { id: 'venda', label: 'Comprar' },
            { id: 'aluguel', label: 'Alugar' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleUpdate({ purpose: item.id || undefined })}
              className={`flex-1 rounded-card py-2 text-small font-medium transition-colors ${
                (filters.purpose ?? '') === item.id
                  ? 'bg-night-950 text-white shadow-xs'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tipo do Imóvel */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-small font-medium text-ink">
          <Building2 className="h-4 w-4 text-brand-700" />
          <span>Tipo de imóvel</span>
        </label>
        <select
          value={filters.type ?? 'Todos os tipos'}
          onChange={(e) =>
            handleUpdate({
              type: e.target.value === 'Todos os tipos' ? undefined : e.target.value,
            })
          }
          className="w-full rounded-card border border-neutral-200 bg-white px-3.5 py-2.5 text-small font-medium text-ink outline-none focus:border-brand-600"
        >
          {propertyTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Localização / Bairro */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-small font-medium text-ink">
          <MapPin className="h-4 w-4 text-brand-700" />
          <span>Bairro</span>
        </label>
        <select
          value={filters.neighborhood ?? 'Todos'}
          onChange={(e) =>
            handleUpdate({
              neighborhood: e.target.value === 'Todos' ? undefined : e.target.value,
            })
          }
          className="w-full rounded-card border border-neutral-200 bg-white px-3.5 py-2.5 text-small font-medium text-ink outline-none focus:border-brand-600"
        >
          <option value="Todos">Todos os bairros</option>
          {availableNeighborhoods.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Cômodos */}
      <div className="space-y-4 pt-2 border-t border-brand-100">
        <label className="flex items-center gap-2 text-small font-medium text-ink">
          <Home className="h-4 w-4 text-brand-700" />
          <span>Cômodos (mínimo)</span>
        </label>

        <div>
          <span className="mb-1.5 block text-small text-muted">Dormitórios</span>
          <div className="flex gap-1.5">
            {['', '1', '2', '3', '4+'].map((val) => (
              <button
                key={val || 'any'}
                type="button"
                onClick={() =>
                  handleUpdate({ minBedrooms: val === '4+' ? '4' : val || undefined })
                }
                className={`flex-1 rounded-card border py-2 text-small font-medium transition-colors ${
                  (filters.minBedrooms ?? '') === (val === '4+' ? '4' : val)
                    ? 'border-brand-600 bg-brand-50 text-brand-950 font-semibold'
                    : 'border-neutral-200 bg-white text-muted hover:border-neutral-400 hover:text-ink'
                }`}
              >
                {val || 'Todos'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-small text-muted">Suítes</span>
          <div className="flex gap-1.5">
            {['', '1', '2', '3', '4+'].map((val) => (
              <button
                key={val || 'any'}
                type="button"
                onClick={() =>
                  handleUpdate({ minSuites: val === '4+' ? '4' : val || undefined })
                }
                className={`flex-1 rounded-card border py-2 text-small font-medium transition-colors ${
                  (filters.minSuites ?? '') === (val === '4+' ? '4' : val)
                    ? 'border-brand-600 bg-brand-50 text-brand-950 font-semibold'
                    : 'border-neutral-200 bg-white text-muted hover:border-neutral-400 hover:text-ink'
                }`}
              >
                {val || 'Todas'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-small text-muted">Vagas de garagem</span>
          <div className="flex gap-1.5">
            {['', '1', '2', '3', '4+'].map((val) => (
              <button
                key={val || 'any'}
                type="button"
                onClick={() =>
                  handleUpdate({ minParking: val === '4+' ? '4' : val || undefined })
                }
                className={`flex-1 rounded-card border py-2 text-small font-medium transition-colors ${
                  (filters.minParking ?? '') === (val === '4+' ? '4' : val)
                    ? 'border-brand-600 bg-brand-50 text-brand-950 font-semibold'
                    : 'border-neutral-200 bg-white text-muted hover:border-neutral-400 hover:text-ink'
                }`}
              >
                {val || 'Todas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="pt-2 border-t border-brand-100 space-y-2.5">
        <label className="flex items-center gap-2 text-small font-medium text-ink">
          <DollarSign className="h-4 w-4 text-brand-700" />
          <span>Faixa de preço (R$)</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="mb-1 block text-small text-muted">Mínimo</span>
            <input
              type="number"
              placeholder="R$ 0"
              value={filters.minPrice ?? ''}
              onChange={(e) => handleUpdate({ minPrice: e.target.value || undefined })}
              className="w-full rounded-card border border-neutral-200 bg-white px-3 py-2 text-body text-ink outline-none focus:border-brand-600"
            />
          </div>
          <div>
            <span className="mb-1 block text-small text-muted">Máximo</span>
            <input
              type="number"
              placeholder="R$ 30M"
              value={filters.maxPrice ?? ''}
              onChange={(e) => handleUpdate({ maxPrice: e.target.value || undefined })}
              className="w-full rounded-card border border-neutral-200 bg-white px-3 py-2 text-body text-ink outline-none focus:border-brand-600"
            />
          </div>
        </div>
      </div>

      {/* Faixa de Área */}
      <div className="pt-2 border-t border-brand-100 space-y-2.5">
        <label className="flex items-center gap-2 text-small font-medium text-ink">
          <Ruler className="h-4 w-4 text-brand-700" />
          <span>Área privativa (m²)</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="mb-1 block text-small text-muted">Mínima</span>
            <input
              type="number"
              placeholder="0 m²"
              value={filters.minArea ?? ''}
              onChange={(e) => handleUpdate({ minArea: e.target.value || undefined })}
              className="w-full rounded-card border border-neutral-200 bg-white px-3 py-2 text-body text-ink outline-none focus:border-brand-600"
            />
          </div>
          <div>
            <span className="mb-1 block text-small text-muted">Máxima</span>
            <input
              type="number"
              placeholder="2000 m²"
              value={filters.maxArea ?? ''}
              onChange={(e) => handleUpdate({ maxArea: e.target.value || undefined })}
              className="w-full rounded-card border border-neutral-200 bg-white px-3 py-2 text-body text-ink outline-none focus:border-brand-600"
            />
          </div>
        </div>
      </div>

      {/* Opções Adicionais */}
      <div className="pt-2 border-t border-brand-100">
        <label className="flex items-center gap-2.5 select-none">
          <input
            type="checkbox"
            checked={filters.isFeatured ?? false}
            onChange={(e) => handleUpdate({ isFeatured: e.target.checked })}
            className="h-4 w-4 rounded-sm accent-brand-500 cursor-pointer"
          />
          <span className="flex items-center gap-1.5 text-small font-medium text-ink">
            <Star className="h-4 w-4 text-brand-600" />
            Apenas imóveis em destaque
          </span>
        </label>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      {(mode === 'desktop' || mode === 'both') && (
        <div className="rounded-card bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="mb-5 flex items-center justify-between border-b border-brand-100 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-card bg-surface text-ink">
                <Filter className="h-4 w-4" />
              </span>
              <h3 className="font-display text-xl font-light text-ink">Filtros</h3>
              {activeCount > 0 && (
                <span className="rounded-card bg-brand-500 px-2 py-0.5 text-small font-bold text-night-950">
                  {activeCount}
                </span>
              )}
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-small font-medium text-muted hover:text-ink transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Limpar</span>
              </button>
            )}
          </div>

          {filterFormContent}
        </div>
      )}

      {/* Mobile Drawer (Slide-over) */}
      {(mode === 'mobile' || mode === 'both') && isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-night-950/70 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-brand-100 pb-4">
              <div className="flex items-center gap-2.5">
                <Filter className="h-5 w-5 text-brand-700" />
                <h3 className="font-display text-2xl font-light text-ink">Filtros de busca</h3>
                {activeCount > 0 && (
                  <span className="rounded-card bg-brand-500 px-2.5 py-0.5 text-small font-bold text-night-950">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onMobileClose}
                aria-label="Fechar painel de filtros"
                className="grid h-11 w-11 place-items-center rounded-card text-muted hover:bg-surface hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">{filterFormContent}</div>

            <div className="mt-6 border-t border-brand-100 pt-4 flex gap-3">
              <button
                type="button"
                onClick={handleClear}
                className={buttonClass({
                  variant: 'outline',
                  size: 'md',
                  className: 'flex-1 font-medium',
                })}
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={onMobileClose}
                className={buttonClass({
                  variant: 'accent',
                  size: 'md',
                  className: 'flex-1 font-semibold',
                })}
              >
                Ver resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
