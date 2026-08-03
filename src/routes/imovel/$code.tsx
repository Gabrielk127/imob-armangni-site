import { createFileRoute } from '@tanstack/react-router'
import { PropertyDetails } from '@/features/property-details'

export const Route = createFileRoute('/imovel/$code')({
  component: PropertyDetails,
})
