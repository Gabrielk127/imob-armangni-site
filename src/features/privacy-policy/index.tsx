import { SectionHeading } from '@/components/section-heading'
import { EMAIL, PHONE, ADDRESS } from '@/data/properties'
import { FileText, Mail, Sparkles, MapPin } from '@/components/icons'

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-night-900 pt-32 pb-24 text-neutral-300">
      <div className="container-page max-w-4xl">
        <SectionHeading
          dark
          category="LGPD e Privacidade"
          title="Política de Privacidade"
          description="Compromisso com a transparência, discrição e a segurança no tratamento dos seus dados pessoais."
        />

        <div className="mt-12 space-y-10 rounded-2xl border border-white/10 bg-night-800 p-6 sm:p-10 shadow-card">
          {/* Introdução */}
          <section className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-brand-400">
              <Sparkles className="h-5 w-5" />
              <h2 className="font-display text-lead font-light text-white">
                1. Introdução e Compromisso
              </h2>
            </div>
            <p className="text-body font-light leading-relaxed text-neutral-300">
              A <strong>Armangni Negócios Imobiliários</strong> reconhece a importância da privacidade e da proteção dos dados pessoais de seus clientes, parceiros e visitantes. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>.
            </p>
          </section>

          {/* Coleta de Dados */}
          <section className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-brand-400">
              <FileText className="h-5 w-5" />
              <h2 className="font-display text-lead font-light text-white">
                2. Coleta de Informações
              </h2>
            </div>
            <p className="text-body font-light leading-relaxed text-neutral-300">
              Coletamos informações pessoais que você nos fornece voluntariamente ao interagir com o nosso site, tais como ao preencher formulários de contato ou ao iniciar conversas através do nosso atendimento via WhatsApp.
            </p>
            <ul className="list-disc list-inside space-y-2 text-body font-light text-neutral-300 pl-2">
              <li><strong>Dados de Contato:</strong> Nome completo, endereço de e-mail e número de telefone/WhatsApp.</li>
              <li><strong>Preferências Imobiliárias:</strong> Tipo de imóvel de interesse, finalidade (compra ou locação), faixa de preço e localização desejada.</li>
            </ul>
          </section>

          {/* Uso dos Dados */}
          <section className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-brand-400">
              <FileText className="h-5 w-5" />
              <h2 className="font-display text-lead font-light text-white">
                3. Finalidade do Tratamento
              </h2>
            </div>
            <p className="text-body font-light leading-relaxed text-neutral-300">
              Os dados coletados são estritamente utilizados para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-body font-light text-neutral-300 pl-2">
              <li>Prestar atendimento personalizado e apresentar imóveis alinhados ao seu perfil;</li>
              <li>Agendar e coordenar visitas presenciais ou virtuais aos imóveis de interesse;</li>
              <li>Medir as visitas ao site e saber de qual página ou imóvel partiu o seu contato (por um cookie próprio, <code>_tl_sid</code>, e um código curto que acompanha a mensagem do WhatsApp), para melhorar o atendimento;</li>
              <li>Intermediar propostas de compra, venda ou locação de forma segura e discreta;</li>
              <li>Cumprir obrigações legais, contratuais e regulatórias vigentes no setor imobiliário.</li>
            </ul>
          </section>

          {/* Segurança */}
          <section className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-brand-400">
              <Sparkles className="h-5 w-5" />
              <h2 className="font-display text-lead font-light text-white">
                4. Segurança e Compartilhamento
              </h2>
            </div>
            <p className="text-body font-light leading-relaxed text-neutral-300">
              Adotamos medidas de segurança técnicas e administrativas rígidas para proteger seus dados contra acessos não autorizados, vazamentos, destruição ou alterações indesejadas.
            </p>
            <p className="text-body font-light leading-relaxed text-neutral-300">
              <strong>Não vendemos, alugamos nem repassamos seus dados pessoais a terceiros para fins comerciais ou publicitários.</strong> O compartilhamento só ocorrerá quando indispensável para a conclusão de uma transação imobiliária (por exemplo, com cartórios, correspondentes bancários ou autoridades competentes).
            </p>
          </section>

          {/* Direitos do Titular */}
          <section className="space-y-4 border-b border-white/10 pb-8">
            <h2 className="font-display text-lead font-light text-white">
              5. Seus Direitos (LGPD)
            </h2>
            <p className="text-body font-light leading-relaxed text-neutral-300">
              Como titular dos dados, você possui o direito de solicitar a qualquer momento:
            </p>
            <ul className="list-disc list-inside space-y-2 text-body font-light text-neutral-300 pl-2">
              <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>Revogação do consentimento concedido anteriormente.</li>
            </ul>
          </section>

          {/* Contato */}
          <section className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-brand-400">
              <Mail className="h-5 w-5" />
              <h2 className="font-display text-lead font-light text-white">
                6. Encarregado de Proteção de Dados (Contato)
              </h2>
            </div>
            <p className="text-body font-light leading-relaxed text-neutral-300">
              Para tirar dúvidas sobre esta política ou exercer seus direitos previstos pela LGPD, entre em contato com nossa equipe:
            </p>
            <div className="rounded-xl border border-white/10 bg-night-900 p-4 sm:p-6 space-y-2 text-body">
              <p className="text-white font-medium">Armangni Negócios Imobiliários</p>
              <p className="text-neutral-400">E-mail: <a href={`mailto:${EMAIL}`} className="text-brand-300 hover:underline">{EMAIL}</a></p>
              <p className="text-neutral-400">Telefone / WhatsApp: <span className="text-white">{PHONE}</span></p>
              <p className="text-neutral-400 flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-400" />
                <span className="text-white">{ADDRESS}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
