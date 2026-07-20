import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
  BedDouble,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  MessageCircle,
  Ruler,
  Share2,
  ShowerHead,
} from 'lucide-react'
import { properties, WHATSAPP } from '../data/properties'
import { formatArea, formatPrice } from '../lib/format'
import { useFavorites } from '../context/FavoritesContext'
import PropertyCarousel from '../components/PropertyCarousel'
import SectionHeading from '../components/SectionHeading'
import { Facebook, Instagram, Twitter } from '../components/icons/SocialIcons'

const criteria = [
  'Localizações privilegiadas',
  'Segurança máxima do morador',
  'Acabamentos de alto padrão',
  'Serviços personalizados',
  'Tecnologia de primeira linha na moradia',
  'Sustentabilidade',
  'Conforto e bem-estar',
]

export default function PropertyDetail() {
  const { code } = useParams()
  const property = useMemo(() => properties.find((p) => p.code === code), [code])
  const [activeImage, setActiveImage] = useState(0)
  const [sent, setSent] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!property) return <Navigate to="/imoveis" replace />

  const favorite = isFavorite(property.code)

  const stats = [
    { icon: Ruler, value: formatArea(property.area), label: 'Área total' },
    property.bedrooms
      ? { icon: BedDouble, value: `${property.bedrooms}`, label: 'Dormitório(s)' }
      : null,
    property.suites ? { icon: ShowerHead, value: `${property.suites}`, label: 'Suíte(s)' } : null,
    property.parking ? { icon: Car, value: `${property.parking}`, label: 'Vagas' } : null,
  ].filter(Boolean) as { icon: typeof Ruler; value: string; label: string }[]

  const recommended = properties
    .filter((p) => p.code !== property.code && p.purpose === property.purpose)
    .slice(0, 6)

  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Olá! Tenho interesse no imóvel ${property.title} (Ref ${property.code}) - ${property.subtitle}.`,
  )}`

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="bg-night-950">
        <div className="relative mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-night-900 sm:aspect-[21/9]">
            <img
              key={activeImage}
              src={property.images[activeImage]}
              alt={property.subtitle}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/60 via-transparent to-night-950/10" />

            {property.images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Imagem anterior"
                  onClick={() =>
                    setActiveImage((i) => (i - 1 + property.images.length) % property.images.length)
                  }
                  className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Próxima imagem"
                  onClick={() => setActiveImage((i) => (i + 1) % property.images.length)}
                  className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <span className="absolute left-4 top-4 border border-white/40 bg-night-950/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.28em] text-white backdrop-blur-sm sm:left-8 sm:top-8">
              {property.purpose === 'venda' ? 'Venda' : 'Locação'}
            </span>

            <div className="absolute bottom-4 right-4 flex gap-2 sm:bottom-8 sm:right-8">
              {property.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Ver imagem ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeImage ? 'w-7 bg-brand-400' : 'w-2.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_400px] lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-500">
              {property.neighborhood} · {property.city}
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium leading-tight text-night-950 sm:text-[42px]">
              {property.title} {property.suites ? `com ${property.suites} suítes` : ''} no{' '}
              {property.neighborhood}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
              <MapPin className="h-4 w-4 text-brand-500" />
              {property.address}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-y border-neutral-200 py-6">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center bg-neutral-100 text-night-950">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold leading-none text-night-950">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-5">
              {property.description.map((paragraph, index) => (
                <p key={index} className="text-[15px] font-light leading-relaxed text-neutral-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <p className="mt-6 flex items-start gap-2 text-xs text-neutral-400">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              Os valores anunciados podem sofrer alterações sem aviso prévio.
            </p>

            <div className="mt-14">
              <h2 className="font-display text-2xl font-medium text-night-950">
                Características do imóvel
              </h2>
              <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-neutral-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {property.condoFeatures && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-medium text-night-950">
                  Características do condomínio
                </h2>
                <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
                  {property.condoFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-neutral-600">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-14">
              <h2 className="font-display text-2xl font-medium text-night-950">Localização</h2>
              <p className="mt-2 text-sm text-neutral-500">{property.address}</p>
              <div className="relative mt-5 flex h-72 items-center justify-center overflow-hidden bg-neutral-100">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_49%,rgba(0,0,0,0.04)_49%,rgba(0,0,0,0.04)_51%,transparent_51%)] bg-[length:24px_24px]" />
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-500/15 text-brand-600">
                  <MapPin className="h-7 w-7" />
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  Mapa ilustrativo
                </span>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-neutral-200 p-6 shadow-[0_25px_50px_-25px_rgba(10,10,11,0.25)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-500">
                    {property.purpose === 'venda' ? 'Valor do imóvel' : 'Valor da locação'}
                  </p>
                  <p
                    className={`mt-2 font-display font-medium text-night-950 ${
                      property.price == null ? 'text-2xl italic' : 'text-3xl'
                    }`}
                  >
                    {formatPrice(property)}
                  </p>
                  {property.condoFee && (
                    <p className="mt-1 text-sm text-neutral-500">
                      Condomínio: {formatPrice({ price: property.condoFee, purpose: 'aluguel' })}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.code)}
                  aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  className="grid h-10 w-10 shrink-0 place-items-center border border-neutral-200 text-neutral-500 transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  <Heart className={`h-4 w-4 ${favorite ? 'fill-brand-500 text-brand-500' : ''}`} />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  Falar pelo WhatsApp
                </a>
                <Link
                  to="/#contato"
                  className="flex items-center justify-center gap-2 bg-night-950 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-night-800"
                >
                  <Calendar className="h-4 w-4" />
                  Agendar visita
                </Link>
              </div>

              <div className="mt-8 border-t border-neutral-200 pt-6">
                <p className="text-sm font-medium text-night-950">Ainda com dúvidas? Fale conosco</p>

                {sent ? (
                  <p className="mt-4 border border-brand-300 bg-brand-50 px-4 py-3 text-sm text-brand-800">
                    Mensagem enviada! Em breve um de nossos especialistas entrará em contato.
                  </p>
                ) : (
                  <form onSubmit={submit} className="mt-4 space-y-3">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-xs text-neutral-500">
                        Seu nome
                      </label>
                      <input
                        id="name"
                        required
                        placeholder="Digite seu nome"
                        className="w-full border border-neutral-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs text-neutral-500">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        className="w-full border border-neutral-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-xs text-neutral-500">
                        Telefone
                      </label>
                      <input
                        id="phone"
                        placeholder="(00) 00000-0000"
                        className="w-full border border-neutral-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-500"
                      />
                    </div>
                    <label className="flex items-start gap-2 pt-1 text-xs text-neutral-500">
                      <input required type="checkbox" className="mt-0.5 accent-brand-500" />
                      Declaro que li e aceito os termos da Política de Privacidade.
                    </label>
                    <button
                      type="submit"
                      className="w-full bg-brand-500 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-night-950 transition-colors hover:bg-brand-400"
                    >
                      Enviar
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5">
                <button
                  type="button"
                  onClick={() => toggleFavorite(property.code)}
                  className="flex items-center gap-2 text-xs font-medium text-neutral-500 transition-colors hover:text-night-950"
                >
                  <Heart className={`h-4 w-4 ${favorite ? 'fill-brand-500 text-brand-500' : ''}`} />
                  Favoritar
                </button>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Share2 className="h-3.5 w-3.5" />
                  <a href="#" aria-label="Compartilhar no Facebook" className="hover:text-night-950">
                    <Facebook className="h-3.5 w-3.5" />
                  </a>
                  <a href="#" aria-label="Compartilhar no Instagram" className="hover:text-night-950">
                    <Instagram className="h-3.5 w-3.5" />
                  </a>
                  <a href="#" aria-label="Compartilhar no Twitter" className="hover:text-night-950">
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {recommended.length > 0 && (
        <section className="bg-neutral-900 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              dark
              eyebrow="Para você"
              title="Imóveis para você"
              description="Recomendações baseadas neste imóvel."
            />
            <div className="mt-12">
              <PropertyCarousel properties={recommended} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-night-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-400">
            <span className="h-px w-10 bg-brand-400/60" />
            Nosso compromisso
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight text-white sm:text-4xl">
            A Armangni se preocupa em selecionar os imóveis a partir dos seguintes critérios:
          </h2>
          <ul className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {criteria.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-neutral-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
