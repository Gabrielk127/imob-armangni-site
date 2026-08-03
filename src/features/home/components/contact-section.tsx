import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Check, Sparkles } from '@/components/icons'
import { EMAIL, PHONE, WHATSAPP, ADDRESS } from '@/data/properties'
import { SectionHeading } from '@/components/section-heading'

const contactChannels = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'E-mail' },
  { id: 'phone', label: 'Ligação' },
]

export function ContactSection() {
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
    }, 1200)
  }

  return (
    <section id="contato" className="relative bg-[#1C1C1C] py-24 scroll-mt-20 text-white overflow-hidden">
      {/* Background Subtle Scrims */}
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(191,180,170,0.4) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(191,180,170,0.4) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Fale Conosco"
          title="Estamos prontos para ajudá-lo a realizar o seu sonho"
          description="Nossa equipe especializada está pronta para esclarecer todas as suas dúvidas e agendar uma visita personalizada ao imóvel."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Informações de contato */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-medium tracking-wide text-[#BFB4AA]">
                Canais de Atendimento
              </h3>
              <p className="text-[15px] font-light leading-relaxed text-neutral-300">
                Seja para adquirir uma residência de alto padrão ou anunciar seu imóvel em Londrina, garantimos discrição e assessoria completa.
              </p>

              <div className="space-y-4 pt-2">
                {/* Telefone / WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-xl border border-white/5 bg-[#262626] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFB4AA]/30 hover:shadow-xl"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1C1C1C] text-[#BFB4AA] transition-colors group-hover:bg-[#BFB4AA] group-hover:text-[#1C1C1C]">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#BFB4AA]/70">
                      Telefone / WhatsApp
                    </h4>
                    <p className="mt-1 font-medium text-white transition-colors group-hover:text-[#BFB4AA]">
                      {PHONE}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-start gap-4 rounded-xl border border-white/5 bg-[#262626] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BFB4AA]/30 hover:shadow-xl"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1C1C1C] text-[#BFB4AA] transition-colors group-hover:bg-[#BFB4AA] group-hover:text-[#1C1C1C]">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#BFB4AA]/70">
                      E-mail
                    </h4>
                    <p className="mt-1 font-medium text-white transition-colors group-hover:text-[#BFB4AA]">
                      {EMAIL}
                    </p>
                  </div>
                </a>

                {/* Endereço */}
                <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-[#262626] p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1C1C1C] text-[#BFB4AA]">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#BFB4AA]/70">
                      Endereço
                    </h4>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-white">
                      {ADDRESS}
                    </p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-[#262626] p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1C1C1C] text-[#BFB4AA]">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#BFB4AA]/70">
                      Horário de Atendimento
                    </h4>
                    <p className="mt-1 text-sm font-medium text-white">
                      Segunda a Sexta: 8h às 18h
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-300">
                      Sábado: 8h às 12h
                    </p>
                    <p className="mt-0.5 text-xs text-[#BFB4AA]">
                      Domingo: Plantão (WhatsApp)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário com Taste UI */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-2xl border border-white/10 bg-[#262626] p-8 shadow-2xl backdrop-blur-xl lg:p-10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex h-full flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#BFB4AA]/20 text-[#BFB4AA]">
                      <Check className="h-8 w-8 stroke-[2.5]" />
                    </div>
                    <h3 className="font-display text-2xl font-medium text-[#BFB4AA]">
                      Solicitação Recebida com Sucesso
                    </h3>
                    <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-neutral-300">
                      Um de nossos especialistas em imóveis de alto padrão entrará em contato em breve através do seu canal preferido.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-8 rounded-full border border-[#BFB4AA] bg-transparent px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#BFB4AA] transition-all hover:bg-[#BFB4AA] hover:text-[#1C1C1C] active:scale-[0.98]"
                    >
                      Enviar outra mensagem
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="border-b border-white/10 pb-6">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#BFB4AA]">
                        <Sparkles className="h-4 w-4" />
                        Formulário de Contato
                      </div>
                      <h3 className="mt-2 font-display text-2xl font-medium text-white sm:text-3xl">
                        Envie uma mensagem
                      </h3>
                      <p className="mt-1 text-xs font-light text-neutral-400 sm:text-sm">
                        Preencha suas informações para receber uma apresentação completa dos nossos imóveis.
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Nome */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-[11px] font-medium uppercase tracking-wider text-[#BFB4AA]">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-[#1C1C1C] px-4 py-3.5 text-sm text-white placeholder-neutral-500 shadow-inner transition-all duration-300 focus:border-[#BFB4AA] focus:bg-[#1C1C1C] focus:outline-none focus:ring-1 focus:ring-[#BFB4AA]"
                          placeholder="Seu nome completo"
                        />
                      </div>

                      {/* Telefone */}
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-[11px] font-medium uppercase tracking-wider text-[#BFB4AA]">
                          Telefone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-white/10 bg-[#1C1C1C] px-4 py-3.5 text-sm text-white placeholder-neutral-500 shadow-inner transition-all duration-300 focus:border-[#BFB4AA] focus:bg-[#1C1C1C] focus:outline-none focus:ring-1 focus:ring-[#BFB4AA]"
                          placeholder="(43) 99999-0000"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[11px] font-medium uppercase tracking-wider text-[#BFB4AA]">
                        E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#1C1C1C] px-4 py-3.5 text-sm text-white placeholder-neutral-500 shadow-inner transition-all duration-300 focus:border-[#BFB4AA] focus:bg-[#1C1C1C] focus:outline-none focus:ring-1 focus:ring-[#BFB4AA]"
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>

                    {/* Canal de Preferência */}
                    <div className="space-y-2">
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#BFB4AA]">
                        Canal de preferência para retorno
                      </label>
                      <div className="grid grid-cols-3 gap-2.5 rounded-xl border border-white/10 bg-[#1C1C1C] p-1.5">
                        {contactChannels.map((item) => {
                          const isActive = formData.preference === item.id
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, preference: item.id })}
                              className={`relative py-2.5 text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                                isActive ? 'text-[#1C1C1C]' : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              {isActive && (
                                <motion.span
                                  layoutId="activePreference"
                                  className="absolute inset-0 rounded-lg bg-[#BFB4AA]"
                                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                              )}
                              <span className="relative z-10">{item.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Mensagem */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-[11px] font-medium uppercase tracking-wider text-[#BFB4AA]">
                        Mensagem ou Especificações do Imóvel *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-[#1C1C1C] px-4 py-3.5 text-sm text-white placeholder-neutral-500 shadow-inner transition-all duration-300 focus:border-[#BFB4AA] focus:bg-[#1C1C1C] focus:outline-none focus:ring-1 focus:ring-[#BFB4AA] resize-none"
                        placeholder="Descreva o imóvel que procura, bairro de preferência ou detalhes para anúncio..."
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-red-400 font-medium">
                        Por favor, preencha todos os campos obrigatórios (*).
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-[#BFB4AA] py-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#1C1C1C] transition-all hover:bg-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1C1C1C] border-t-transparent" />
                          Enviando solicitação...
                        </span>
                      ) : (
                        <>
                          Enviar Solicitação
                          <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
