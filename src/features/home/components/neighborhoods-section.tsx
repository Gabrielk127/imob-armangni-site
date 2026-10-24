import { Link } from '@tanstack/react-router'
import { ArrowRight } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'
import { IMAGES } from '@/data/properties'

const propertyTypesData = [
  {
    name: 'Apartamentos',
    type: 'Apartamento',
    image: IMAGES.apartment,
    description: 'Residências urbanas de alto padrão com plantas inteligentes e localização nobre.',
  },
  {
    name: 'Coberturas',
    type: 'Cobertura',
    image: IMAGES.terrace,
    description: 'Penthouses exclusivas e vistas panorâmicas nos pontos mais altos da cidade.',
  },
  {
    name: 'Casas em Condomínio',
    type: 'Casa em Condomínio',
    image: IMAGES.condoHouse,
    description: 'Segurança perimetral, amplos terrenos, lazer privativo e contato com a natureza.',
  },
  {
    name: 'Sobrados',
    type: 'Sobrado',
    image: IMAGES.sobrado,
    description: 'Arquitetura imponente, sofisticação espacial e conforto para toda a família.',
  },
]

export function NeighborhoodsSection() {
  return (
    <section className="bg-night-950 py-24 text-white">
      {/* Signature Marquee Band (Taste Skill Direction) */}
      <div className="relative mb-20 overflow-hidden py-5" aria-hidden>
        <div className="flex w-max animate-[marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 px-4">
              <span className="font-display text-xl sm:text-2xl font-light text-neutral-300">
                Armangni Negócios Imobiliários
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="text-body font-light text-brand-300">
                Gleba Palhano e Região
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="font-display text-xl sm:text-2xl font-light text-neutral-300">
                Alto Padrão em Londrina
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              <span className="text-body font-light text-brand-300">
                Creci 8328-J
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            </div>
          ))}
        </div>
      </div>

      <div className="container-page space-y-14">
        <SectionHeading
          dark
          title="Tipos de Imóveis"
          description="Residências selecionadas para quem busca mais do que um endereço: uma experiência de vida."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {propertyTypesData.map((item) => (
            <Link
              key={item.name}
              to="/imoveis"
              search={{ tipo: item.type }}
              className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-card p-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              {/* Imagem de Fundo de Arquitetura */}
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
              />

              {/* Scrim neutro permanente para leitura nítida */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(to top, rgba(10, 10, 11, 0.95) 0%, rgba(10, 10, 11, 0.5) 50%, rgba(10, 10, 11, 0.2) 100%)',
                }}
              />

              <div className="relative z-10 space-y-2">
                <h3 className="font-display text-2xl font-normal tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-small font-light leading-relaxed text-neutral-300 line-clamp-2">
                  {item.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-small font-medium text-brand-300 group-hover:text-white transition-colors">
                  <span>Explorar carteira</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
