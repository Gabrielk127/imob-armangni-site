import { useQuery } from '@tanstack/react-query'
import { findAllProperties, type PropertyQuery } from '@/api/properties.api'
import { propertyKeys } from '@/api/query-keys'

/** Listagem paginada e filtrada pela API pública. */
export function usePropertiesList(query: PropertyQuery = {}) {
  return useQuery({
    queryKey: propertyKeys.list(query as Record<string, unknown>),
    queryFn: () => findAllProperties(query),
    staleTime: 5 * 60 * 1000,
    // segura o resultado anterior enquanto o novo filtro carrega, para a
    // grade não piscar em branco a cada ajuste
    placeholderData: (previous) => previous,
  })
}
