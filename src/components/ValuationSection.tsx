import { Link } from 'react-router-dom'
import { CheckCircle2, Home, Play } from 'lucide-react'
import { IMAGES, WHATSAPP } from '../data/properties'

const benefits = [
  { title: 'Duas décadas de experiência', detail: 'no mercado imobiliário de alto padrão' },
  { title: 'Networking exclusivo', detail: 'que acelera negócios' },
  { title: 'Segurança jurídica', detail: 'do início ao fim' },
  { title: 'Marketing estratégico', detail: 'focado em resultados' },
  { title: 'Fotos e vídeos profissionais', detail: 'para valorizar seu imóvel' },
  { title: 'Especialistas que são', detail: 'referência no mercado' },
]

export default function ValuationSection() {
  return (
    <section id="anunciar" className="relative overflow-hidden bg-night-950 py-24">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(222,146,38,0.55) 0%, rgba(222,146,38,0.12) 45%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-40 h-[480px] w-[480px] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(222,146,38,0.5) 0%, rgba(222,146,38,0.1) 45%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-400">
            <span className="h-px w-10 bg-brand-400/60" />
            Avalie agora
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight text-white sm:text-[44px]">
            Seu imóvel avaliado por quem realmente entende de alto padrão.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] font-light leading-relaxed text-neutral-300">
            Avaliação criteriosa, discreta e fundamentada em dados reais do mercado de luxo de
            Londrina — para que cada decisão seja tomada com segurança.
          </p>

          <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                <p className="text-sm leading-snug text-neutral-200">
                  <span className="font-medium text-white">{benefit.title}</span>
                  <span className="block font-light text-neutral-400">{benefit.detail}</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-11 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de avaliar meu imóvel.')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-500 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-night-950 transition-colors hover:bg-brand-400"
            >
              Avaliar imóvel
            </a>
            <Link
              to="/#contato"
              className="border border-white/30 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:border-brand-400 hover:text-brand-400"
            >
              Falar com especialista
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={IMAGES.broker}
              alt="Especialista em imóveis de alto padrão"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-night-950/20" />

            <button
              type="button"
              aria-label="Assistir apresentação"
              className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full border border-white/50 bg-white/10 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-brand-400">
                <Play className="ml-1 h-7 w-7 fill-white text-white" />
              </span>
            </button>

            <div className="absolute left-5 top-5 flex items-center gap-3 bg-white/95 px-4 py-3 shadow-lg">
              <span className="grid h-9 w-9 place-items-center bg-night-950 text-brand-400">
                <Home className="h-4 w-4" />
              </span>
              <p className="text-xs leading-tight text-neutral-500">
                Sua estimativa está dentro de
                <span className="block font-display text-lg font-semibold text-night-950">
                  R$ 2.250.000
                </span>
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-2/3 w-2/3 border border-brand-400/30" />
        </div>
      </div>
    </section>
  )
}
