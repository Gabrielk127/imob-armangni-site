/** Chaves do TanStack Query, no mesmo formato do painel. */
export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters: string | Record<string, unknown>) =>
    [...propertyKeys.lists(), { filters }] as const,
  details: () => [...propertyKeys.all, 'details'] as const,
  detail: (code: string) => [...propertyKeys.details(), code] as const,
}
