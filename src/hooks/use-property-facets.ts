import { useQuery } from '@tanstack/react-query'
import { neighborhoodsQuery, propertyTypesQuery } from '@/api/query-options'

/**
 * Opções dos filtros vindas da carteira publicada — nada de lista fixa no
 * código, que ficaria desalinhada do que a imobiliária tem no ar.
 */
export function usePropertyTypes() {
  return useQuery(propertyTypesQuery())
}

export function useNeighborhoods() {
  return useQuery(neighborhoodsQuery())
}
