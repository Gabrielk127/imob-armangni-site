import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { propertyDetailQuery } from '@/api/query-options'

/**
 * Pré-carrega o detalhe de um imóvel. Ligado ao hover (desktop) e ao toque /
 * foco (celular e teclado) dos cards, para a página abrir já com os dados.
 * `prefetchQuery` respeita o `staleTime`: repetir o gesto não refaz a busca.
 */
export function usePrefetchProperty() {
  const queryClient = useQueryClient()
  return useCallback(
    (code: string) => {
      void queryClient.prefetchQuery(propertyDetailQuery(code))
    },
    [queryClient]
  )
}
