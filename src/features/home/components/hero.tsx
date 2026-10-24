import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowDown } from '@/components/icons'
import { IMAGES, IMAGE_IDS, imgSrcSet } from '@/data/properties'
import { SearchPanel } from '@/components/search-panel'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])

  return (
    <section
      ref={ref}
      id="topo"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-night-950 pb-16 pt-24 text-white sm:pb-20 sm:pt-28"
    >
      {/* Imagem de Fundo em alta resolução com Scrim Neutro */}
      <motion.div
        style={{ y: reduce ? '0%' : imageY }}
        className="absolute inset-0 z-0 h-[116%] w-full"
      >
        <img
          src={IMAGES.heroNight}
          srcSet={imgSrcSet(IMAGE_IDS.heroNight)}
          sizes="100vw"
          alt="Fachada de residência de alto padrão em Londrina"
          className="kenburns h-full w-full object-cover object-[center_40%]"
          fetchPriority="high"
          decoding="async"
        />

        {/* Scrim vertical calibrado para contraste legível e imersão */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(10, 10, 11, 0.75) 0%, rgba(10, 10, 11, 0.45) 50%, rgba(10, 10, 11, 0.95) 100%)',
          }}
        />
      </motion.div>

      {/* Conteúdo Central do Hero */}
      <div className="container-page relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        {/* Título Principal — renderizado diretamente sem atraso para LCP rápido e leitura imediata */}
        <h1 className="max-w-4xl font-display text-[clamp(2.35rem,6vw,5.5rem)] font-light leading-[1.04] tracking-tight text-white">
          Imóveis de alto padrão
        </h1>

        {/* Frase de apoio com alto contraste */}
        <p className="mt-5 max-w-2xl text-lead font-light leading-relaxed text-neutral-200">
          Curadoria criteriosa em Londrina: apartamentos, coberturas e casas em condomínios fechados.
        </p>

        {/* Painel de Busca Centralizado */}
        <div className="mt-8 w-full max-w-3xl sm:mt-10">
          <SearchPanel />
        </div>
      </div>

      {/* Indicador sutil de rolagem */}
      <div
        className="pointer-events-none absolute bottom-5 right-8 z-10 hidden items-center gap-2 text-small tracking-wider text-neutral-400 sm:flex"
        aria-hidden
      >
        <span>Explorar</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-brand-400" />
      </div>
    </section>
  )
}
