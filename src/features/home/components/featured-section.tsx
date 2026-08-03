import { Link } from '@tanstack/react-router'
import { ArrowRight } from '@/components/icons'
import { usePropertiesList } from '@/hooks/use-properties-list'
import { PropertyCarousel } from '@/components/property-carousel'
import { SectionHeading } from '@/components/section-heading'

export function FeaturedSection() {
  // `relevance` já coloca os destacados na frente, então a vitrine não
  // precisa reordenar nada no cliente.
  const { data } = usePropertiesList({ limit: 6, sortBy: 'relevance' })
  const featured = data?.data ?? []

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Seleção Armangni"
          title="Os imóveis mais desejados de Londrina."
          description="Uma curadoria criteriosa de residências que unem localização, arquitetura e exclusividade. Encontre o seu."
        />

        <div className="mt-12">
          <PropertyCarousel properties={featured} />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/imoveis"
            className="group flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.26em] text-night-950 transition-colors hover:text-brand-600"
          >
            Ver todos os imóveis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
