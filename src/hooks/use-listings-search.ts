import { getRouteApi } from '@tanstack/react-router'

// Ligação direta com a rota da listagem: dá tipagem nos filtros e evita
// importar o arquivo de rota (que importaria a tela de volta).
const route = getRouteApi('/imoveis/')

/**
 * Filtros da listagem, guardados na URL pelo router.
 *
 * A tela continua enxergando `URLSearchParams`, formato que os componentes de
 * filtro já usam — quem valida e serializa é o TanStack Router.
 */
export function useListingsSearch(): [
  URLSearchParams,
  (next: URLSearchParams) => void,
] {
  const search = route.useSearch() as Record<string, string | undefined>
  const navigate = route.useNavigate()

  const params = new URLSearchParams(
    Object.entries(search)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [key, String(value)])
  )

  const setParams = (next: URLSearchParams) => {
    // `search` como função substitui o objeto inteiro; com objeto literal o
    // router faria merge e filtros removidos ficariam na URL.
    void navigate({
      to: '/imoveis',
      search: Object.fromEntries(next.entries()),
    })
  }

  return [params, setParams]
}
