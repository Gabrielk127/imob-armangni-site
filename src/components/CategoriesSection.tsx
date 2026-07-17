import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/properties'
import SectionHeading from './SectionHeading'

function CategoryCard({
  label,
  type,
  image,
  className = '',
}: {
  label: string
  type: string
  image: string
  className?: string
}) {
  return (
    <Link
      to={`/imoveis?tipo=${encodeURIComponent(type)}`}
      className={`group relative block overflow-hidden rounded-xl ${className}`}
    >
      <img
        src={image}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-night-950/25 to-night-950/10 transition-colors group-hover:from-night-950/90" />
      <div className="absolute inset-x-6 bottom-6">
        <h3 className="font-display text-[26px] font-medium leading-tight text-white">{label}</h3>
        <p className="mt-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-400">
          Ver imóveis
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  )
}

export default function CategoriesSection() {
  const [penthouses, condoHouses, townHouses, apartments] = categories

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfólio"
          title="Imóveis exclusivos"
          description="Residências raras, escolhidas a dedo para quem procura mais do que um endereço."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:h-[540px] lg:grid-cols-3 lg:grid-rows-2">
          <CategoryCard {...penthouses} className="min-h-[300px] lg:row-span-2" />
          <CategoryCard {...condoHouses} className="min-h-[300px] lg:row-span-2" />
          <CategoryCard {...townHouses} className="min-h-[220px]" />
          <CategoryCard {...apartments} className="min-h-[220px]" />
        </div>
      </div>
    </section>
  )
}
