import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { neighborhoods } from '../data/properties'
import SectionHeading from './SectionHeading'

export default function NeighborhoodsSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Localização"
          title="Nos melhores bairros de Londrina"
          description="Da Gleba Palhano à Alphaville, endereços que definem o alto padrão na cidade."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {neighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.name}
              to={`/imoveis?q=${encodeURIComponent(neighborhood.name)}`}
              className="group relative block h-72 overflow-hidden rounded-xl"
            >
              <img
                src={neighborhood.image}
                alt={neighborhood.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-night-950/20 to-night-950/5 transition-colors group-hover:from-night-950/90" />
              <div className="absolute inset-x-5 bottom-5">
                <h3 className="font-display text-2xl font-medium text-white">
                  {neighborhood.name}
                </h3>
                <p className="mt-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-400">
                  Ver imóveis
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
