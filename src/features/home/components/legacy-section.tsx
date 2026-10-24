import { Link } from '@tanstack/react-router'
import { ArmangniMark } from '@/components/icons'
import logoBranco from '@/images/logo-branco.png'
import { buttonClass } from '@/components/ui/button'

export function LegacySection() {
  return (
    <section className="bg-surface/50 py-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        {/* Card Visual Institucional */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-night-950 p-8">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-card bg-white/10 text-brand-300">
                  <ArmangniMark className="h-6 w-8" />
                </span>
                <span className="text-small font-medium text-brand-300">
                  Creci 8328-J
                </span>
              </div>

              <div>
                <img
                  src={logoBranco}
                  alt="Armangni Negócios Imobiliários"
                  width={200}
                  height={50}
                  className="h-10 w-auto object-contain opacity-95"
                />
                <p className="mt-3 text-small text-neutral-300">
                  Assessoria imobiliária especializada em alto padrão.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Narrativa da Marca */}
        <div className="text-left">
          <h2 className="font-display text-head font-light leading-[1.08] tracking-tight text-ink">
            Atendimento e discrição
          </h2>

          <p className="mt-6 text-body leading-relaxed text-ink">
            A Armangni Negócios Imobiliários nasceu com o propósito de guiar investidores e famílias que exigem curadoria criteriosa, segurança jurídica e discrição absoluta ao negociar patrimônios de valor.
          </p>

          <p className="mt-4 text-body leading-relaxed text-muted">
            Atuamos fortemente em Londrina, com ênfase na <strong>Gleba Palhano</strong> e condomínios horizontais fechados, além de oportunidades selecionadas em Ibiporã, Rolândia e região.
          </p>

          <div className="mt-8">
            <Link
              to="/"
              hash="contato"
              className={buttonClass({
                variant: 'primary',
                size: 'md',
                className: 'font-semibold',
              })}
            >
              Fale com um Especialista
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
