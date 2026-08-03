import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, Home, Sparkles, BedDouble } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'

const propertyTypesData = [
  {
    name: 'Apartamentos',
    type: 'Apartamento',
    icon: Building2,
    description: 'Residências urbanas de alto padrão',
  },
  {
    name: 'Coberturas',
    type: 'Cobertura',
    icon: Sparkles,
    description: 'Penthouses e vistas panorâmicas exclusivas',
  },
  {
    name: 'Casas em Condomínio',
    type: 'Casa em Condomínio',
    icon: Home,
    description: 'Segurança, privacidade e lazer completo',
  },
  {
    name: 'Sobrados',
    type: 'Sobrado',
    icon: BedDouble,
    description: 'Espaço, sofisticação e conforto familiar',
  },
]

export function NeighborhoodsSection() {
  return (
    <section className="bg-[#1C1C1C] py-24 text-white border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Portfólio"
          title="Tipos de Imóveis"
          description="Residências escolhidas a dedo para quem procura mais do que um endereço."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {propertyTypesData.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to="/imoveis"
                search={{ tipo: item.type }}
                className="group relative flex flex-col justify-between h-60 rounded-2xl border border-white/10 bg-[#262626] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#BFB4AA]/40 hover:shadow-2xl"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1C1C1C] text-[#BFB4AA] transition-colors group-hover:bg-[#BFB4AA] group-hover:text-[#1C1C1C]">
                    <Icon className="h-6 w-6 stroke-[1.8]" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-medium tracking-wide text-[#BFB4AA] group-hover:text-white transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-400 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#BFB4AA] group-hover:text-white transition-colors">
                    Ver imóveis
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
