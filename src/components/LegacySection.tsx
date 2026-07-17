import { Link } from 'react-router-dom'

export default function LegacySection() {
  return (
    <section className="bg-neutral-100 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-md">
          <div className="pointer-events-none absolute -left-5 -top-5 h-full w-full border border-brand-500/40" />
          <div className="relative aspect-[8/5] -rotate-2 overflow-hidden rounded-2xl bg-gradient-to-br from-night-800 via-night-950 to-black p-8 shadow-[0_35px_70px_-30px_rgba(10,10,11,0.6)] transition-transform duration-500 hover:rotate-0">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full opacity-30 blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(222,146,38,0.7) 0%, transparent 70%)',
              }}
            />
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center border border-brand-400/60 font-display text-xl text-brand-400">
                  A
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
                  Desde 2006
                </span>
              </div>
              <div className="flex items-end justify-between">
                <p className="font-display leading-none text-white">
                  <span className="text-7xl font-semibold text-brand-400">20</span>
                  <span className="ml-2 text-2xl uppercase tracking-[0.3em]">anos</span>
                </p>
                <p className="font-display text-lg tracking-[0.24em] text-neutral-300">AURUM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="mb-4 flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-500 lg:justify-start">
            <span className="hidden h-px w-10 bg-brand-500/60 lg:block" />
            Nossa história
          </p>
          <h2 className="font-display text-4xl font-medium leading-tight text-night-950 sm:text-[44px]">
            Referência em imóveis de alto padrão para comprar, vender ou alugar em Londrina.
          </h2>
          <p className="mt-5 text-[15px] font-light leading-relaxed text-neutral-500">
            Duas décadas transformando escolhas em conquistas — com atendimento próximo,
            curadoria rigorosa e a confiança de quem entende que morar bem é a maior das
            sofisticações.
          </p>
          <div className="mt-9 flex justify-center lg:justify-start">
            <Link
              to="/#contato"
              className="bg-night-950 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-night-800"
            >
              Conheça a história
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
