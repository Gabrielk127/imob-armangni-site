/** Chaves do TanStack Query, no mesmo formato do painel. Nenhuma chave fica solta pelo código. */
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) =>
    [...propertyKeys.lists(), { filters }] as const,
  details: () => [...propertyKeys.all, 'details'] as const,
  detail: (code: string) => [...propertyKeys.details(), code] as const,
}

/** Opções dos filtros (tipos e bairros publicados). */
export const facetKeys = {
  all: ['facets'] as const,
  types: () => [...facetKeys.all, 'property-types'] as const,
  neighborhoods: () => [...facetKeys.all, 'neighborhoods'] as const,
}
