import { useQuery, useQueryClient } from '@tanstack/react-query'
import { findListedProperty, propertyDetailQuery } from '@/api/query-options'

export function usePropertyDetails(code: string) {
  const queryClient = useQueryClient()

  return useQuery({
    ...propertyDetailQuery(code),
    enabled: !!code,
    // Dados do card enquanto o detalhe completo carrega — ver `findListedProperty`.
    placeholderData: () => findListedProperty(queryClient, code),
  })
}
