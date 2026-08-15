const env = (import.meta as unknown as { env: Record<string, string> }).env

const BASE_URL = (env.VITE_API_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  ''
)

const ORG_SLUG = env.VITE_API_ORG

export async function getJson<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }
  if (ORG_SLUG) query.set('org', ORG_SLUG)

  const url = `${BASE_URL}${path}${query.size ? `?${query}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Falha ao consultar ${path} (HTTP ${response.status})`)
  }

  return (await response.json()) as T
}
