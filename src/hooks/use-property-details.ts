import { useQuery } from '@tanstack/react-query'
import { findPropertyByCode } from '@/api/properties.api'
import { propertyKeys } from '@/api/query-keys'

export function usePropertyDetails(code: string) {
  return useQuery({
    queryKey: propertyKeys.detail(code),
    queryFn: () => findPropertyByCode(code),
    enabled: !!code,
    // 404 é resposta legítima (imóvel fora do site) — não vale repetir
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}
