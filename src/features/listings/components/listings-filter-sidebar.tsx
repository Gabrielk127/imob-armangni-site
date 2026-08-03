import { useState, useEffect } from 'react'
import { X, Filter, Building2, MapPin, Home, DollarSign, Ruler, Star, RotateCcw } from '@/components/icons'
import { useNeighborhoods, usePropertyTypes } from '@/hooks/use-property-facets'

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
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <Building2 className="h-3.5 w-3.5 text-brand-500" />
          Finalidade
        </label>
        <div className="flex rounded-lg border border-neutral-200 bg-neutral-50 p-1">
          {[
            { id: '', label: 'Todas' },
            { id: 'venda', label: 'Comprar' },
            { id: 'aluguel', label: 'Alugar' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleUpdate({ purpose: item.id || undefined })}
              className={`flex-1 rounded-md py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                (filters.purpose ?? '') === item.id
                  ? 'bg-night-950 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-night-950'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tipo do Imóvel */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <Building2 className="h-3.5 w-3.5 text-brand-500" />
          Tipo de Imóvel
        </label>
        <select
          value={filters.type ?? 'Todos os tipos'}
          onChange={(e) =>
            handleUpdate({
              type: e.target.value === 'Todos os tipos' ? undefined : e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-night-950 cursor-pointer outline-none focus:border-brand-500"
        >
          {propertyTypes.map((t) => (
            <option key={t} value={t} className="cursor-pointer">
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Localização / Bairro */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <MapPin className="h-3.5 w-3.5 text-brand-500" />
          Bairro
        </label>
        <select
          value={filters.neighborhood ?? 'Todos'}
          onChange={(e) =>
            handleUpdate({
              neighborhood: e.target.value === 'Todos' ? undefined : e.target.value,
            })
          }
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-night-950 cursor-pointer outline-none focus:border-brand-500"
        >
          <option value="Todos" className="cursor-pointer">Todos os bairros</option>
          {availableNeighborhoods.map((b) => (
            <option key={b} value={b} className="cursor-pointer">
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Cômodos */}
      <div className="space-y-3 pt-1 border-t border-neutral-100">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <Home className="h-3.5 w-3.5 text-brand-500" />
          Cômodos (Mínimo)
        </label>

        <div>
          <span className="mb-1 block text-[11px] font-medium text-neutral-500">Dormitórios</span>
          <div className="flex gap-1">
            {['', '1', '2', '3', '4+'].map((val) => (
              <button
                key={val || 'any'}
                type="button"
                onClick={() =>
                  handleUpdate({ minBedrooms: val === '4+' ? '4' : val || undefined })
                }
                className={`flex-1 rounded-md border py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                  (filters.minBedrooms ?? '') === (val === '4+' ? '4' : val)
                    ? 'border-brand-500 bg-brand-50 text-brand-900'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                {val || 'Todos'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-1 block text-[11px] font-medium text-neutral-500">Suítes</span>
          <div className="flex gap-1">
            {['', '1', '2', '3', '4+'].map((val) => (
              <button
                key={val || 'any'}
                type="button"
                onClick={() =>
                  handleUpdate({ minSuites: val === '4+' ? '4' : val || undefined })
                }
                className={`flex-1 rounded-md border py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                  (filters.minSuites ?? '') === (val === '4+' ? '4' : val)
                    ? 'border-brand-500 bg-brand-50 text-brand-900'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                {val || 'Todas'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-1 block text-[11px] font-medium text-neutral-500">Vagas de Garagem</span>
          <div className="flex gap-1">
            {['', '1', '2', '3', '4+'].map((val) => (
              <button
                key={val || 'any'}
                type="button"
                onClick={() =>
                  handleUpdate({ minParking: val === '4+' ? '4' : val || undefined })
                }
                className={`flex-1 rounded-md border py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                  (filters.minParking ?? '') === (val === '4+' ? '4' : val)
                    ? 'border-brand-500 bg-brand-50 text-brand-900'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                }`}
              >
                {val || 'Todas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Faixa de Preço */}
      <div className="pt-1 border-t border-neutral-100 space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <DollarSign className="h-3.5 w-3.5 text-brand-500" />
          Faixa de Preço (R$)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="mb-1 block text-[10px] text-neutral-400">Mínimo</span>
            <input
              type="number"
              placeholder="R$ 0"
              value={filters.minPrice ?? ''}
              onChange={(e) => handleUpdate({ minPrice: e.target.value || undefined })}
              className="w-full rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-night-950 outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <span className="mb-1 block text-[10px] text-neutral-400">Máximo</span>
            <input
              type="number"
              placeholder="R$ 30M"
              value={filters.maxPrice ?? ''}
              onChange={(e) => handleUpdate({ maxPrice: e.target.value || undefined })}
              className="w-full rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-night-950 outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Faixa de Área */}
      <div className="pt-1 border-t border-neutral-100 space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          <Ruler className="h-3.5 w-3.5 text-brand-500" />
          Área Útil (m²)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="mb-1 block text-[10px] text-neutral-400">Mínima</span>
            <input
              type="number"
              placeholder="0 m²"
              value={filters.minArea ?? ''}
              onChange={(e) => handleUpdate({ minArea: e.target.value || undefined })}
              className="w-full rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-night-950 outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <span className="mb-1 block text-[10px] text-neutral-400">Máxima</span>
            <input
              type="number"
              placeholder="2000 m²"
              value={filters.maxArea ?? ''}
              onChange={(e) => handleUpdate({ maxArea: e.target.value || undefined })}
              className="w-full rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-night-950 outline-none focus:border-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Opções Adicionais */}
      <div className="pt-1 border-t border-neutral-100">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.isFeatured ?? false}
            onChange={(e) => handleUpdate({ isFeatured: e.target.checked })}
            className="h-4 w-4 rounded accent-brand-500 cursor-pointer"
          />
          <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 cursor-pointer">
            <Star className="h-3.5 w-3.5 text-brand-500" />
            Imóveis em destaque
          </span>
        </label>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar Card */}
      {(mode === 'desktop' || mode === 'both') && (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm ring-1 ring-neutral-950/5">
          <div className="mb-5 flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#BFB4AA]/20 text-night-950">
                <Filter className="h-4 w-4" />
              </span>
              <h3 className="font-display text-lg font-medium text-night-950">Filtros</h3>
              {activeCount > 0 && (
                <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-night-950">
                  {activeCount}
                </span>
              )}
            </div>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 hover:text-night-950 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                Limpar
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
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white p-6 shadow-2xl transition-transform">
            <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-brand-500" />
                <h3 className="font-display text-lg font-medium text-night-950">Filtros</h3>
                {activeCount > 0 && (
                  <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-night-950">
                    {activeCount}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={onMobileClose}
                className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-night-950"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">{filterFormContent}</div>

            <div className="mt-6 border-t border-neutral-100 pt-4 flex gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 rounded-lg border border-neutral-200 bg-white py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:bg-neutral-50"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={onMobileClose}
                className="flex-1 rounded-lg bg-brand-500 py-2.5 text-xs font-semibold uppercase tracking-wider text-night-950 hover:bg-brand-400"
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
