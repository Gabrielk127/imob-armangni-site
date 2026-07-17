import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../data/properties'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const step = (delta: number) =>
    setActive((current) => (current + delta + testimonials.length) % testimonials.length)

  const testimonial = testimonials[active]

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading eyebrow="Depoimentos" title="O que nossos clientes dizem" />

        <div className="relative mt-14">
          <span className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-night-950 text-brand-400">
            <Quote className="h-6 w-6 fill-brand-400" />
          </span>

          <figure
            key={active}
            className="bg-neutral-50 px-8 pb-10 pt-16 ring-1 ring-neutral-200/70 sm:px-14"
          >
            <blockquote className="text-[15px] font-light leading-relaxed text-neutral-600">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-display text-xl font-medium text-night-950">
                {testimonial.author}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-neutral-400">
                {testimonial.role}
              </p>
            </figcaption>
          </figure>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Depoimento anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200 text-night-950 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.author}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Depoimento ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    index === active ? 'w-7 bg-brand-500' : 'w-2.5 bg-neutral-300'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próximo depoimento"
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200 text-night-950 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
