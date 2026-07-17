import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { properties } from '../data/properties'
import type { Purpose } from '../data/properties'
import PropertyCarousel from './PropertyCarousel'
import SectionHeading from './SectionHeading'

export default function FeaturedSection() {
  const [purpose, setPurpose] = useState<Purpose>('venda')

  const featured = useMemo(
    () =>
      properties
        .filter((p) => p.purpose === purpose)
        .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
        .slice(0, 6),
    [purpose],
  )

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Seleção Aurum"
          title="Os imóveis mais desejados de Londrina."
          description="Uma curadoria criteriosa de residências que unem localização, arquitetura e exclusividade. Encontre o seu."
        />

        <div className="mt-10 flex justify-center">
          <div className="flex border border-neutral-200">
            {(['venda', 'aluguel'] as Purpose[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPurpose(option)}
                className={`px-10 py-3 text-[12px] font-semibold uppercase tracking-[0.24em] transition-colors ${
                  purpose === option
                    ? 'bg-night-950 text-white'
                    : 'bg-white text-neutral-500 hover:text-night-950'
                }`}
              >
                {option === 'venda' ? 'Comprar' : 'Alugar'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <PropertyCarousel properties={featured} />
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to={`/imoveis?finalidade=${purpose}`}
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
