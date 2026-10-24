import { useState, useEffect } from 'react'
import { X, Filter, Building2, MapPin, Home, DollarSign, Ruler, Star, Check } from '@/components/icons'
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

interface ListingsFilterModalProps {
  isOpen: boolean
  onClose: () => void
  currentFilters: FilterState
  onApply: (filters: FilterState) => void
}

export function ListingsFilterModal({
  isOpen,
  onClose,
  currentFilters,
  onApply,
}: ListingsFilterModalProps) {
  const { data: types = [] } = usePropertyTypes()
  const { data: availableNeighborhoods = [] } = useNeighborhoods()
  const propertyTypes = ['Todos os tipos', ...types.map((type) => type.name)]

  const [filters, setFilters] = useState<FilterState>(currentFilters)

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters)
    }
  }, [isOpen, currentFilters])

  if (!isOpen) return null

  const handleClear = () => {
    const empty: FilterState = {}
    setFilters(empty)
    onApply(empty)
    onClose()
  }

  const handleApply = () => {
    onApply(filters)
    onClose()
  }

  const activeCount = Object.entries(filters).filter(([_, v]) => {
    if (typeof v === 'boolean') return v
    return v && v !== '' && v !== 'all' && v !== 'Todos os tipos' && v !== 'Todos'
  }).length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-night-950/80 p-4 backdrop-blur-sm sm:p-6">
      <div
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/80 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#BFB4AA]/20 text-night-950">
              <Filter className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-display text-xl font-medium text-night-950">
                Filtros Avançados
              </h3>
              <p className="text-xs text-neutral-500">
                Refine sua busca para encontrar o imóvel ideal.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-200/60 hover:text-night-950"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Finalidade e Tipo */}
          <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <Building2 className="h-4 w-4 text-brand-500" />
              Classificação do Imóvel
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-600">
                  Finalidade
                </label>
                <div className="flex rounded-lg border border-neutral-200 bg-white p-1">
                  {[
                    { id: '', label: 'Todas' },
                    { id: 'venda', label: 'Comprar' },
                    { id: 'aluguel', label: 'Alugar' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFilters({ ...filters, purpose: item.id || undefined })}
                      className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
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

              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-600">
                  Tipo do Imóvel
                </label>
                <select
                  value={filters.type ?? 'Todos os tipos'}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      type: e.target.value === 'Todos os tipos' ? undefined : e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-night-950 outline-none focus:border-brand-500"
                >
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Localização */}
          <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <MapPin className="h-4 w-4 text-brand-500" />
              Localização
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-600">
                  Bairro
                </label>
                <select
                  value={filters.neighborhood ?? 'Todos'}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      neighborhood: e.target.value === 'Todos' ? undefined : e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-night-950 outline-none focus:border-brand-500"
                >
                  <option value="Todos">Todos os bairros</option>
                  {availableNeighborhoods.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-600">
                  Cidade
                </label>
                <input
                  type="text"
                  disabled
                  value="Londrina - PR"
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-2 text-xs text-neutral-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Cômodos */}
          <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 space-y-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <Home className="h-4 w-4 text-brand-500" />
              Cômodos (Mínimo)
            </h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-600">
                  Dormitórios
                </label>
                <div className="flex gap-1.5">
                  {['', '1', '2', '3', '4+'].map((val) => (
                    <button
                      key={val || 'any'}
                      type="button"
                      onClick={() =>
                        setFilters({ ...filters, minBedrooms: val === '4+' ? '4' : val || undefined })
                      }
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                        (filters.minBedrooms ?? '') === (val === '4+' ? '4' : val)
                          ? 'border-brand-500 bg-brand-50 text-brand-900'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {val || 'Qualquer'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-600">
                  Suítes
                </label>
                <div className="flex gap-1.5">
                  {['', '1', '2', '3', '4+'].map((val) => (
                    <button
                      key={val || 'any'}
                      type="button"
                      onClick={() =>
                        setFilters({ ...filters, minSuites: val === '4+' ? '4' : val || undefined })
                      }
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                        (filters.minSuites ?? '') === (val === '4+' ? '4' : val)
                          ? 'border-brand-500 bg-brand-50 text-brand-900'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {val || 'Qualquer'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-600">
                  Vagas de Garagem
                </label>
                <div className="flex gap-1.5">
                  {['', '1', '2', '3', '4+'].map((val) => (
                    <button
                      key={val || 'any'}
                      type="button"
                      onClick={() =>
                        setFilters({ ...filters, minParking: val === '4+' ? '4' : val || undefined })
                      }
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                        (filters.minParking ?? '') === (val === '4+' ? '4' : val)
                          ? 'border-brand-500 bg-brand-50 text-brand-900'
                          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {val || 'Qualquer'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Valores e Área */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 space-y-3">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <DollarSign className="h-4 w-4 text-brand-500" />
                Faixa de Preço (R$)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] text-neutral-500">Mínimo</label>
                  <input
                    type="number"
                    placeholder="R$ 0"
                    value={filters.minPrice ?? ''}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value || undefined })}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-night-950 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-neutral-500">Máximo</label>
                  <input
                    type="number"
                    placeholder="R$ 30.000.000"
                    value={filters.maxPrice ?? ''}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value || undefined })}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-night-950 outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 space-y-3">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <Ruler className="h-4 w-4 text-brand-500" />
                Faixa de Área (m²)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] text-neutral-500">Mínima</label>
                  <input
                    type="number"
                    placeholder="0 m²"
                    value={filters.minArea ?? ''}
                    onChange={(e) => setFilters({ ...filters, minArea: e.target.value || undefined })}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-night-950 outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-neutral-500">Máxima</label>
                  <input
                    type="number"
                    placeholder="2000 m²"
                    value={filters.maxArea ?? ''}
                    onChange={(e) => setFilters({ ...filters, maxArea: e.target.value || undefined })}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-night-950 outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Opções Adicionais */}
          <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <Star className="h-4 w-4 text-brand-500" />
              Opções Adicionais
            </h4>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.isFeatured ?? false}
                onChange={(e) => setFilters({ ...filters, isFeatured: e.target.checked })}
                className="h-4 w-4 rounded accent-brand-500"
              />
              <span className="text-xs font-medium text-neutral-700">
                Mostrar apenas imóveis em destaque
              </span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-neutral-100 bg-neutral-50/80 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={handleClear}
            className="text-center py-2 text-small font-medium text-neutral-500 hover:text-night-950 transition-colors"
          >
            Limpar Filtros
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none rounded-card border border-neutral-200 bg-white px-5 py-2.5 text-small font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-card bg-brand-500 px-6 py-2.5 text-small font-semibold text-night-950 hover:bg-brand-400 transition-colors shadow-sm"
            >
              <Check className="h-4 w-4" />
              <span>Aplicar {activeCount > 0 && `(${activeCount})`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
