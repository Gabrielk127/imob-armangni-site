import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from '@/components/icons'
import logoBranco from '@/images/logo-branco.png'
import { ANUNCIAR_WHATSAPP_LINK } from '@/data/properties'
import { buttonClass } from '@/components/ui/button'

type NavItem = {
  label: string
  to?: '/' | '/imoveis'
  search?: Record<string, string>
  hash?: string
  href?: string
}

const navigation: NavItem[] = [
  { label: 'Destaques', to: '/imoveis', search: { destaque: 'true' } },
  { label: 'Comprar', to: '/imoveis', search: { finalidade: 'venda' } },
  { label: 'Alugar', to: '/imoveis', search: { finalidade: 'aluguel' } },
  { label: 'Imóveis', to: '/imoveis' },
  { label: 'Contato', to: '/', hash: 'contato' },
]

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center focus-visible:outline-offset-4">
      <img
        src={logoBranco}
        alt="Armangni Negócios Imobiliários"
        width={180}
        height={44}
        className={`h-8 sm:h-10 w-auto object-contain transition-opacity group-hover:opacity-90 ${
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

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20))

  // Bloqueio de scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-[background-color,border-color] duration-300 ${
          scrolled
            ? 'border-b border-white/10 bg-night-950/95 backdrop-blur-md'
            : 'border-b border-transparent bg-night-950/40 backdrop-blur-sm'
        }`}
      >
        <div className="container-page flex h-18 sm:h-20 items-center justify-between">
          <Logo dark />

          {/* Navegação Desktop */}
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
            {navigation.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body font-medium text-neutral-200 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to!}
                  search={'search' in item ? item.search : undefined}
                  hash={'hash' in item ? item.hash : undefined}
                  className="text-body font-medium text-neutral-200 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <a
                href={ANUNCIAR_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass({
                  variant: 'accent',
                  size: 'sm',
                  className: 'text-small font-semibold px-5',
                })}
              >
                Anunciar Imóvel
              </a>
            </div>

            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-card text-white md:hidden hover:bg-white/10 active:scale-95 transition-transform"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-night-950 px-6 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] md:hidden overflow-y-auto"
          >
            <motion.nav
              className="flex flex-col gap-5 pt-4"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl font-light text-white transition-colors hover:text-brand-300"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to!}
                      search={'search' in item ? item.search : undefined}
                      hash={'hash' in item ? item.hash : undefined}
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl font-light text-white transition-colors hover:text-brand-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            <div className="space-y-3 pt-8 border-t border-white/10">
              <a
                href={ANUNCIAR_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={buttonClass({
                  variant: 'accent',
                  size: 'md',
                  block: true,
                  className: 'text-body font-semibold',
                })}
              >
                Anunciar meu Imóvel
              </a>
              <a
                href={ANUNCIAR_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={buttonClass({
                  variant: 'whatsapp',
                  size: 'md',
                  block: true,
                  className: 'text-body font-semibold',
                })}
              >
                Falar com Especialista
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
