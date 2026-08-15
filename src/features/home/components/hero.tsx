import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from '@/components/icons'
import { IMAGES, IMAGE_IDS, imgSrcSet } from '@/data/properties'
import { SearchPanel } from '@/components/search-panel'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      id="topo"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-night-950 text-white pb-20 pt-28 sm:pt-32"
    >
      {/* Background Image with parallax and kenburns effect */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0 h-[120%] w-full"
      >
        <img
          src={IMAGES.heroNight}
          srcSet={imgSrcSet(IMAGE_IDS.heroNight)}
          // O hero ocupa a largura toda da viewport em qualquer breakpoint.
          sizes="100vw"
          alt="Imóveis de alto padrão Armangni"
          className="kenburns h-full w-full object-cover object-[center_42%]"
          fetchPriority="high"
          decoding="async"
        />
        {/* Vertical scrim gradient overlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,11,0.70) 0%, rgba(10,10,11,0.30) 32%, rgba(10,10,11,0.65) 68%, rgba(10,10,11,0.98) 100%)',
          }}
        />
      </motion.div>

      {/* Desktop horizontal side scrim */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 hidden md:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,11,0.75) 0%, rgba(10,10,11,0.30) 42%, transparent 72%)',
        }}
      />

      {/* Hero content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.45em] text-brand-400"
        >
          <span className="h-px w-9 bg-brand-400/60" />
          Imóveis de Alto Padrão
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-medium leading-[1.08] text-white">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
            >
              Encontre o seu Imóvel ideal
            </motion.span>
          </span>

        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-neutral-200 sm:text-lg"
        >
          Curadoria exclusiva dos endereços mais desejados. Residências, coberturas e casas em condomínios fechados.
        </motion.p>

        {/* Centralized Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease }}
          className="mt-10 w-full max-w-4xl"
        >
          <SearchPanel />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-6 right-6 z-10 hidden sm:block"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-white/60"
        >
          Role
          <ArrowDown className="h-4 w-4 text-brand-400" />
        </motion.span>
      </motion.div>
    </section>
  )
}
