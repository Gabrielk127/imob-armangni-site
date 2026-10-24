import { queryOptions, type QueryClient } from '@tanstack/react-query'
import type { Property } from '@/data/properties'
import {
  findAllProperties,
  findNeighborhoods,
  findPropertyByCode,
  findPropertyTypes,
  type PropertyQuery,
} from './properties.api'
import { facetKeys, propertyKeys } from './query-keys'

const STALE_TIME = 5 * 60 * 1000
const FACETS_STALE_TIME = 30 * 60 * 1000

export const propertyDetailQuery = (code: string) =>
  queryOptions({
    queryKey: propertyKeys.detail(code),
    queryFn: () => findPropertyByCode(code),
    staleTime: STALE_TIME,
    // 404 é resposta legítima (imóvel fora do site) — não vale repetir
    retry: false,
  })

export const propertiesListQuery = (query: PropertyQuery = {}) =>
  queryOptions({
    queryKey: propertyKeys.list(query as Record<string, unknown>),
    queryFn: () => findAllProperties(query),
    staleTime: STALE_TIME,
    retry: 1,
  })

export const propertyTypesQuery = () =>
  queryOptions({
    queryKey: facetKeys.types(),
    queryFn: findPropertyTypes,
    staleTime: FACETS_STALE_TIME,
  })

export const neighborhoodsQuery = () =>
  queryOptions({
    queryKey: facetKeys.neighborhoods(),
    queryFn: findNeighborhoods,
    staleTime: FACETS_STALE_TIME,
  })

/**
 * Procura o imóvel nas listagens já em cache. Serve de `placeholderData` no
 * detalhe: quem vem de um card vê na hora capa, título, preço e números,
 * enquanto a galeria completa e a descrição chegam da API.
 */
export function findListedProperty(queryClient: QueryClient, code: string): Property | undefined {
  const lists = queryClient.getQueriesData<{ data: Property[] }>({ queryKey: propertyKeys.lists() })
  for (const [, page] of lists) {
    const found = page?.data.find((item) => item.code === code)
    if (found) return found
  }
  return undefined
}
