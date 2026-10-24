import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Check } from '@/components/icons'
import { EMAIL, PHONE, WHATSAPP, ADDRESS } from '@/data/properties'
import { SectionHeading } from '@/components/section-heading'
import { submitContact } from '@/lib/tracking'
import { buttonClass } from '@/components/ui/button'

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

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'failed'
  >('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    setStatus('loading')
    const sent = await submitContact(formData)
    if (!sent) {
      setStatus('failed')
      return
    }

    setStatus('success')
    setFormData({
      name: '',
      email: '',
      phone: '',
      preference: 'whatsapp',
      message: '',
    })
  }

  return (
    <section id="contato" className="relative bg-night-950 py-24 scroll-mt-20 text-white">
      <div className="container-page space-y-16">
        <SectionHeading
          dark
          title="Fale com a nossa equipe especializada"
          description="Atendimento com discrição e assessoria completa para esclarecer dúvidas, agendar visitas ou anunciar seu imóvel em Londrina."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Informações de contato */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="space-y-8">
              {/* Telefone / WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="group block space-y-1"
              >
                <p className="text-small font-medium text-brand-300">
                  Telefone / WhatsApp
                </p>
                <p className="font-display text-lead font-light text-white transition-colors group-hover:text-brand-300">
                  {PHONE}
                </p>
              </a>

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="group block space-y-1"
              >
                <p className="text-small font-medium text-brand-300">
                  E-mail de Atendimento
                </p>
                <p className="font-display text-lead font-light text-white transition-colors group-hover:text-brand-300">
                  {EMAIL}
                </p>
              </a>

              {/* Endereço */}
              <div className="space-y-1">
                <p className="text-small font-medium text-brand-300">
                  Endereço
                </p>
                <p className="text-body font-light leading-relaxed text-neutral-200">
                  {ADDRESS}
                </p>
              </div>

              {/* Horário */}
              <div className="space-y-1">
                <p className="text-small font-medium text-brand-300">
                  Horário de Funcionamento
                </p>
                <p className="text-body font-light text-neutral-200">
                  Segunda a Sexta: 8h às 18h · Sábado: 8h às 12h
                </p>
                <p className="text-small text-brand-400">
                  Plantão de atendimento via WhatsApp aos domingos
                </p>
              </div>
            </div>
          </div>

          {/* Formulário com Taste UI */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-card border border-white/10 bg-night-800 p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex h-full flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-brand-500/20 text-brand-300">
                      <Check className="h-7 w-7" />
                    </div>
                    <h3 className="font-display text-2xl font-light text-white">
                      Mensagem enviada com sucesso
                    </h3>
                    <p className="mt-3 max-w-sm text-body font-light leading-relaxed text-neutral-300">
                      Nossos corretores especialistas entrarão em contato em breve através do canal informado.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className={buttonClass({
                        variant: 'accent',
                        size: 'md',
                        className: 'mt-7 font-semibold',
                      })}
                    >
                      Enviar outra mensagem
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl font-light text-white sm:text-3xl">
                        Envie uma mensagem
                      </h3>
                      <p className="mt-1.5 text-small text-neutral-300">
                        Preencha o formulário para receber o catálogo completo ou agendar uma visita.
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Nome */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="block text-small font-medium text-neutral-300">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-card border border-white/15 bg-night-950 px-4 py-3 text-body text-white placeholder-neutral-500 transition-colors focus:border-brand-400 focus:outline-none"
                          placeholder="Seu nome"
                        />
                      </div>

                      {/* Telefone */}
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block text-small font-medium text-neutral-300">
                          Telefone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-card border border-white/15 bg-night-950 px-4 py-3 text-body text-white placeholder-neutral-500 transition-colors focus:border-brand-400 focus:outline-none"
                          placeholder="(43) 99999-0000"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-small font-medium text-neutral-300">
                        E-mail de Contato *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-card border border-white/15 bg-night-950 px-4 py-3 text-body text-white placeholder-neutral-500 transition-colors focus:border-brand-400 focus:outline-none"
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>

                    {/* Canal de Preferência */}
                    <div className="space-y-2">
                      <span className="block text-small font-medium text-neutral-300">
                        Canal preferido para retorno
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {contactChannels.map((item) => {
                          const isActive = formData.preference === item.id
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, preference: item.id })}
                              className={`rounded-card py-2.5 text-small font-medium transition-colors ${
                                isActive
                                  ? 'bg-brand-500 text-night-950 font-semibold'
                                  : 'bg-night-950 text-neutral-300 hover:text-white'
                              }`}
                            >
                              {item.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Mensagem */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block text-small font-medium text-neutral-300">
                        Mensagem ou Especificações do Imóvel *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-card border border-white/15 bg-night-950 px-4 py-3 text-body text-white placeholder-neutral-500 transition-colors focus:border-brand-400 focus:outline-none resize-none"
                        placeholder="Descreva o perfil do imóvel procurado, bairro de interesse ou dúvidas..."
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-small text-red-400 font-medium">
                        Por favor, preencha todos os campos obrigatórios (*).
                      </p>
                    )}
                    {status === 'failed' && (
                      <p role="alert" className="text-small text-red-400 font-medium">
                        Não conseguimos enviar agora. Tente novamente ou entre em contato direto pelo WhatsApp.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={buttonClass({
                        variant: 'accent',
                        size: 'lg',
                        block: true,
                        className: 'font-semibold',
                      })}
                    >
                      {status === 'loading' ? (
                        'Enviando mensagem...'
                      ) : (
                        <>
                          <span>Enviar Solicitação</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
