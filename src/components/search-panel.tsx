import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ChevronDown, Search, SlidersHorizontal } from '@/components/icons'
import type { Purpose } from '@/data/properties'

const propertyTypes = [
  'Todos os tipos',
  'Apartamento',
  'Cobertura',
  'Casa em Condomínio',
  'Sobrado',
  'Studio',
  'Terreno',
]

export function SearchPanel() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState<Purpose>('venda')
  const [type, setType] = useState(propertyTypes[0])
  const [query, setQuery] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    void navigate({
      to: '/imoveis',
      search: {
        finalidade: purpose,
        ...(type !== propertyTypes[0] ? { tipo: type } : {}),
        ...(query.trim() ? { q: query.trim() } : {}),
      },
    })
  }

  return (
    <div className="relative z-20 mx-auto w-full max-w-4xl">
      <div className="mb-3 flex justify-center">
        <div className="inline-flex rounded-full bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/15">
          {(['venda', 'aluguel'] as Purpose[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPurpose(option)}
              className={`rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all ${
                purpose === option
                  ? 'bg-brand-500 text-night-950 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {option === 'venda' ? 'Comprar' : 'Alugar'}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={submit}
        className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-neutral-200/80 md:flex-row md:items-center md:rounded-full md:p-2.5"
      >
        <label className="relative flex min-w-0 items-center border border-neutral-200 bg-neutral-50/50 md:w-56 md:rounded-full md:border-none md:bg-neutral-100/70">
          <span className="sr-only">Tipo do imóvel</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-xs font-medium text-night-950 outline-none sm:text-sm"
          >
            {propertyTypes.map((option) => (
              <option key={option} className="text-night-950">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-neutral-400" />
        </label>

        <label className="flex min-w-0 flex-1 items-center gap-3 border border-neutral-200 bg-neutral-50/50 px-4 py-0.5 md:rounded-full md:border-none md:bg-neutral-100/70">
          <Search className="h-4 w-4 shrink-0 text-neutral-400" />
          <span className="sr-only">Buscar</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Procure por bairro, cidade, empreendimento ou referência"
            className="w-full bg-transparent py-3 text-xs font-normal text-night-950 outline-none placeholder:text-neutral-400 sm:text-sm"
          />
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-night-950 transition-colors hover:bg-brand-400"
        >
          <Search className="h-4 w-4" />
          Buscar
        </button>
      </form>

      <div className="flex justify-center pt-3">
        <button
          type="button"
          onClick={submit}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300 transition-colors hover:text-white"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtros avançados
        </button>
      </div>
    </div>
  )
}
