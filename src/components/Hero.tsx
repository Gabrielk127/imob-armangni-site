import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../data/properties'

const slides = [
  {
    image: IMAGES.heroNight,
    title: 'Onde o alto padrão encontra a sua história.',
    subtitle: 'Curadoria exclusiva dos endereços mais desejados de Londrina.',
  },
  {
    image: IMAGES.heroLiving,
    title: 'Viver bem é uma questão de endereço.',
    subtitle: 'Residências selecionadas nos melhores bairros da cidade.',
  },
  {
    image: IMAGES.heroPool,
    title: 'Exclusividade em cada detalhe.',
    subtitle: 'Casas e coberturas que traduzem sofisticação.',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative flex min-h-[620px] items-center overflow-hidden bg-night-950 lg:min-h-[78vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            index === active ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== active}
        >
          <img
            src={slide.image}
            alt=""
            className={`h-full w-full object-cover transition-transform duration-[9000ms] ease-linear ${
              index === active ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night-950/85 via-night-950/45 to-night-950/20" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night-950/90 to-transparent" />
        </div>
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-36 pt-20 sm:px-6 lg:px-8">
        <p className="mb-6 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.5em] text-brand-400">
          <span className="h-px w-12 bg-brand-400/70" />
          Imóveis de alto padrão
        </p>

        <div className="relative min-h-[180px] max-w-3xl sm:min-h-[220px]">
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className={`transition-all duration-1000 ${
                index === active
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none absolute inset-0 translate-y-4 opacity-0'
              }`}
            >
              <h1 className="font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-neutral-200 sm:text-lg">
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            to="/imoveis"
            className="border border-brand-400/0 bg-brand-500 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-night-950 transition-colors hover:bg-brand-400"
          >
            Conheça os imóveis
          </Link>
          <Link
            to="/#anunciar"
            className="border border-white/40 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:border-brand-400 hover:text-brand-400"
          >
            Anunciar imóvel
          </Link>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Slide ${index + 1}`}
              className={`h-[3px] transition-all duration-500 ${
                index === active ? 'w-10 bg-brand-400' : 'w-5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
