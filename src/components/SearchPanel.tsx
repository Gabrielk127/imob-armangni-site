import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react'
import type { Purpose } from '../data/properties'

const propertyTypes = [
  'Todos os tipos',
  'Apartamento',
  'Cobertura',
  'Casa em Condomínio',
  'Sobrado',
  'Studio',
  'Terreno',
]

export default function SearchPanel() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState<Purpose>('venda')
  const [type, setType] = useState(propertyTypes[0])
  const [query, setQuery] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams({ finalidade: purpose })
    if (type !== propertyTypes[0]) params.set('tipo', type)
    if (query.trim()) params.set('q', query.trim())
    navigate(`/imoveis?${params.toString()}`)
  }

  return (
    <div className="relative z-20 mx-auto -mt-24 w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="flex">
        {(['venda', 'aluguel'] as Purpose[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setPurpose(option)}
            className={`px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.24em] transition-colors ${
              purpose === option
                ? 'bg-night-950 text-white'
                : 'bg-white/80 text-neutral-500 backdrop-blur hover:text-night-950'
            }`}
          >
            {option === 'venda' ? 'Comprar' : 'Alugar'}
          </button>
        ))}
      </div>

      <form
        onSubmit={submit}
        className="flex flex-col gap-3 bg-white p-4 shadow-[0_30px_60px_-25px_rgba(10,10,11,0.35)] ring-1 ring-neutral-200/70 md:flex-row md:items-stretch"
      >
        <label className="relative flex min-w-0 items-center border border-neutral-200 md:w-64">
          <span className="sr-only">Tipo do imóvel</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="w-full appearance-none bg-transparent py-3.5 pl-4 pr-10 text-sm text-neutral-700 outline-none"
          >
            {propertyTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-neutral-400" />
        </label>

        <label className="flex min-w-0 flex-1 items-center gap-3 border border-neutral-200 px-4">
          <Search className="h-4 w-4 shrink-0 text-neutral-400" />
          <span className="sr-only">Buscar</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Procure por bairro, cidade, empreendimento ou referência"
            className="w-full bg-transparent py-3.5 text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
          />
        </label>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-brand-500 px-10 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-night-950 transition-colors hover:bg-brand-400"
        >
          <Search className="h-4 w-4" />
          Buscar
        </button>
      </form>

      <div className="flex justify-center bg-white/0 pt-3">
        <button
          type="button"
          onClick={submit}
          className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-night-950"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filtros avançados
        </button>
      </div>
    </div>
  )
}
