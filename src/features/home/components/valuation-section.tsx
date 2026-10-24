import { Link } from '@tanstack/react-router'
import { ArrowRight, DollarSign, FileText, Home } from '@/components/icons'
import { ANUNCIAR_WHATSAPP_LINK } from '@/data/properties'
import { SectionHeading } from '@/components/section-heading'

const services = [
  {
    icon: FileText,
    title: 'Imóvel sob encomenda',
    description: 'Descreva a localização, perfil e características do imóvel desejado. Mapeamos as melhores oportunidades em Londrina.',
    action: 'Encomendar imóvel',
    href: '/#contato',
    external: false,
  },
  {
    icon: DollarSign,
    title: 'Simulação & Financiamento',
    description: 'Assessoria completa na estruturação do crédito imobiliário com as melhores taxas das instituições financeiras parceiras.',
    action: 'Simular financiamento',
    href: '/#contato',
    external: false,
  },
  {
    icon: Home,
    title: 'Avaliação & Anúncio',
    description: 'Avaliação mercadológica criteriosa, produção audiovisual profissional e discrição na venda do seu patrimônio.',
    action: 'Cadastrar imóvel',
    href: ANUNCIAR_WHATSAPP_LINK,
    external: true,
  },
]

export function ValuationSection() {
  return (
    <section id="anunciar" className="bg-night-950 py-24 text-white">
      <div className="container-page space-y-14">
        <SectionHeading
          dark
          title="Assessoria para o seu patrimônio"
          description="Acompanhamento personalizado em todas as etapas de compra, venda e estruturação patrimonial em Londrina."
        />

        <div className="grid gap-10 md:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <h3 className="font-display text-lead font-light text-white">
                  {item.title}
                </h3>
                <p className="text-body font-light leading-relaxed text-neutral-300">
                  {item.description}
                </p>
              </div>

              <div>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-small font-medium text-brand-300 transition-colors hover:text-white"
                  >
                    <span className="border-b border-brand-300/40 pb-0.5 group-hover:border-white">
                      {item.action}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => {
                      const el = document.getElementById('contato')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group inline-flex items-center gap-2 text-small font-medium text-brand-300 transition-colors hover:text-white"
                  >
                    <span className="border-b border-brand-300/40 pb-0.5 group-hover:border-white">
                      {item.action}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
