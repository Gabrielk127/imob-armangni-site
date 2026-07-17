import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'
import { EMAIL, PHONE, ADDRESS, IMAGES } from '../data/properties'
import SectionHeading from './SectionHeading'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preference: 'whatsapp',
    message: '',
  })
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    setStatus('loading')
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        preference: 'whatsapp',
        message: '',
      })
    }, 1500)
  }

  return (
    <section id="contato" className="relative bg-neutral-50 py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fale Conosco"
          title="Inicie um atendimento personalizado."
          description="Nossos especialistas estão prontos para compreender suas necessidades e apresentar as melhores oportunidades de alto padrão em Londrina."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Informações de contato */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-medium text-night-950">
                Canais de Atendimento
              </h3>
              <p className="text-[15px] font-light leading-relaxed text-neutral-500">
                Seja para comprar, vender ou alugar, oferecemos uma assessoria completa e personalizada em cada etapa da sua jornada.
              </p>

              <div className="space-y-4 pt-4">
                {/* Telefone */}
                <a
                  href={`tel:${PHONE.replace(/\D/g, '')}`}
                  className="group flex items-start gap-4 rounded-xl border border-neutral-200/60 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-lg hover:shadow-neutral-100"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neutral-50 text-brand-500 transition-colors group-hover:bg-brand-50">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Telefone
                    </h4>
                    <p className="mt-1 font-medium text-night-950 transition-colors group-hover:text-brand-600">
                      {PHONE}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-start gap-4 rounded-xl border border-neutral-200/60 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:shadow-lg hover:shadow-neutral-100"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neutral-50 text-brand-500 transition-colors group-hover:bg-brand-50">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      E-mail
                    </h4>
                    <p className="mt-1 font-medium text-night-950 transition-colors group-hover:text-brand-600">
                      {EMAIL}
                    </p>
                  </div>
                </a>

                {/* Endereço */}
                <div className="flex items-start gap-4 rounded-xl border border-neutral-200/60 bg-white p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neutral-50 text-brand-500">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Nosso Escritório
                    </h4>
                    <p className="mt-1 text-sm font-medium text-night-950 leading-relaxed">
                      {ADDRESS}
                    </p>
                  </div>
                </div>

                {/* Horário de Funcionamento */}
                <div className="flex items-start gap-4 rounded-xl border border-neutral-200/60 bg-white p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neutral-50 text-brand-500">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Horário de Funcionamento
                    </h4>
                    <p className="mt-1 text-sm font-medium text-night-950">
                      Segunda a Sexta · 08:30 às 18:00
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Sábado · 09:00 às 13:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Link para o Google Maps estilizado */}
            <div className="relative mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm group">
              <img
                src={IMAGES.cityB}
                alt="Londrina High-rise"
                className="h-44 w-full object-cover opacity-80 filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-night-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-white uppercase">
                  Localização Privilegiada
                </span>
                <a
                  href="https://maps.google.com/?q=Avenida+Winston+Churchill+500+Gleba+Palhano+Londrina"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded bg-brand-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-night-950 hover:bg-brand-400 transition-colors"
                >
                  Ver no Mapa
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de mensagem */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm lg:p-10">
              {status === 'success' ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-16">
                  <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-500 animate-scale-up">
                    <Check className="h-8 w-8 stroke-[3]" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-night-950">
                    Mensagem Enviada!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-neutral-500">
                    Agradecemos seu contato. Nossa equipe de especialistas analisará sua solicitação e retornará em breve.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-8 bg-night-950 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-500 hover:text-white"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display text-2xl font-medium text-night-950 mb-2">
                      Envie uma Mensagem
                    </h3>
                    <p className="text-[14px] font-light text-neutral-500">
                      Preencha os campos abaixo para iniciarmos seu atendimento exclusivo.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Nome */}
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-night-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none"
                        placeholder="Seu nome"
                      />
                    </div>

                    {/* Telefone */}
                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-night-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none"
                        placeholder="(43) 99999-0000"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-night-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none"
                      placeholder="seuemail@exemplo.com"
                    />
                  </div>

                  {/* Canal de Preferência */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                      Como prefere ser contatado?
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'whatsapp', label: 'WhatsApp' },
                        { id: 'email', label: 'E-mail' },
                        { id: 'phone', label: 'Ligação' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, preference: item.id })}
                          className={`border py-3 text-[11px] font-semibold uppercase tracking-widest transition-all ${
                            formData.preference === item.id
                              ? 'border-brand-500 bg-brand-50/20 text-brand-700'
                              : 'border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-night-950'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label htmlFor="message" className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-night-950 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none resize-none"
                      placeholder="Descreva suas preferências de imóvel, dúvidas ou agende uma visita..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-500 font-medium">
                      Por favor, preencha todos os campos obrigatórios (*).
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative flex w-full items-center justify-center gap-3 bg-night-950 py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-white transition-all hover:bg-brand-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-neutral-300"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Enviando...
                      </span>
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
