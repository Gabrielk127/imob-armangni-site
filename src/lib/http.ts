const env = (import.meta as unknown as { env: Record<string, string> }).env

const BASE_URL = (env.VITE_API_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  ''
)

/**
 * Slug da imobiliária, só para desenvolvimento.
 *
 * Em produção a API descobre a organização pelo domínio de origem da
 * requisição, e nada precisa ser informado. Em `localhost` não há domínio
 * cadastrado — a API responde `TENANT_NOT_RESOLVED` e o site inteiro fica
 * vazio. O parâmetro `?org=` é a saída que a própria API oferece para esse
 * caso; defina `VITE_API_ORG` no `.env` local para usá-la.
 */
const ORG_SLUG = env.VITE_API_ORG

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
  if (ORG_SLUG) query.set('org', ORG_SLUG)

  const url = `${BASE_URL}${path}${query.size ? `?${query}` : ''}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Falha ao consultar ${path} (HTTP ${response.status})`)
  }

  return (await response.json()) as T
}
