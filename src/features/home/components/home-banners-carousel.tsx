import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, ArrowRight } from '@/components/icons'
import { IMAGES, ANUNCIAR_WHATSAPP_LINK } from '@/data/properties'
import { buttonClass } from '@/components/ui/button'

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
    tag: 'Exclusividade',
    title: 'Coberturas e Penthouses',
    description: 'Vistas panorâmicas deslumbrantes nos endereços mais cobiçados e valorizados de Londrina.',
    ctaText: 'Explorar Coberturas',
    href: '/imoveis',
    image: IMAGES.terrace,
  },
  {
    id: 'condominios',
    tag: 'Privacidade & Lazer',
    title: 'Casas em condomínio',
    description: 'Residências sofisticadas com ampla área verde, segurança 24h e infraestrutura impecável.',
    ctaText: 'Conhecer Residências',
    href: '/imoveis',
    image: IMAGES.condoHouse,
  },
  {
    id: 'anunciar',
    tag: 'Atendimento Consultivo',
    title: 'Anuncie seu patrimônio',
    description: 'Avaliação criteriosa de mercado, produção visual de alto nível e assessoria jurídica completa.',
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
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, handleNext])

  const currentSlide = slides[currentIndex]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.3,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0.3,
    }),
  }

  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="container-page">
        <div
          className="relative h-[360px] sm:h-[420px] lg:h-[460px] w-full overflow-hidden rounded-card bg-night-950"
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
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full"
            >
              {/* Imagem de Fundo com alto nível de detalhe */}
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="h-full w-full object-cover brightness-[0.7]"
              />

              {/* Scrim neutro vertical para legibilidade com regras do probe */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to top, rgba(10, 10, 11, 0.95) 0%, rgba(10, 10, 11, 0.45) 55%, rgba(10, 10, 11, 0.15) 100%)',
                }}
              />

              {/* Conteúdo do Banner */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
                <div className="max-w-2xl space-y-3.5">
                  <h3 className="font-display text-head font-light leading-tight text-white">
                    {currentSlide.title}
                  </h3>

                  <p className="max-w-xl text-body font-light leading-relaxed text-neutral-200">
                    {currentSlide.description}
                  </p>

                  <div className="pt-2">
                    {currentSlide.isExternal ? (
                      <a
                        href={currentSlide.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClass({
                          variant: 'accent',
                          size: 'md',
                          className: 'font-semibold',
                        })}
                      >
                        {currentSlide.ctaText}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        to={currentSlide.href as any}
                        className={buttonClass({
                          variant: 'accent',
                          size: 'md',
                          className: 'font-semibold',
                        })}
                      >
                        {currentSlide.ctaText}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botões de Navegação Anteriores/Próximos */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Slide anterior"
              className="grid h-11 w-11 place-items-center rounded-card border border-white/20 bg-night-950/70 text-white backdrop-blur-xs transition-colors hover:border-white hover:bg-white hover:text-night-950"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próximo slide"
              className="grid h-11 w-11 place-items-center rounded-card border border-white/20 bg-night-950/70 text-white backdrop-blur-xs transition-colors hover:border-white hover:bg-white hover:text-night-950"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Indicadores de Slide */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5" aria-hidden>
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Ir para o slide ${idx + 1}`}
                className="flex h-11 items-center px-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-7 bg-brand-400'
                      : 'w-2 bg-white/40 hover:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
