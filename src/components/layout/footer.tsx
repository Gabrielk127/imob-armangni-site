import { Link } from '@tanstack/react-router'
import { Mail, MapPin, Phone } from '@/components/icons'
import { ADDRESS, EMAIL, PHONE, WHATSAPP, SOCIAL_LINKS, ANUNCIAR_WHATSAPP_LINK } from '@/data/properties'
import { Logo } from '@/components/layout/header'
import { Facebook, Instagram, Linkedin, Youtube } from '@/components/icons'

type FooterLink = {
  label: string
  to?: '/' | '/imoveis' | '/politica-de-privacidade'
  search?: { finalidade: string }
  hash?: string
  href?: string
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Navegação',
    links: [
      { label: 'Comprar', to: '/imoveis', search: { finalidade: 'venda' } },
      { label: 'Alugar', to: '/imoveis', search: { finalidade: 'aluguel' } },
      { label: 'Anunciar imóvel', href: ANUNCIAR_WHATSAPP_LINK },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Encontrar imóvel', to: '/imoveis' },
      { label: 'Como comprar', to: '/', hash: 'contato' },
    ],
  },
  {
    title: 'A imobiliária',
    links: [
      { label: 'Fale conosco', to: '/', hash: 'contato' },
      { label: 'Política de privacidade', to: '/politica-de-privacidade' },
    ],
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: SOCIAL_LINKS.instagram },
  { icon: Facebook, label: 'Facebook', href: SOCIAL_LINKS.facebook },
  { icon: Youtube, label: 'YouTube', href: SOCIAL_LINKS.youtube },
  { icon: Linkedin, label: 'LinkedIn', href: SOCIAL_LINKS.linkedin },
]

export function Footer() {
  return (
    <footer id="contato" className="bg-night-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">
              Referência em imóveis de alto padrão para comprar ou vender em Londrina.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center border border-white/15 text-neutral-400 transition-colors hover:border-brand-400 hover:text-brand-400 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 lg:max-w-2xl">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-400">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          search={link.search}
                          hash={link.hash}
                          className="text-sm text-neutral-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-neutral-400 transition-colors hover:text-white"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-400" />
            {ADDRESS}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-brand-400" />
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-brand-400" />
              {EMAIL}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Armangni Negócios Imobiliários · CRECI 8328 · Todos os direitos reservados.</p>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <a
              href="https://techdeploy.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Desenvolvido por TechDeploy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
