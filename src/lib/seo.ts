const SITE = 'Armangni Negócios Imobiliários'

/**
 * Imagem de compartilhamento padrão. Fica aqui e não no `index.html` pelo mesmo
 * motivo do título: declarada nos dois lugares, a tag aparecia duplicada e o
 * rastreador lê a primeira — a estática venceria a da rota sempre.
 */
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'

/** Descrição usada quando a rota não tem uma própria. */
const DEFAULT_DESCRIPTION =
  'Referência em imóveis de alto padrão para comprar, vender ou alugar em Londrina.'

/**
 * Monta o `head` de uma rota no formato que o TanStack Router espera.
 *
 * Todas as telas herdavam o mesmo `<title>` do `index.html`: a home, a
 * listagem e cada página de imóvel apareciam com o mesmo texto na aba, nos
 * resultados de busca e no card de compartilhamento. Para um site que vive de
 * busca orgânica, título e descrição por rota são o mínimo.
 *
 * O `title` já vem com o sufixo da marca — quem chama passa só a parte
 * específica.
 */
export function head({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
}: {
  title?: string
  description?: string
  image?: string
}) {
  const fullTitle = title ? `${title} · ${SITE}` : `${SITE} · Alto padrão em Londrina`

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
    ],
  }
}
