import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from '@/components/icons'
import logoBranco from '@/images/logo-branco.png'

import { ANUNCIAR_WHATSAPP_LINK } from '@/data/properties'

type NavItem = {
  label: string
  to?: '/' | '/imoveis'
  search?: { finalidade: string }
  hash?: string
  href?: string
}

const navigation: NavItem[] = [
  { label: 'Comprar', to: '/imoveis', search: { finalidade: 'venda' } },
  { label: 'Alugar', to: '/imoveis', search: { finalidade: 'aluguel' } },
  { label: 'Anunciar imóvel', href: ANUNCIAR_WHATSAPP_LINK },
]

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center">
      <img
        src={logoBranco}
        alt="Armangni Negócios Imobiliários"
        className={`h-9 sm:h-11 w-auto object-contain transition-opacity group-hover:opacity-90 ${
          !dark ? 'invert' : ''
        }`}
      />
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-[#1C1C1C]/90 shadow-xl backdrop-blur-xl'
            : 'border-b border-white/10 bg-[#1C1C1C]/60 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo dark />

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-[13px] font-medium uppercase tracking-[0.18em] text-neutral-300 transition-colors hover:text-white cursor-pointer"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  search={'search' in item ? item.search : undefined}
                  hash={'hash' in item ? item.hash : undefined}
                  className="group relative text-[13px] font-medium uppercase tracking-[0.18em] text-neutral-300 transition-colors hover:text-white cursor-pointer"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center text-white lg:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-night-950/95 px-6 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              className="mx-auto flex w-full max-w-md flex-col gap-5"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl font-medium tracking-wide text-white transition-colors hover:text-brand-400 cursor-pointer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to!}
                      search={'search' in item ? item.search : undefined}
                      hash={'hash' in item ? item.hash : undefined}
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl font-medium tracking-wide text-white transition-colors hover:text-brand-400 cursor-pointer"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
