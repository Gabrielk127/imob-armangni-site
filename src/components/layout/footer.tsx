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
      { label: 'Comprar Imóveis', to: '/imoveis', search: { finalidade: 'venda' } },
      { label: 'Alugar Imóveis', to: '/imoveis', search: { finalidade: 'aluguel' } },
      { label: 'Anunciar Imóvel', href: ANUNCIAR_WHATSAPP_LINK },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Catálogo de Imóveis', to: '/imoveis' },
      { label: 'Avaliação Patrimonial', to: '/', hash: 'contato' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Fale Conosco', to: '/', hash: 'contato' },
      { label: 'Política de Privacidade', to: '/politica-de-privacidade' },
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
    <footer className="bg-night-950 text-neutral-300">
      <div className="container-page py-16">
        <div className="flex flex-col gap-10 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm space-y-5">
            <Logo dark />
            <p className="text-body font-light leading-relaxed text-neutral-300">
              Referência em assessoria e imóveis de alto padrão em Londrina, Gleba Palhano e região.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-card border border-white/15 text-neutral-300 transition-colors hover:border-brand-400 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:max-w-2xl">
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h3 className="text-small font-semibold tracking-wider text-brand-300">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          search={link.search}
                          hash={link.hash}
                          className="text-small text-neutral-300 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-small text-neutral-300 transition-colors hover:text-white"
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

        <div className="flex flex-col gap-5 py-8 text-small text-neutral-300 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-400 shrink-0" />
            <span>{ADDRESS}</span>
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-brand-400 shrink-0" />
              <span>{PHONE}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 text-brand-400 shrink-0" />
              <span>{EMAIL}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-small text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Armangni Negócios Imobiliários · Creci 8328-J · Todos os direitos reservados.</p>
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
    </footer>
  )
}
