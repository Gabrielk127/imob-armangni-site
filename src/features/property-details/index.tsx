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
} from '@/components/icons'
import { WHATSAPP, SOCIAL_LINKS } from '@/data/properties'
import { usePropertiesList } from '@/hooks/use-properties-list'
import { usePropertyDetails } from '@/hooks/use-property-details'
import { formatArea, formatPrice } from '@/lib/format'
import { PropertyCarousel } from '@/components/property-carousel'
import { SectionHeading } from '@/components/section-heading'
import { VideoSection } from '@/components/video-section'
import { Facebook, Instagram } from '@/components/icons'

export function PropertyDetails() {
  const { code } = useParams({ from: '/imovel/$code' })
  const { data: property, isPending } = usePropertyDetails(code)
  const { data: related } = usePropertiesList({ limit: 7, sortBy: 'relevance' })
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const images = property?.images && property.images.length > 0 ? property.images : []
  // A tira de seleção mostra as fotos num quadro de 112px; a API serve uma
  // versão nessa largura. Sem isso, abrir um imóvel com doze fotos baixava as
  // doze na largura de galeria só para desenhar as miniaturas.
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

  // Keyboard navigation & body scroll lock for lightbox
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
    <div className="min-h-screen bg-neutral-50/60 pt-24 sm:pt-28">
      {/* Header Info Section */}
      <section className="border-b border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-3 flex items-center gap-2 text-xs text-neutral-400">
            <Link to="/" className="hover:text-night-950 transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link to="/imoveis" className="hover:text-night-950 transition-colors">
              Imóveis
            </Link>
            <span>/</span>
            <span className="truncate max-w-[200px] sm:max-w-xs text-neutral-600 font-medium">
              {property.title}
            </span>
          </nav>

          {/* Title & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-medium leading-tight text-night-950 sm:text-4xl">
              {property.title} {property.suites ? `com ${property.suites} suítes` : ''}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-night-950 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                CÓD. {property.code}
              </span>
              <span className="rounded-md border border-brand-500/40 bg-brand-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-brand-900 uppercase">
                {property.purpose === 'aluguel' ? 'ALUGAR' : 'COMPRAR'}
              </span>
              <span className="rounded-md border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold text-neutral-700 uppercase">
                {property.type}
              </span>
            </div>
          </div>

          {/* Address */}
          <p className="mt-2.5 flex items-center gap-1.5 text-sm text-neutral-500">
            <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
            {property.address}
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            {/* Left Main Column */}
            <div className="space-y-8 min-w-0">
              {/* Image Gallery Container */}
              <div className="space-y-3">
                <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-md">
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
                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="rounded-full bg-night-950/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-2 shadow-lg">
                          <Camera className="h-4 w-4" />
                          Clique para ampliar foto
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-neutral-500">
                      <Camera className="h-12 w-12" />
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Imagem anterior"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveImage((i) => (i - 1 + images.length) % images.length)
                        }}
                        className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night-950 shadow-md backdrop-blur transition-transform hover:scale-110 cursor-pointer"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Próxima imagem"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveImage((i) => (i + 1) % images.length)
                        }}
                        className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-night-950 shadow-md backdrop-blur transition-transform hover:scale-110 cursor-pointer"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {images.length > 0 && (
                    <button
                      type="button"
                      onClick={() => openLightbox(activeImage)}
                      className="absolute bottom-4 right-4 rounded-lg bg-night-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-night-950/90 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      <span>{activeImage + 1} / {images.length} fotos</span>
                    </button>
                  )}
                </div>

                {/* Thumbnails Row */}
                {images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                    {images.map((img, index) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImage(index)}
                        className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                          index === activeImage
                            ? 'border-brand-500 ring-2 ring-brand-500/30'
                            : 'border-transparent opacity-70 hover:opacity-100'
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

              {/* Specs Bar */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3 p-2">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 text-night-950 shrink-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-sans text-base font-bold leading-tight text-night-950">
                        {value}
                      </p>
                      <p className="text-xs text-neutral-500">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description Card */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-display text-2xl font-medium text-night-950">
                  Sobre o imóvel
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-neutral-600 font-light">
                  {property.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <p className="flex items-start gap-2 text-xs text-neutral-400 pt-2 border-t border-neutral-100">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  Os valores e informações anunciados podem sofrer alterações sem aviso prévio.
                </p>
              </div>

              {/* Video Section */}
              {property.videoUrl && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4 overflow-hidden">
                  <h2 className="font-display text-2xl font-medium text-night-950">
                    Tour Virtual (Vídeo)
                  </h2>
                  <VideoSection
                    title="Vídeo do Imóvel"
                    subtitle="Assista ao vídeo exclusivo e conheça cada detalhe"
                    videoUrl={property.videoUrl}
                  />
                </div>
              )}

              {/* Features List */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-display text-2xl font-medium text-night-950">
                  Características do imóvel
                </h2>
                <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-neutral-700 font-medium">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-600 shrink-0">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Condo Features (if present) */}
              {property.condoFeatures && property.condoFeatures.length > 0 && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
                  <h2 className="font-display text-2xl font-medium text-night-950">
                    Infraestrutura do condomínio
                  </h2>
                  <ul className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                    {property.condoFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-neutral-700 font-medium">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-600 shrink-0">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Location Card with Real Interactive Google Maps */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-medium text-night-950">
                      Localização & Mapa
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">{property.address}</p>
                  </div>
                  <a
                    href={mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2.5 text-xs font-semibold text-night-950 transition-colors hover:bg-neutral-200 cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    <MapPin className="h-4 w-4 text-brand-500" />
                    Abrir no Google Maps
                  </a>
                </div>

                <div className="relative h-[340px] w-full overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-inner">
                  {property.address ? (
                    <iframe
                      src={mapEmbedUrl}
                      className="h-full w-full border-0 brightness-[1.02] contrast-[1.02]"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa do imóvel - ${property.title}`}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-400">
                      <MapPin className="h-8 w-8 text-brand-500 opacity-40" />
                      <p className="text-xs font-medium">Endereço não informado para carregar o mapa</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg space-y-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-500">
                    Valor do imóvel
                  </span>
                  <p
                    className={`mt-2 font-sans tracking-tight text-night-950 ${
                      !property.price || property.price <= 0
                        ? 'text-2xl italic font-normal text-neutral-500'
                        : 'text-3xl sm:text-4xl font-bold'
                    }`}
                  >
                    {formatPrice(property)}
                  </p>
                  {property.condoFee && (
                    <p className="mt-1 text-xs font-medium text-neutral-500">
                      Condomínio: {formatPrice({ price: property.condoFee })}
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" />
                    Falar pelo WhatsApp
                  </a>
                  <Link
                    to="/"
                    hash="contato"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-night-950 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-night-800 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar visita
                  </Link>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-400">
                  <span>Compartilhar:</span>
                  <div className="flex items-center gap-3">
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-night-950 cursor-pointer">
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-night-950 cursor-pointer">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Recommended Carousel */}
      {recommended.length > 0 && (
        <section className="bg-neutral-900 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              dark
              eyebrow="Para você"
              title="Imóveis recomendados"
              description="Outras opções semelhantes a este imóvel."
            />
            <div className="mt-10">
              <PropertyCarousel properties={recommended} />
            </div>
          </div>
        </section>
      )}



      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-night-950/95 p-4 sm:p-6 backdrop-blur-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                  CÓD. {property.code}
                </span>
                <h3 className="hidden sm:block text-sm font-medium text-neutral-200 truncate max-w-md">
                  {property.title}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-neutral-400">
                  {lightboxIndex + 1} de {images.length}
                </span>
                <button
                  type="button"
                  aria-label="Fechar galeria"
                  onClick={() => setLightboxOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Center Image Container */}
            <div className="relative flex flex-1 items-center justify-center my-4 overflow-hidden">
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Imagem anterior"
                    onClick={prevLightbox}
                    className="absolute left-2 sm:left-6 z-20 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30 hover:scale-110 cursor-pointer"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Próxima imagem"
                    onClick={nextLightbox}
                    className="absolute right-2 sm:right-6 z-20 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all hover:bg-white/30 hover:scale-110 cursor-pointer"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                src={images[lightboxIndex]}
                alt={`${property.title} - imagem ${lightboxIndex + 1}`}
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl select-none"
              />
            </div>

            {/* Bottom Thumbnails Strip */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto py-2 scrollbar-none z-10">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                      idx === lightboxIndex
                        ? 'border-brand-500 ring-2 ring-brand-500/40 opacity-100 scale-105'
                        : 'border-transparent opacity-50 hover:opacity-100'
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
    </div>
  )
}
