import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ADDRESS, EMAIL, PHONE, WHATSAPP } from '../data/properties'
import { Logo } from './Header'
import { Facebook, Instagram, Linkedin, Youtube } from './icons/SocialIcons'

const columns = [
  {
    title: 'Navegação',
    links: [
      { label: 'Comprar', to: '/imoveis?finalidade=venda' },
      { label: 'Alugar', to: '/imoveis?finalidade=aluguel' },
      { label: 'Imóveis exclusivos', to: '/imoveis' },
      { label: 'Anunciar imóvel', to: '/#anunciar' },
      { label: 'Favoritos', to: '/favoritos' },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Encontrar imóvel', to: '/imoveis' },
      { label: 'Avaliação de imóvel', to: '/#anunciar' },
      { label: 'Como comprar', to: '/#anunciar' },
      { label: 'Como alugar', to: '/imoveis?finalidade=aluguel' },
    ],
  },
  {
    title: 'A imobiliária',
    links: [
      { label: 'Nossa história', to: '/' },
      { label: 'Fale conosco', to: '/#contato' },
      { label: 'Blog', to: '#' },
      { label: 'Trabalhe conosco', to: '#' },
      { label: 'Política de privacidade', to: '#' },
    ],
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer id="contato" className="bg-night-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-6 text-sm leading-relaxed text-neutral-400">
              Referência em imóveis de alto padrão para comprar, vender ou alugar em Londrina.
              Duas décadas transformando escolhas em conquistas.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center border border-white/15 text-neutral-400 transition-colors hover:border-brand-400 hover:text-brand-400"
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
                      <Link
                        to={link.to}
                        className="text-sm text-neutral-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
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
          <p>© 2026 Haras Imóveis · CRECI J-00000 · Todos os direitos reservados.</p>
          <p>Alto padrão em Londrina desde 2006.</p>
        </div>
      </div>
    </footer>
  )
}
