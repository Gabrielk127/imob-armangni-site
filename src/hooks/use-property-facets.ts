import { useQuery } from '@tanstack/react-query'
import { findNeighborhoods, findPropertyTypes } from '@/api/properties.api'

/**
 * Opções dos filtros vindas da carteira publicada — nada de lista fixa no
 * código, que ficaria desalinhada do que a imobiliária tem no ar.
 */
export function usePropertyTypes() {
  return useQuery({
    queryKey: ['property-types'],
    queryFn: findPropertyTypes,
    staleTime: 30 * 60 * 1000,
  })
}

export function useNeighborhoods() {
  return useQuery({
    queryKey: ['neighborhoods'],
    queryFn: findNeighborhoods,
    staleTime: 30 * 60 * 1000,
  })
}
