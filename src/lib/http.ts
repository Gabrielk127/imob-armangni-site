const BASE_URL = (
  (import.meta as unknown as { env: Record<string, string> }).env
    .VITE_API_URL ?? 'http://localhost:3000'
).replace(/\/$/, '')

/**
 * Cliente das rotas públicas da API (`/public/*`), que não exigem token.
 * `fetch` puro de propósito: o site não precisa de interceptors nem de auth.
 */
export async function getJson<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }

  const url = `${BASE_URL}${path}${query.size ? `?${query}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Falha ao consultar ${path} (HTTP ${response.status})`)
  }

  return (await response.json()) as T
}
