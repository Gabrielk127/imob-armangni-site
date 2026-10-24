import { useState, type FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ChevronDown, Search, SlidersHorizontal } from '@/components/icons'
import type { Purpose } from '@/data/properties'
import { usePropertyTypes } from '@/hooks/use-property-facets'
import { buttonClass } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SearchPanel({ className }: { className?: string }) {
  const navigate = useNavigate()
  const { data: types = [] } = usePropertyTypes()
  const [purpose, setPurpose] = useState<Purpose>('venda')
  const [type, setType] = useState('Todos')
  const [query, setQuery] = useState('')

  const propertyTypes = ['Todos', ...types.map((t) => t.name)]

  const submit = (event: FormEvent) => {
    event.preventDefault()
    void navigate({
      to: '/imoveis',
      search: {
        finalidade: purpose,
        ...(type !== 'Todos' ? { tipo: type } : {}),
        ...(query.trim() ? { q: query.trim() } : {}),
      },
    })
  }

  return (
    <div className={cn('relative z-20 mx-auto w-full max-w-4xl', className)}>
      {/* Seletor de finalidade (Comprar / Alugar) */}
      <div className="mb-3.5 flex justify-center">
        <div
          role="tablist"
          aria-label="Finalidade da busca"
          className="inline-flex rounded-card bg-night-950/70 p-1 backdrop-blur-md border border-white/15"
        >
          {(['venda', 'aluguel'] as Purpose[]).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={purpose === option}
              onClick={() => setPurpose(option)}
              className={cn(
                'rounded-card px-6 py-2.5 text-small font-semibold tracking-wide transition-all duration-200 cursor-pointer',
                purpose === option
                  ? 'bg-brand-500 text-night-950'
                  : 'text-neutral-300 hover:text-white'
              )}
            >
              {option === 'venda' ? 'Comprar' : 'Alugar'}
            </button>
          ))}
        </div>
      </div>

      {/* Formulário de Busca Integrado */}
      <form
        onSubmit={submit}
        className="flex flex-col gap-2.5 rounded-card bg-white p-2.5 border border-white/20 sm:flex-row sm:items-center sm:gap-3"
      >
        {/* Seletor do tipo de imóvel */}
        <label className="relative flex min-w-0 items-center rounded-card border border-neutral-200/90 bg-neutral-50 sm:w-56 sm:border-none sm:bg-surface/60">
          <span className="sr-only">Tipo de imóvel</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full appearance-none bg-transparent py-3.5 pl-4 pr-10 text-body font-medium text-ink outline-none cursor-pointer"
          >
            {propertyTypes.map((option) => (
              <option key={option} value={option} className="text-ink">
                {option === 'Todos' ? 'Todos os tipos' : option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-neutral-500" />
        </label>

        {/* Input de texto para endereço/bairro/código */}
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-card border border-neutral-200/90 bg-neutral-50 px-4 py-1 sm:border-none sm:bg-surface/60">
          <Search className="h-4 w-4 shrink-0 text-neutral-500" />
          <span className="sr-only">Buscar por termo</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bairro, empreendimento, rua ou código..."
            className="w-full bg-transparent py-3 text-body font-normal text-ink outline-none placeholder:text-neutral-500"
          />
        </label>

        {/* Botão de Envio */}
        <button
          type="submit"
          className={buttonClass({
            variant: 'accent',
            size: 'md',
            className: 'w-full sm:w-auto font-semibold px-7',
          })}
        >
          <Search className="h-4 w-4 shrink-0" />
          <span>Buscar</span>
        </button>
      </form>

      {/* Ação de filtros rápidos / avançados */}
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={submit}
          className="inline-flex items-center gap-2 text-small font-medium text-neutral-300 transition-colors hover:text-white cursor-pointer"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-brand-400" />
          <span>Explorar todos os filtros avançados</span>
        </button>
      </div>
    </div>
  )
}
