import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from '@/components/icons'
import { IMAGES, ANUNCIAR_WHATSAPP_LINK } from '@/data/properties'

interface BannerSlide {
  id: string
  tag: string
  title: string
  description: string
  ctaText: string
  href?: string
  isExternal?: boolean
  image: string
}

const slides: BannerSlide[] = [
  {
    id: 'coberturas',
    tag: 'Exclusividade Armangni',
    title: 'Coberturas Duplex & Penthouses',
    description: 'Vistas panorâmicas deslumbrantes nos endereços mais cobiçados e valorizados.',
    ctaText: 'Explorar Coberturas',
    href: '/imoveis',
    image: IMAGES.terrace,
  },
  {
    id: 'condominios',
    tag: 'Privacidade & Lazer',
    title: 'Casas em Condomínios Fechados',
    description: 'Residências sofisticadas com ampla área verde, segurança 24h e infraestrutura impecável.',
    ctaText: 'Conhecer Residências',
    href: '/imoveis',
    image: IMAGES.condoHouse,
  },
  {
    id: 'anunciar',
    tag: 'Atendimento Personalizado',
    title: 'Anuncie Seu Imóvel Conosco',
    description: 'Avaliação criteriosa, fotos profissionais e assessoria completa na compra e venda.',
    ctaText: 'Anunciar no WhatsApp',
    href: ANUNCIAR_WHATSAPP_LINK,
    isExternal: true,
    image: IMAGES.heroNight,
  },
]

export function HomeBannersCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  const currentSlide = slides[currentIndex]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.4,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.4,
    }),
  }

  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative h-[320px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#1C1C1C]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 h-full w-full"
            >
              {/* Background Image */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="h-full w-full object-cover filter brightness-[0.65]"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C]/90 via-[#1C1C1C]/40 to-transparent" />

              {/* Banner Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                <div className="max-w-2xl space-y-3 sm:space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-black/40 px-3.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#BFB4AA] backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-brand-400" />
                    {currentSlide.tag}
                  </span>

                  <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-medium tracking-wide text-white leading-tight">
                    {currentSlide.title}
                  </h3>

                  <p className="text-xs sm:text-base font-light text-neutral-300 leading-relaxed max-w-xl">
                    {currentSlide.description}
                  </p>

                  <div className="pt-2">
                    {currentSlide.isExternal ? (
                      <a
                        href={currentSlide.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-xl bg-[#BFB4AA] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1C1C1C] transition-all hover:bg-white hover:shadow-lg cursor-pointer"
                      >
                        {currentSlide.ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <Link
                        to={currentSlide.href as any}
                        className="group inline-flex items-center gap-3 rounded-xl bg-[#BFB4AA] px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1C1C1C] transition-all hover:bg-white hover:shadow-lg cursor-pointer"
                      >
                        {currentSlide.ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Slide anterior"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:border-brand-400 hover:bg-brand-400 hover:text-[#1C1C1C]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próximo slide"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:border-brand-400 hover:bg-brand-400 hover:text-[#1C1C1C]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Ir para o slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-8 bg-[#BFB4AA]'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
