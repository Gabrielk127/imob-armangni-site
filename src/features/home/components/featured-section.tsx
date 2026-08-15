import { Link } from '@tanstack/react-router'
import { ArrowRight } from '@/components/icons'
import { usePropertiesList } from '@/hooks/use-properties-list'
import { PropertyCarousel } from '@/components/property-carousel'
import { SectionHeading } from '@/components/section-heading'

export function FeaturedSection() {
  // 1. Carrossel: Imóveis exclusivamente de Londrina
  const { data: londrinaData } = usePropertiesList({
    city: 'Londrina',
    limit: 12,
    sortBy: 'relevance',
  })
  const londrinaProperties = (londrinaData?.data ?? []).filter(
    (p) => !p.city || p.city.toLowerCase().includes('londrina')
  )

  // 2. Carrossel: Apartamentos
  const { data: apartmentsData } = usePropertiesList({
    search: 'Apartamento',
    limit: 12,
    sortBy: 'relevance',
  })
  const apartmentProperties = (apartmentsData?.data ?? []).filter(
    (p) =>
      p.type?.toLowerCase().includes('apartamento') ||
      p.title?.toLowerCase().includes('apartamento')
  )

  // 3. Carrossel: Casas em Condomínio / Sobrados
  const { data: housesData } = usePropertiesList({
    search: 'Casa',
    limit: 12,
    sortBy: 'relevance',
  })
  const houseProperties = (housesData?.data ?? []).filter(
    (p) =>
      p.type?.toLowerCase().includes('casa') ||
      p.type?.toLowerCase().includes('sobrado') ||
      p.title?.toLowerCase().includes('casa') ||
      p.title?.toLowerCase().includes('sobrado')
  )

  return (
    <section className="bg-white py-24 space-y-24">
      {/* ── 1. Imóveis de Londrina ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Seleção Armangni"
          title="Os imóveis mais desejados de Londrina."
          description="Uma curadoria criteriosa de residências em Londrina que unem localização privilegiada, arquitetura e exclusividade."
        />

        <div className="mt-12">
          {londrinaProperties.length > 0 ? (
            <PropertyCarousel properties={londrinaProperties} />
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-200 p-12 text-center text-sm text-neutral-400">
              Nenhum imóvel encontrado em Londrina no momento.
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/imoveis"
            search={{ bairro: undefined, finalidade: undefined }}
            className="group flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.26em] text-night-950 transition-colors hover:text-brand-600"
          >
            Ver todos os imóveis em Londrina
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-neutral-100" />
      </div>

      {/* ── 2. Apartamentos ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Coleção Residencial"
          title="Apartamentos de Alto Padrão"
          description="Ambientes integrados, segurança completa e localizações estratégicas para o seu dia a dia."
        />

        <div className="mt-12">
          {apartmentProperties.length > 0 ? (
            <PropertyCarousel properties={apartmentProperties} />
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-200 p-12 text-center text-sm text-neutral-400">
              Nenhum apartamento encontrado no momento.
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/imoveis"
            search={{ tipo: 'Apartamento' }}
            className="group flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.26em] text-night-950 transition-colors hover:text-brand-600"
          >
            Ver todos os apartamentos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <hr className="border-neutral-100" />
      </div>

      {/* ── 3. Casas em Condomínio ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Privacidade & Segurança"
          title="Casas em Condomínio Fechado"
          description="Residências exclusivas com amplos terrenos, lazer completo e a tranquilidade que sua família merece."
        />

        <div className="mt-12">
          {houseProperties.length > 0 ? (
            <PropertyCarousel properties={houseProperties} />
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-200 p-12 text-center text-sm text-neutral-400">
              Nenhuma casa em condomínio encontrada no momento.
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/imoveis"
            search={{ tipo: 'Casa' }}
            className="group flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.26em] text-night-950 transition-colors hover:text-brand-600"
          >
            Ver todas as casas em condomínio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
