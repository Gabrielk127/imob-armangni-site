/**
 * Gera um HTML por imóvel, com o `<head>` já preenchido.
 *
 * ## O problema
 *
 * O site é uma SPA: o servidor entrega sempre o mesmo `index.html`, e título,
 * descrição e `og:image` só passam a valer depois que o React monta. O Google
 * executa JavaScript e enxerga o resultado, mas os rastreadores de
 * compartilhamento — WhatsApp, Facebook, LinkedIn, Telegram — não executam.
 * Para eles, todo imóvel compartilhado tinha o mesmo título genérico e a mesma
 * foto de capa do site.
 *
 * ## A solução aqui
 *
 * Depois do `vite build`, este script busca os imóveis publicados na API e
 * escreve `dist/imovel/<codigo>/index.html`: uma cópia do `index.html` com as
 * meta tags daquele imóvel substituídas. O `<body>` continua vazio — quem
 * desenha a página é a SPA de sempre, com os mesmos assets e o mesmo cache.
 *
 * É pré-renderização de `<head>`, não da página inteira. Resolve exatamente o
 * que estava quebrado (o card de compartilhamento) sem migrar o app para SSR,
 * sem adicionar dependência e sem mudar nada em tempo de execução.
 *
 * ## O que isso exige do host
 *
 * Que um arquivo existente tenha prioridade sobre o fallback da SPA — o
 * comportamento padrão de Vercel, Netlify e do `try_files` do nginx. Se o host
 * reescrever *tudo* para `/index.html`, estes arquivos são ignorados e nada
 * quebra; apenas não há ganho. (O `vite preview` é um desses: serve o arquivo
 * em `/imovel/AP0001/`, com barra, mas não em `/imovel/AP0001`.)
 *
 * ## Validade
 *
 * O conteúdo é um retrato do momento do build. Um imóvel cadastrado depois só
 * ganha o seu HTML no build seguinte — vale disparar um rebuild quando o
 * portfólio mudar. Enquanto isso ele cai no `index.html` genérico, que é
 * exatamente o comportamento de hoje.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

const API = (process.env.VITE_API_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  ''
)
const ORG = process.env.VITE_API_ORG
const SITE = 'Armangni Negócios Imobiliários'

/**
 * Domínio público do site, para montar as URLs absolutas que os rastreadores
 * de compartilhamento exigem — `og:url` e `og:image` relativos são ignorados.
 * Sem ele, as duas tags simplesmente não são emitidas.
 */
const SITE_URL = (process.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

/** Escapa o que vai para dentro de um atributo HTML. */
const attr = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const url = (path, params = {}) => {
  const query = new URLSearchParams(params)
  if (ORG) query.set('org', ORG)
  const suffix = query.size ? `?${query}` : ''
  return `${API}${path}${suffix}`
}

async function getJson(path, params) {
  const response = await fetch(url(path, params))
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} em ${path}`)
  }
  return response.json()
}

/** Todos os imóveis publicados, paginando até o fim. */
async function fetchAllProperties() {
  const all = []
  let page = 1
  let totalPages = 1

  do {
    const { data, meta } = await getJson('/public/properties', {
      page,
      limit: 100,
    })
    all.push(...data)
    totalPages = meta?.totalPages ?? 1
    page += 1
  } while (page <= totalPages)

  return all
}

/**
 * Detalhe do imóvel, para ter a foto no tamanho de compartilhamento.
 *
 * A listagem devolve `coverImage` já na largura de card (400px) — boa para a
 * vitrine e pequena demais para o card do WhatsApp, que exibe algo perto de
 * 1200px. O detalhe traz `images[].url` na largura de galeria.
 */
async function fetchDetail(code) {
  try {
    return await getJson(`/public/properties/${encodeURIComponent(code)}`)
  } catch {
    return null
  }
}

/** Primeiro parágrafo da descrição, ou uma frase montada com o que há. */
function describe(property) {
  const first = (property.description ?? '').split(/\n\s*\n/)[0]?.trim()
  if (first) return first

  const local = [property.address?.neighborhood, property.address?.city]
    .filter(Boolean)
    .join(', ')

  return [property.title, local && `em ${local}`].filter(Boolean).join(' ')
}

/**
 * Troca as meta tags do template pelo conteúdo do imóvel.
 *
 * O `index.html` do build não traz `description`/`og:title`/`og:description`
 * (elas são declaradas por rota, em `lib/seo.ts`), então aqui elas são
 * inseridas logo após o `<title>`, que é o único que já existe e precisa ser
 * substituído.
 */
function renderHead(template, property, detail) {
  const name = property.title || `Imóvel ${property.code}`
  const title = `${name} — ${property.code} · ${SITE}`
  const description = describe(detail ?? property)
  const image = detail?.images?.[0]?.url ?? property.coverImage

  const tags = [
    `<meta name="description" content="${attr(description)}" />`,
    `<meta property="og:title" content="${attr(title)}" />`,
    `<meta property="og:description" content="${attr(description)}" />`,
    image ? `<meta property="og:image" content="${attr(image)}" />` : '',
    SITE_URL
      ? `<meta property="og:url" content="${attr(`${SITE_URL}/imovel/${property.code}`)}" />`
      : '',
    SITE_URL
      ? `<link rel="canonical" href="${attr(`${SITE_URL}/imovel/${property.code}`)}" />`
      : '',
  ].filter(Boolean)

  return template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${attr(title)}</title>\n    ${tags.join('\n    ')}`
  )
}

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf8')

  let properties
  try {
    properties = await fetchAllProperties()
  } catch (error) {
    // Não derruba o build: sem a API o site continua funcionando como antes,
    // com o head genérico. Falhar aqui só trocaria uma limitação conhecida por
    // um deploy bloqueado.
    console.warn(
      `[prerender] API indisponível (${error.message}). ` +
        'Seguindo sem os HTMLs por imóvel.'
    )
    return
  }

  await Promise.all(
    properties.map(async (property) => {
      const detail = await fetchDetail(property.code)
      const html = renderHead(template, property, detail)

      // Duas formas do mesmo arquivo, porque os hosts resolvem a URL sem
      // extensão de jeitos diferentes: uns procuram `<rota>/index.html`
      // (nginx `try_files $uri/`), outros `<rota>.html` (Netlify, S3). Escrever
      // as duas custa alguns KB e tira a pré-renderização da dependência de
      // como o host está configurado.
      const dir = join(DIST, 'imovel', property.code)
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, 'index.html'), html)
      await writeFile(join(DIST, 'imovel', `${property.code}.html`), html)
    })
  )

  if (!SITE_URL) {
    console.warn(
      '[prerender] VITE_SITE_URL não definida: `og:url` e `canonical` ' +
        'ficaram de fora (rastreadores ignoram URL relativa).'
    )
  }

  console.log(`[prerender] ${properties.length} imóveis gerados em dist/imovel/`)
}

await main()
