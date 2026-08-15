import { createFileRoute } from '@tanstack/react-router'
import { head } from '@/lib/seo'
import { Home } from '@/features/home'

export const Route = createFileRoute('/')({
  head: () => head({}),
  component: Home,
})
