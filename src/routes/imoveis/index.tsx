import { createFileRoute } from '@tanstack/react-router'
import { Listings } from '@/features/listings'

/** Filtros da busca, mantidos na URL com os mesmos nomes de sempre. */
export interface ListingsSearch {
  q?: string
  finalidade?: string
  tipo?: string
  bairro?: string
  minPreco?: string
  maxPreco?: string
  minArea?: string
  maxArea?: string
  quartos?: string
  suites?: string
  vagas?: string
  destaque?: string
}

const KEYS = [
  'q',
  'finalidade',
  'tipo',
  'bairro',
  'minPreco',
  'maxPreco',
  'minArea',
  'maxArea',
  'quartos',
  'suites',
  'vagas',
  'destaque',
] as const

export const Route = createFileRoute('/imoveis/')({
  // Só os filtros conhecidos sobrevivem — qualquer coisa a mais some da URL.
  validateSearch: (search: Record<string, unknown>): ListingsSearch =>
    Object.fromEntries(
      KEYS.filter((key) => search[key] !== undefined && search[key] !== '').map(
        (key) => [key, String(search[key])]
      )
    ),
  component: Listings,
})
