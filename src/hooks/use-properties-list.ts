import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PropertyQuery } from '@/api/properties.api'
import { propertiesListQuery } from '@/api/query-options'

export function usePropertiesList(query: PropertyQuery = {}) {
  return useQuery({
    ...propertiesListQuery(query),
    placeholderData: keepPreviousData,
  })
}
