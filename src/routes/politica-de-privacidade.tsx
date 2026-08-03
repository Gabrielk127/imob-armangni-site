import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicy } from '@/features/privacy-policy'

export const Route = createFileRoute('/politica-de-privacidade')({
  component: PrivacyPolicy,
})
