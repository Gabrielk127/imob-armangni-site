import { queryOptions } from '@tanstack/react-query'
import {
  findAllProperties,
  findPropertyByCode,
  type PropertyQuery,
} from './properties.api'
import { propertyKeys } from './query-keys'

const STALE_TIME = 5 * 60 * 1000

export const propertyDetailQuery = (code: string) =>
  queryOptions({
    queryKey: propertyKeys.detail(code),
    queryFn: () => findPropertyByCode(code),
    staleTime: STALE_TIME,
    retry: false,
  })

export const propertiesListQuery = (query: PropertyQuery = {}) =>
  queryOptions({
    queryKey: propertyKeys.list(query as Record<string, unknown>),
    queryFn: () => findAllProperties(query),
    staleTime: STALE_TIME,
    retry: 1,
  })
