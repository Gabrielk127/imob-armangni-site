import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, UserRound, X } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

const navigation = [
  { label: 'Comprar', to: '/imoveis?finalidade=venda' },
  { label: 'Alugar', to: '/imoveis?finalidade=aluguel' },
  { label: 'Exclusivos', to: '/imoveis' },
  { label: 'Anunciar imóvel', to: '/#anunciar' },
  { label: 'Contato', to: '/#contato' },
]

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <span
        className={`grid h-11 w-11 place-items-center border font-display text-2xl transition-colors ${
          dark
            ? 'border-brand-400/60 bg-transparent text-brand-400'
            : 'border-night-900 bg-night-950 text-brand-400'
        }`}
      >
        A
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[26px] font-medium tracking-[0.22em] ${
            dark ? 'text-white' : 'text-night-950'
          }`}
        >
          AURUM
        </span>
        <span
          className={`mt-1 block text-[10px] uppercase tracking-[0.42em] ${
            dark ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          Imóveis · Londrina
        </span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="group relative text-[13px] font-medium uppercase tracking-[0.18em] text-neutral-600 transition-colors hover:text-night-950"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <button
            type="button"
            className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-night-950"
          >
            <UserRound className="h-4 w-4" />
            Área do cliente
          </button>
          <Link
            to="/favoritos"
            className="relative flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-night-950"
          >
            <Heart className="h-4 w-4" />
            Favoritos
            {favorites.length > 0 && (
              <span className="absolute -right-4 -top-2 grid h-4 w-4 place-items-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center text-night-950 lg:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-neutral-100 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-neutral-700"
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/favoritos"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-neutral-700"
            >
              <Heart className="h-4 w-4" /> Favoritos ({favorites.length})
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
