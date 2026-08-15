const SITE = 'Armangni Negócios Imobiliários'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'

const DEFAULT_DESCRIPTION =
  'Referência em imóveis de alto padrão para comprar, vender ou alugar em Londrina.'

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
