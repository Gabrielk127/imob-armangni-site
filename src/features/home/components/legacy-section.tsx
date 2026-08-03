import { Link } from '@tanstack/react-router'
import { ArmangniMark } from '@/components/icons'
import logoBranco from '@/images/logo-branco.png'

export function LegacySection() {
  return (
    <section className="bg-neutral-100 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-md">
          <div className="pointer-events-none absolute -left-5 -top-5 h-full w-full border border-brand-500/40" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-night-800 via-night-950 to-black p-8 shadow-[0_35px_70px_-30px_rgba(10,10,11,0.6)]">
            <div
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full opacity-30 blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(191,180,170,0.7) 0%, transparent 70%)',
              }}
            />
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center border border-brand-400/60 text-brand-400">
                  <ArmangniMark className="h-6 w-8" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
                  Excelência Imobiliária
                </span>
              </div>
              <div>
                <img
                  src={logoBranco}
                  alt="Armangni Negócios Imobiliários"
                  className="h-10 w-auto object-contain opacity-90"
                />

              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="mb-4 flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-brand-500 lg:justify-start">
            <span className="hidden h-px w-10 bg-brand-500/60 lg:block" />
            Nossa história
          </p>
          <h2 className="font-display text-2xl font-medium leading-relaxed text-night-950 sm:text-3xl">
            A Armangni Negócios Imobiliários é referência pelo atendimento personalizado.
          </h2>

          <p className="mt-5 text-[15px] font-light leading-relaxed text-neutral-600">
            Nossa missão é ajudar pessoas que precisam de uma assessoria confiável para escolher os melhores investimentos ou o melhor lar para viver. Atualmente estamos presentes nas cidades de <strong>Londrina, Ibiporã, Rolândia, Apucarana, Cornélio Procópio e Santo Antônio da Platina</strong>, com imóveis variados entre casas, apartamentos, terrenos, salas e barracões comerciais.
          </p>

          <p className="mt-4 text-[15px] font-light leading-relaxed text-neutral-600">
            Independentemente do tipo de imóvel que você deseja, seja padrão ou alto padrão, nossas sugestões são escolhidas minuciosamente, de acordo com o perfil e os objetivos de cada cliente.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              to='/'
              hash='contato'
              className="bg-night-950 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-colors hover:bg-night-800"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
