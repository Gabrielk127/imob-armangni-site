import { Link } from '@tanstack/react-router'
import { ArrowRight, DollarSign, FileText, Home } from '@/components/icons'
import { ANUNCIAR_WHATSAPP_LINK } from '@/data/properties'

const services = [
  {
    icon: FileText,
    title: 'Imóvel sob encomenda',
    description: 'Descreva o imóvel que você procura e nós avisaremos quando encontrarmos.',
    action: 'Encomende seu imóvel',
    href: '/#contato',
    external: false,
  },
  {
    icon: DollarSign,
    title: 'Financiamento',
    description: 'As melhores ofertas de crédito para você financiar seu imóvel.',
    action: 'Faça uma simulação',
    href: '/#contato',
    external: false,
  },
  {
    icon: Home,
    title: 'Cadastre seu imóvel',
    description: 'Anuncie conosco! Nós encontraremos o melhor negócio para você.',
    action: 'Cadastre seu imóvel',
    href: ANUNCIAR_WHATSAPP_LINK,
    external: true,
  },
]

export function ValuationSection() {
  return (
    <section id="anunciar" className="bg-[#1C1C1C] py-20 text-white border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between space-y-6 rounded-2xl bg-[#262626] p-8 border border-white/5 shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1C1C] text-[#BFB4AA]">
                    <Icon className="h-7 w-7 stroke-[1.8]" />
                  </div>
                  <h3 className="font-display text-2xl font-medium tracking-wide text-[#BFB4AA] sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-neutral-300 sm:text-base">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-sm font-medium tracking-wide text-[#BFB4AA] transition-colors hover:text-white cursor-pointer"
                    >
                      <span className="border-b border-[#BFB4AA]/40 pb-0.5 transition-colors group-hover:border-white">
                        {item.action}
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => {
                        const el = document.getElementById('contato')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="group inline-flex items-center gap-3 text-sm font-medium tracking-wide text-[#BFB4AA] transition-colors hover:text-white cursor-pointer"
                    >
                      <span className="border-b border-[#BFB4AA]/40 pb-0.5 transition-colors group-hover:border-white">
                        {item.action}
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
