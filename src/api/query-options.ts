import { queryOptions } from '@tanstack/react-query'
import {
  findAllProperties,
  findPropertyByCode,
  type PropertyQuery,
} from './properties.api'
import { propertyKeys } from './query-keys'

/**
 * Definições compartilhadas entre o `loader` da rota e o `useQuery` da tela.
 *
 * O preload do router só rende algo se preencher exatamente a mesma entrada de
 * cache que o componente vai ler — chave, função e `staleTime` iguais.
 * Declarar isso nos dois lugares convida ao desencontro: basta uma chave
 * divergir para o loader aquecer um cache que ninguém consulta, e o sintoma
 * (a tela continua abrindo em branco) não aponta para a causa.
 */

const STALE_TIME = 5 * 60 * 1000

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
  })
