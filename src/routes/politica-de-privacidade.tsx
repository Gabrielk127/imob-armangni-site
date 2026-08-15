import { createFileRoute } from '@tanstack/react-router'
import { head } from '@/lib/seo'
import { PrivacyPolicy } from '@/features/privacy-policy'

export const Route = createFileRoute('/politica-de-privacidade')({
  head: () =>
    head({
      title: 'Política de privacidade',
      description:
        'Como a Armangni coleta, usa e protege os dados de quem visita o site.',
    }),
  component: PrivacyPolicy,
})
