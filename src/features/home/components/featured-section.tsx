import { Link } from '@tanstack/react-router'
import { ArrowRight } from '@/components/icons'
import { usePropertiesList } from '@/hooks/use-properties-list'
import { usePropertyTypes } from '@/hooks/use-property-facets'
import { PropertyCarousel } from '@/components/property-carousel'
import { SectionHeading } from '@/components/section-heading'
import { Skeleton } from '@/components/ui/skeleton'
import { buttonClass } from '@/components/ui/button'
import { properties as mockProperties } from '@/data/properties'

function CarouselSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/3] w-full rounded-card" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-7 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export function FeaturedSection() {
  const { data: propertyTypes = [] } = usePropertyTypes()
  const casaTypeId = propertyTypes.find((t) => t.name.toLowerCase() === 'casa')?.id
  const apTypeId = propertyTypes.find((t) => t.name.toLowerCase() === 'apartamento')?.id
  const sobradoTypeId = propertyTypes.find((t) => t.name.toLowerCase() === 'sobrado')?.id

  // 1. Carrossel: Destaques (o primeiro carrossel)
  const { data: featuredData, isPending: isFeaturedPending } = usePropertiesList({
    isFeatured: true,
    limit: 12,
    sortBy: 'relevance',
  })
  const featuredProperties =
    featuredData?.data && featuredData.data.length > 0
      ? featuredData.data
      : mockProperties.filter((p) => p.featured)

  // 2. Carrossel: Casas em condomínio
  const { data: housesData, isPending: isHousesPending } = usePropertiesList({
    typeId: casaTypeId,
    limit: 25,
    sortBy: 'relevance',
  })
  const condoHouseProperties = (() => {
    const list =
      housesData?.data && housesData.data.length > 0
        ? housesData.data
        : mockProperties.filter(
            (p) =>
              p.type === 'Casa em Condomínio' ||
              p.title?.toLowerCase().includes('casa')
          )

    // Prioriza casas que possuem condomínio cadastrado ou menção a condomínio
    const withCondo = list.filter(
      (p) =>
        Boolean(p.condominium) ||
        p.subtitle?.toLowerCase().includes('condomínio') ||
        p.subtitle?.toLowerCase().includes('condominio') ||
        p.title?.toLowerCase().includes('condomínio') ||
        p.title?.toLowerCase().includes('condominio')
    )
    const withoutCondo = list.filter((p) => !withCondo.includes(p))

    return [...withCondo, ...withoutCondo]
  })()

  // 3. Carrossel: Apartamentos e Coberturas
  const { data: apartmentsData, isPending: isApartmentsPending } = usePropertiesList({
    typeId: apTypeId,
    limit: 16,
    sortBy: 'relevance',
  })
  const apartmentProperties =
    apartmentsData?.data && apartmentsData.data.length > 0
      ? apartmentsData.data
      : mockProperties.filter(
          (p) => p.type === 'Apartamento' || p.type === 'Cobertura'
        )

  // 4. Carrossel: Sobrados
  const { data: sobradosData, isPending: isSobradosPending } = usePropertiesList({
    typeId: sobradoTypeId,
    limit: 16,
    sortBy: 'relevance',
  })
  const sobradoProperties =
    sobradosData?.data && sobradosData.data.length > 0
      ? sobradosData.data
      : mockProperties.filter((p) => p.type === 'Sobrado')

  return (
    <div className="bg-white py-20 space-y-24">
      {/* ── 1. Destaques (Primeiro) ── */}
      <section className="container-page">
        <div className="max-w-3xl space-y-4">
          <SectionHeading
            title="Imóveis em destaque"
            description="Uma curadoria exclusiva de residências com alto padrão construtivo e excelente localização."
          />
          <div>
            <Link
              to="/imoveis"
              search={{ destaque: 'true' }}
              className={buttonClass({
                variant: 'outline',
                size: 'sm',
                className: 'text-small',
              })}
            >
              Ver todos os destaques
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          {isFeaturedPending && (!featuredProperties || featuredProperties.length === 0) ? (
            <CarouselSkeleton />
          ) : featuredProperties.length > 0 ? (
            <PropertyCarousel properties={featuredProperties} label="Imóveis em Destaque" />
          ) : (
            <div className="rounded-card bg-surface p-12 text-center text-body text-muted">
              Nenhum imóvel em destaque encontrado no momento.
            </div>
          )}
        </div>
      </section>

      {/* ── 2. Casas em condomínio ── */}
      <section className="container-page">
        <div className="max-w-3xl space-y-4">
          <SectionHeading
            title="Casas em condomínio"
            description="Residências exclusivas com amplos terrenos, lazer privativo e a tranquilidade que sua família busca."
          />
          <div>
            <Link
              to="/imoveis"
              search={{ tipo: 'Casa' }}
              className={buttonClass({
                variant: 'outline',
                size: 'sm',
                className: 'text-small',
              })}
            >
              Ver todas as casas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          {isHousesPending && (!condoHouseProperties || condoHouseProperties.length === 0) ? (
            <CarouselSkeleton />
          ) : condoHouseProperties.length > 0 ? (
            <PropertyCarousel properties={condoHouseProperties} label="Casas em Condomínio Fechado" />
          ) : (
            <div className="rounded-card bg-surface p-12 text-center text-body text-muted">
              Nenhuma casa em condomínio encontrada no momento.
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Apartamentos & Coberturas ── */}
      <section className="container-page">
        <div className="max-w-3xl space-y-4">
          <SectionHeading
            title="Apartamentos e coberturas"
            description="Ambientes integrados, segurança completa e localizações estratégicas nos bairros mais nobres."
          />
          <div>
            <Link
              to="/imoveis"
              search={{ tipo: 'Apartamento' }}
              className={buttonClass({
                variant: 'outline',
                size: 'sm',
                className: 'text-small',
              })}
            >
              Ver todos os apartamentos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          {isApartmentsPending && (!apartmentProperties || apartmentProperties.length === 0) ? (
            <CarouselSkeleton />
          ) : apartmentProperties.length > 0 ? (
            <PropertyCarousel properties={apartmentProperties} label="Apartamentos de Alto Padrão" />
          ) : (
            <div className="rounded-card bg-surface p-12 text-center text-body text-muted">
              Nenhum apartamento encontrado no momento.
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Sobrados ── */}
      <section className="container-page">
        <div className="max-w-3xl space-y-4">
          <SectionHeading
            title="Sobrados exclusivos"
            description="Espaço inteligente em múltiplos pavimentos com arquitetura contemporânea e excelente privacidade."
          />
          <div>
            <Link
              to="/imoveis"
              search={{ tipo: 'Sobrado' }}
              className={buttonClass({
                variant: 'outline',
                size: 'sm',
                className: 'text-small',
              })}
            >
              Ver todos os sobrados
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8">
          {isSobradosPending && (!sobradoProperties || sobradoProperties.length === 0) ? (
            <CarouselSkeleton />
          ) : sobradoProperties.length > 0 ? (
            <PropertyCarousel properties={sobradoProperties} label="Sobrados Exclusivos" />
          ) : (
            <div className="rounded-card bg-surface p-12 text-center text-body text-muted">
              Nenhum sobrado encontrado no momento.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
