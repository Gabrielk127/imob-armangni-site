import { useState, useEffect, useCallback } from 'react'
import { Link, Navigate, useParams } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BedDouble,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Ruler,
  ShowerHead,
  Camera,
  X,
  Facebook,
  Instagram,
} from '@/components/icons'
import { WHATSAPP, SOCIAL_LINKS } from '@/data/properties'
import { usePropertiesList } from '@/hooks/use-properties-list'
import { usePropertyDetails } from '@/hooks/use-property-details'
import { formatArea, formatPrice } from '@/lib/format'
import { PropertyCarousel } from '@/components/property-carousel'
import { SectionHeading } from '@/components/section-heading'
import { VideoSection } from '@/components/video-section'
import { buttonClass } from '@/components/ui/button'

export function PropertyDetails() {
  const { code } = useParams({ from: '/imovel/$code' })
  const { data: property, isPending } = usePropertyDetails(code)
  const { data: related } = usePropertiesList({ limit: 8, sortBy: 'relevance' })
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const images = property?.images && property.images.length > 0 ? property.images : []
  const thumbnails = property?.thumbnails ?? images

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const prevLightbox = useCallback(() => {
    if (images.length === 0) return
    setLightboxIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const nextLightbox = useCallback(() => {
    if (images.length === 0) return
    setLightboxIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // Navegação por teclado e trava de scroll no body durante o lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') prevLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxOpen, prevLightbox, nextLightbox])

  if (isPending) return null
  if (!property) return <Navigate to="/imoveis" replace />

  const stats = [
    { icon: Ruler, value: formatArea(property.area), label: 'Área total' },
    property.bedrooms
      ? { icon: BedDouble, value: `${property.bedrooms}`, label: 'Dormitório(s)' }
      : null,
    property.suites ? { icon: ShowerHead, value: `${property.suites}`, label: 'Suíte(s)' } : null,
    property.parking ? { icon: Car, value: `${property.parking}`, label: 'Vagas' } : null,
  ].filter(Boolean) as { icon: typeof Ruler; value: string; label: string }[]

  const recommended = (related?.data ?? [])
    .filter((item) => item.code !== property.code)
    .slice(0, 6)

  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Olá! Tenho interesse no imóvel ${property.title} (Ref ${property.code}) - ${property.subtitle}.`
  )}`

  const mapQuery = encodeURIComponent(
    property.address ? `${property.address}, Brasil` : `${property.neighborhood}, ${property.city}, Brasil`
  )
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=m&z=15&output=embed&iwloc=near`
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  return (
    <div className="min-h-screen bg-paper pt-24 sm:pt-28 pb-28 lg:pb-20">
      {/* Topo / Cabeçalho do Imóvel */}
      <section className="bg-surface/60 py-8">
        <div className="container-page">
          {/* Breadcrumbs */}
          <nav aria-label="Navegação estrutural" className="mb-3 flex items-center gap-2 text-small text-muted">
            <Link to="/" className="hover:text-ink transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link to="/imoveis" className="hover:text-ink transition-colors">
              Imóveis
            </Link>
            <span>/</span>
            <span className="truncate max-w-[220px] sm:max-w-md font-medium text-ink">
              {property.title}
            </span>
          </nav>

          {/* Título & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-head font-light leading-[1.08] tracking-tight text-ink">
              {property.title} {property.suites ? `com ${property.suites} suítes` : ''}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-card bg-night-950 px-3 py-1 text-small font-semibold tracking-wide text-white">
                Cód. {property.code}
              </span>
              <span className="rounded-card bg-brand-500 px-3 py-1 text-small font-semibold tracking-wide text-night-950">
                {property.purpose === 'aluguel' ? 'Alugar' : 'Comprar'}
              </span>
              <span className="rounded-card bg-surface px-3 py-1 text-small font-medium text-ink">
                {property.type}
              </span>
            </div>
          </div>

          {/* Endereço */}
          <p className="mt-2.5 flex items-center gap-1.5 text-body text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-brand-700" />
            <span>{property.address || `${property.neighborhood}, ${property.city}`}</span>
          </p>
        </div>
      </section>

      {/* Grid Principal (Conteúdo + Lateral Sticky) */}
      <section className="py-8">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            {/* Coluna Esquerda: Fotos, Especificações, Descrição, Vídeo, Características, Mapa */}
            <div className="space-y-8 min-w-0">
              {/* Galeria de Fotos */}
              <div className="space-y-3">
                <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-card bg-night-950 shadow-[var(--shadow-card)]">
                  {images.length > 0 ? (
                    <div
                      onClick={() => openLightbox(activeImage)}
                      className="h-full w-full cursor-pointer overflow-hidden"
                    >
                      <img
                        src={images[activeImage]}
                        alt={`${property.title} - foto ${activeImage + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dica ao passar o mouse */}
                      <div className="absolute inset-0 bg-night-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="rounded-card bg-night-950/85 px-4 py-2 text-small font-medium text-white backdrop-blur-xs flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          <span>Clique para ampliar foto</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted">
                      <Camera className="h-12 w-12" />
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Foto anterior"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveImage((i) => (i - 1 + images.length) % images.length)
                        }}
                        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-card bg-white/95 text-night-950 shadow-md transition-transform hover:scale-105"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Próxima foto"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveImage((i) => (i + 1) % images.length)
                        }}
                        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-card bg-white/95 text-night-950 shadow-md transition-transform hover:scale-105"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {images.length > 0 && (
                    <button
                      type="button"
                      onClick={() => openLightbox(activeImage)}
                      className="absolute bottom-4 right-4 rounded-card bg-night-950/80 px-3 py-1.5 text-small font-medium text-white backdrop-blur-xs hover:bg-night-950 transition-colors flex items-center gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      <span>{activeImage + 1} de {images.length} fotos</span>
                    </button>
                  )}
                </div>

                {/* Tira de Miniaturas */}
                {images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                    {images.map((img, index) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`Visualizar foto ${index + 1}`}
                        className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-card transition-all ${
                          index === activeImage
                            ? 'ring-2 ring-brand-700 opacity-100'
                            : 'opacity-65 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={thumbnails[index] ?? img}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          width={112}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Barra de Especificações */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-card bg-white p-5 shadow-[var(--shadow-card)]">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3 p-1">
                    <span className="grid h-11 w-11 place-items-center rounded-card bg-surface text-ink shrink-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-sans text-lead font-semibold leading-tight text-ink">
                        {value}
                      </p>
                      <p className="text-small text-muted">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Descrição do Imóvel */}
              <div className="rounded-card bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-4">
                <h2 className="font-display text-2xl font-light text-ink">
                  Sobre o imóvel
                </h2>
                <div className="space-y-4 text-body leading-relaxed text-ink font-light">
                  {property.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <p className="flex items-center gap-2 text-small text-muted pt-3 border-t border-brand-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                  Valores e disponibilidade sujeitos a confirmação junto ao proprietário.
                </p>
              </div>

              {/* Tour Virtual em Vídeo */}
              {property.videoUrl && (
                <div className="rounded-card bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-4 overflow-hidden">
                  <h2 className="font-display text-2xl font-light text-ink">
                    Apresentação em Vídeo
                  </h2>
                  <VideoSection
                    title="Tour Exclusivo"
                    subtitle="Conheça a arquitetura, iluminação e acabamentos"
                    videoUrl={property.videoUrl}
                  />
                </div>
              )}

              {/* Características Privativas */}
              <div className="rounded-card bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-4">
                <h2 className="font-display text-2xl font-light text-ink">
                  Características do imóvel
                </h2>
                <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-body text-ink">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-100 text-brand-900 shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Infraestrutura do Condomínio (se houver) */}
              {property.condoFeatures && property.condoFeatures.length > 0 && (
                <div className="rounded-card bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-4">
                  <h2 className="font-display text-2xl font-light text-ink">
                    Infraestrutura do condomínio
                  </h2>
                  <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                    {property.condoFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-body text-ink">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-100 text-brand-900 shrink-0">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Localização & Mapa Interativo */}
              <div className="rounded-card bg-white p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-light text-ink">
                      Localização
                    </h2>
                    <p className="text-body text-muted mt-1">{property.address || `${property.neighborhood}, ${property.city}`}</p>
                  </div>
                  <a
                    href={mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass({
                      variant: 'outline',
                      size: 'sm',
                      className: 'self-start sm:self-auto shrink-0 font-medium',
                    })}
                  >
                    <MapPin className="h-4 w-4 text-brand-700" />
                    <span>Ver no Google Maps</span>
                  </a>
                </div>

                <div className="relative h-[340px] w-full overflow-hidden rounded-card bg-surface shadow-inner">
                  {property.address || property.neighborhood ? (
                    <iframe
                      src={mapEmbedUrl}
                      className="h-full w-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa do imóvel - ${property.title}`}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
                      <MapPin className="h-8 w-8 text-brand-500 opacity-40" />
                      <p className="text-small font-medium">Localização aproximada em Londrina</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Coluna Direita: Painel Sticky de Contato e Proposta */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-card bg-white p-6 sm:p-7 shadow-[var(--shadow-card)] space-y-6">
                <div>
                  <span className="text-small font-medium text-brand-800">
                    Valor do imóvel
                  </span>
                  <p
                    className={`mt-1 font-sans tracking-tight text-ink ${
                      !property.price || property.price <= 0
                        ? 'text-lead italic text-muted'
                        : 'text-head font-semibold'
                    }`}
                  >
                    {formatPrice(property)}
                  </p>
                  {property.condoFee && (
                    <p className="mt-1 text-small text-muted">
                      Condomínio: {formatPrice({ price: property.condoFee })}
                    </p>
                  )}
                </div>

                {/* Ações de Conversão */}
                <div className="space-y-3 pt-1" data-tl-property={property.code}>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonClass({
                      variant: 'whatsapp',
                      size: 'lg',
                      block: true,
                      className: 'font-semibold',
                    })}
                  >
                    <MessageCircle className="h-5 w-5 fill-white" />
                    <span>Falar no WhatsApp</span>
                  </a>
                  <Link
                    to="/"
                    hash="contato"
                    className={buttonClass({
                      variant: 'primary',
                      size: 'lg',
                      block: true,
                      className: 'font-semibold',
                    })}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Agendar Visita</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between border-t border-brand-100 pt-4 text-small text-muted">
                  <span>Compartilhar imóvel:</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={SOCIAL_LINKS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Compartilhar no Facebook"
                      className="hover:text-ink transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href={SOCIAL_LINKS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Armangni"
                      className="hover:text-ink transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Carrossel de Imóveis Recomendados */}
      {recommended.length > 0 && (
        <section className="mt-16 bg-night-950 py-16 text-white">
          <div className="container-page space-y-8">
            <SectionHeading
              dark
              category="Oportunidades Semelhantes"
              title="Imóveis Recomendados"
              description="Outras opções selecionadas que correspondem ao perfil deste imóvel."
            />
            <PropertyCarousel properties={recommended} tone="dark" label="Imóveis Recomendados" />
          </div>
        </section>
      )}

      {/* Modal de Lightbox em Tela Cheia */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-night-950/95 p-4 sm:p-6 backdrop-blur-md"
          >
            {/* Barra Superior do Lightbox */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="rounded-card bg-white/10 px-3 py-1 text-small font-semibold tracking-wide text-white">
                  Cód. {property.code}
                </span>
                <h3 className="hidden sm:block text-body font-light text-neutral-200 truncate max-w-md">
                  {property.title}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-small font-medium text-neutral-300">
                  {lightboxIndex + 1} de {images.length}
                </span>
                <button
                  type="button"
                  aria-label="Fechar galeria de fotos"
                  onClick={() => setLightboxOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-card bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Contêiner da Imagem Principal */}
            <div className="relative flex flex-1 items-center justify-center my-4 overflow-hidden">
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Foto anterior"
                    onClick={prevLightbox}
                    className="absolute left-2 sm:left-6 z-20 grid h-12 w-12 place-items-center rounded-card bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30 hover:scale-105"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Próxima foto"
                    onClick={nextLightbox}
                    className="absolute right-2 sm:right-6 z-20 grid h-12 w-12 place-items-center rounded-card bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30 hover:scale-105"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                src={images[lightboxIndex]}
                alt={`${property.title} - foto ${lightboxIndex + 1}`}
                className="max-h-[78vh] w-auto max-w-full rounded-card object-contain shadow-2xl select-none"
              />
            </div>

            {/* Tira Inferior de Miniaturas */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto py-2 scrollbar-none z-10">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Ir para foto ${idx + 1}`}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-card transition-all ${
                      idx === lightboxIndex
                        ? 'ring-2 ring-brand-400 opacity-100 scale-105'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra Fixa Inferior de Conversão no Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-30 flex items-center justify-between gap-3 border-t border-night-950/10 bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-brand-800">
            {property.title} · {property.type}
          </p>
          <p className="truncate font-sans text-base font-bold tracking-tight text-ink sm:text-lg">
            {formatPrice(property)}
          </p>
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={buttonClass({
            variant: 'whatsapp',
            size: 'sm',
            className: 'shrink-0 font-semibold px-4 shadow-sm',
          })}
        >
          <MessageCircle className="h-4 w-4 fill-white" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
