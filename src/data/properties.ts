export type Purpose = 'venda' | 'aluguel'

export type PropertyType =
  | 'Apartamento'
  | 'Cobertura'
  | 'Casa em Condomínio'
  | 'Sobrado'
  | 'Terreno'
  | 'Studio'

export interface Property {
  code: string
  title: string
  subtitle: string
  description: string[]
  purpose: Purpose
  type: PropertyType
  neighborhood: string
  city: string
  address: string
  price: number | null
  condoFee?: number
  area: number
  bedrooms?: number
  suites?: number
  parking?: number
  images: string[]
  /**
   * Mesmas fotos de `images`, na largura de miniatura servida pela API.
   * Ausente nos dados de exemplo — quem consome cai de volta em `images`.
   */
  thumbnails?: string[]
  featured?: boolean
  videoUrl?: string
  features: string[]
  condoFeatures?: string[]
}

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

/** Larguras servidas no `srcset` — cobrem de celular a desktop 2x. */
const SRCSET_WIDTHS = [640, 960, 1400, 1920, 2560] as const

/**
 * `srcset` para as fotos de vitrine.
 *
 * O `src` sozinho entrega a mesma imagem para todo mundo: o hero pedia 2100px
 * de largura, e um celular baixava 250 kB onde 49 kB dariam o mesmo resultado
 * na tela. Como é o maior elemento da primeira dobra, esse peso caía direto no
 * LCP. Com o `srcset` o navegador escolhe a largura pelo viewport e pelo DPR.
 */
export const imgSrcSet = (id: string) =>
  SRCSET_WIDTHS.map((w) => `${img(id, w)} ${w}w`).join(', ')

/** Ids das fotos, para montar `srcset` além do `src` pronto em IMAGES. */
export const IMAGE_IDS = {
  heroNight: 'photo-1613490493576-7fde63acd811',
  heroLiving: 'photo-1618221195710-dd6b41faaea6',
  heroPool: 'photo-1600596542815-ffad4c1539a9',
} as const

export const IMAGES = {
  heroNight: img('photo-1613490493576-7fde63acd811', 2100),
  heroLiving: img('photo-1618221195710-dd6b41faaea6', 2100),
  heroPool: img('photo-1600596542815-ffad4c1539a9', 2100),
  broker: img('photo-1560250097-0b93528c311a', 1000),
  terrace: img('photo-1600585154526-990dced4db0d', 1200),
  condoHouse: img('photo-1600585154340-be6161a56a0c', 1200),
  sobrado: img('photo-1564013799919-ab600027ffc6', 1200),
  apartment: img('photo-1560448204-e02f11c3d0e2', 1200),
  cityA: img('photo-1449824913935-59a10b8d2000', 1200),
  cityB: img('photo-1486406146926-c627a92ad1ab', 1200),
  cityC: img('photo-1444723121867-7a241cacace9', 1200),
  cityD: img('photo-1477959858617-67f85cf4f1df', 1200),
}

export const properties: Property[] = [
  {
    code: '74021',
    title: 'Cobertura',
    subtitle: 'Cobertura duplex com 4 suítes na Gleba Palhano',
    description: [
      'Cobertura duplex com arquitetura assinada e acabamentos importados, localizada em um dos endereços mais valorizados da Gleba Palhano.',
      'O pavimento social integra living com pé-direito duplo, sala de jantar e varanda gourmet com vista panorâmica da cidade. No pavimento superior, terraço com piscina privativa aquecida e spa.',
      'São 4 suítes amplas, com destaque para a suíte master com closet duplo e banho com banheira de imersão.',
    ],
    purpose: 'venda',
    type: 'Cobertura',
    neighborhood: 'Gleba Palhano',
    city: 'Londrina',
    address: 'Avenida Winston Churchill — Gleba Palhano',
    price: 9450000,
    condoFee: 4200,
    area: 380,
    bedrooms: 4,
    suites: 4,
    parking: 5,
    images: [
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1600607687939-ce8a6c25118c'),
      img('photo-1618221195710-dd6b41faaea6'),
    ],
    featured: true,
    features: [
      'Suíte master com closet',
      'Living com pé-direito duplo',
      'Piscina privativa aquecida',
      'Varanda gourmet',
      'Lareira',
      'Home theater',
      'Escritório',
      'Lavabo',
      'Piso aquecido',
      'Elevador privativo',
    ],
    condoFeatures: ['Portaria 24h', 'Academia', 'Salão de festas', 'Segurança perimetral'],
  },
  {
    code: '74088',
    title: 'Cobertura',
    subtitle: 'Cobertura duplex com 4 suítes e piscina no Jardim Higienópolis',
    description: [
      'Cobertura duplex com 448 m² privativos e vista definitiva para o horizonte de Londrina, no Jardim Higienópolis.',
      'Espaços sociais totalmente integrados ao terraço com piscina aquecida, espaço gourmet e deck de madeira.',
      'Projeto luminotécnico e automação completa, com 4 suítes e 5 vagas de garagem.',
    ],
    purpose: 'venda',
    type: 'Cobertura',
    neighborhood: 'Jardim Higienópolis',
    city: 'Londrina',
    address: 'Avenida Higienópolis — Jardim Higienópolis',
    price: 12255749,
    condoFee: 4800,
    area: 448,
    bedrooms: 4,
    suites: 4,
    parking: 5,
    images: [
      img('photo-1600596542815-ffad4c1539a9'),
      img('photo-1512918728675-ed5a9ecdebfd'),
      img('photo-1600210492486-724fe5c67fb0'),
    ],
    featured: true,
    features: [
      'Piscina privativa aquecida',
      'Espaço gourmet',
      'Automação completa',
      'Suíte master com banheira',
      'Adega climatizada',
      'Lareira a gás',
      'Churrasqueira',
      'Despensa',
    ],
    condoFeatures: ['Portaria 24h', 'Quadra de tênis', 'Piscina coberta', 'Playground'],
  },
  {
    code: '75102',
    title: 'Apartamento',
    subtitle: 'Apartamento de alto padrão com 4 suítes no Jardim Piza',
    description: [
      'Residência suspensa de 520 m² privativos com acabamentos de altíssimo padrão, localizada no coração do Jardim Piza.',
      'Living de 120 m² com vista em 360°, 4 suítes plenas, spa privativo com sauna e 6 vagas de garagem com depósito.',
      'Entregue com acabamentos de altíssimo padrão e projeto de interiores assinado.',
    ],
    purpose: 'venda',
    type: 'Apartamento',
    neighborhood: 'Jardim Piza',
    city: 'Londrina',
    address: 'Rua Professor João Cândido — Jardim Piza',
    price: 15800000,
    condoFee: 5500,
    area: 520,
    bedrooms: 4,
    suites: 4,
    parking: 6,
    images: [
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1600566753190-17f0baa2a6c3'),
      img('photo-1600210492486-724fe5c67fb0'),
    ],
    featured: true,
    features: [
      'Living 360°',
      'Spa privativo com sauna',
      '6 vagas de garagem',
      'Depósito privativo',
      'Projeto de interiores assinado',
      'Varanda gourmet',
      'Adega climatizada',
    ],
    condoFeatures: ['Portaria 24h', 'Piscina aquecida', 'Academia completa', 'Heliponto homologado'],
  },
  {
    code: '76200',
    title: 'Casa em Condomínio',
    subtitle: 'Mansão contemporânea com 5 suítes na Terras de Santa Cristina',
    description: [
      'Mansão neoclássica de 720 m² construídos em terreno de 1.800 m², na Terras de Santa Cristina em Londrina.',
      'Salões sociais com pé-direito monumental, biblioteca, adega e cinema privativo. Área de lazer completa com piscina externa e coberta.',
      'Condomínio de altíssimo padrão a 20 minutos do centro de Londrina, com segurança 24h e infraestrutura completa.',
    ],
    purpose: 'venda',
    type: 'Casa em Condomínio',
    neighborhood: 'Terras de Santa Cristina',
    city: 'Londrina',
    address: 'Alameda dos Ipês — Terras de Santa Cristina, Londrina',
    price: 18900000,
    condoFee: 3200,
    area: 720,
    bedrooms: 5,
    suites: 5,
    parking: 8,
    images: [
      img('photo-1600596542815-ffad4c1539a9'),
      img('photo-1600607687920-4e2a09cf159d'),
      img('photo-1600566753086-35f133c65dae'),
    ],
    featured: true,
    features: [
      'Terreno de 1.800 m²',
      'Piscina externa e coberta',
      'Cinema privativo',
      'Adega para 1.000 garrafas',
      'Biblioteca',
      'Quadra poliesportiva privativa',
      'Gerador próprio',
    ],
    condoFeatures: [
      'Portaria 24h com controle biométrico',
      'Lago privativo',
      'Quadra de tênis',
      'Heliponto',
    ],
  },
  {
    code: '77110',
    title: 'Apartamento',
    subtitle: 'Apartamento neoclássico mobiliado com 4 suítes na Gleba Palhano',
    description: [
      'Apartamento de 340 m² na Gleba Palhano, totalmente decorado e equipado por renomado escritório de arquitetura.',
      'Living integrado à varanda fechada em vidro, cozinha gourmet e 4 suítes com automação de iluminação e som.',
      'Pronto para morar: basta trazer as malas.',
    ],
    purpose: 'venda',
    type: 'Apartamento',
    neighborhood: 'Gleba Palhano',
    city: 'Londrina',
    address: 'Avenida Ayrton Senna — Gleba Palhano',
    price: 6850000,
    condoFee: 2800,
    area: 340,
    bedrooms: 4,
    suites: 4,
    parking: 4,
    images: [
      img('photo-1567496898669-ee935f5f647a'),
      img('photo-1600585154526-990dced4db0d'),
      img('photo-1512918728675-ed5a9ecdebfd'),
    ],
    features: [
      'Totalmente decorado e equipado',
      'Varanda fechada em vidro',
      'Cozinha gourmet',
      'Automação de iluminação e som',
      'Ar-condicionado central',
      'Lavabo',
    ],
    condoFeatures: ['Portaria 24h', 'Piscina aquecida', 'Academia', 'Espaço gourmet'],
  },
  {
    code: '77305',
    title: 'Terreno',
    subtitle: 'Terreno exclusivo de 990 m² na Alphaville Londrina',
    description: [
      'Terreno de 990 m² em localização privilegiada na Alphaville Londrina, com potencial construtivo para empreendimento residencial de alto padrão.',
      'Zoneamento favorável, testada ampla e entorno consolidado pelos endereços mais valorizados de Londrina.',
    ],
    purpose: 'venda',
    type: 'Terreno',
    neighborhood: 'Alphaville Londrina',
    city: 'Londrina',
    address: 'Avenida Madre Leônia Milito — Alphaville Londrina',
    price: 4200000,
    area: 990,
    images: [
      img('photo-1500382017468-9049fed747ef'),
      img('photo-1449824913935-59a10b8d2000'),
    ],
    features: [
      '990 m² privativos',
      'Testada ampla',
      'Zoneamento favorável',
      'Estudo de viabilidade pronto',
    ],
    condoFeatures: ['Portaria 24h', 'Segurança perimetral'],
  },
  {
    code: '77390',
    title: 'Apartamento',
    subtitle: 'Apartamento garden com 5 suítes e piscina privativa no Jardim Higienópolis',
    description: [
      'Apartamento garden com 849 m² privativos e jardim de 300 m², uma verdadeira casa com os serviços de um condomínio de luxo.',
      'São 5 suítes, piscina privativa com raia de 15 metros e espaço gourmet integrado ao jardim.',
    ],
    purpose: 'venda',
    type: 'Apartamento',
    neighborhood: 'Jardim Higienópolis',
    city: 'Londrina',
    address: 'Rua Belo Horizonte — Jardim Higienópolis',
    price: 21500000,
    condoFee: 6200,
    area: 849,
    bedrooms: 5,
    suites: 5,
    parking: 7,
    images: [
      img('photo-1600607687939-ce8a6c25118c'),
      img('photo-1600566753190-17f0baa2a6c3'),
      img('photo-1600585154340-be6161a56a0c'),
    ],
    features: [
      'Jardim privativo de 300 m²',
      'Piscina privativa com raia',
      '5 suítes plenas',
      '7 vagas de garagem',
      'Espaço gourmet integrado',
      'Adega walk-in',
      'Piso aquecido',
    ],
    condoFeatures: ['Portaria 24h', 'Piscina aquecida', 'Quadra de tênis', 'Spa completo'],
  },
  {
    code: '77400',
    title: 'Casa em Condomínio',
    subtitle: 'Residência contemporânea com 5 suítes na Alphaville Londrina',
    description: [
      'Casa em condomínio fechado com 780 m² construídos em terreno de 1.200 m² na Alphaville Londrina.',
      'São 5 suítes grandes e confortáveis, salas que atendem a todas as necessidades da família, escritório, 6 vagas cobertas, espaço fitness, ofurô, sauna e sala de massagem.',
      'Piso aquecido, elevador, esquadrias alemãs, aquecimento a gás e solar, sistema de alarme, venezianas e persianas automatizadas e revestimentos em mármore por toda a casa.',
    ],
    purpose: 'venda',
    type: 'Casa em Condomínio',
    neighborhood: 'Alphaville Londrina',
    city: 'Londrina',
    address: 'Alameda das Magnólias — Alphaville Londrina',
    price: 14900000,
    condoFee: 2900,
    area: 780,
    bedrooms: 5,
    suites: 5,
    parking: 6,
    images: [
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1600607687920-4e2a09cf159d'),
      img('photo-1600566753086-35f133c65dae'),
    ],
    features: [
      '5 suítes plenas',
      'Terreno de 1.200 m²',
      'Ofurô, sauna e sala de massagem',
      'Espaço fitness privativo',
      'Elevador',
      'Esquadrias alemãs',
      'Piso aquecido e revestimentos em mármore',
      '6 vagas cobertas',
    ],
    condoFeatures: [
      'Portaria 24h com controle biométrico',
      'Quadra de tênis',
      'Piscina aquecida',
      'Playground',
    ],
  },
  {
    code: '77450',
    title: 'Casa em Condomínio',
    subtitle: 'Residência contemporânea com 5 suítes na Country Club Londrina',
    description: [
      'Residência contemporânea de 887 m² com projeto arquitetônico premiado, no condomínio mais desejado do Country Club Londrina.',
      'Vãos livres, vidros do piso ao teto e integração total entre os ambientes internos e o jardim com piscina em borda infinita.',
    ],
    purpose: 'venda',
    type: 'Casa em Condomínio',
    neighborhood: 'Country Club Londrina',
    city: 'Londrina',
    address: 'Alameda dos Eucaliptos — Country Club Londrina',
    price: 19800000,
    condoFee: 3500,
    area: 887,
    bedrooms: 5,
    suites: 5,
    parking: 8,
    images: [
      img('photo-1600596542815-ffad4c1539a9'),
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1600607687920-4e2a09cf159d'),
    ],
    features: [
      'Projeto arquitetônico premiado',
      'Piscina em borda infinita',
      'Vãos livres com vidros piso-teto',
      '5 suítes master com closet',
      '8 vagas de garagem',
      'Automação Lutron',
    ],
    condoFeatures: ['Portaria 24h', 'Campo de golfe', 'Hípica', 'Clube privativo'],
  },
  {
    code: '77490',
    title: 'Sobrado',
    subtitle: 'Sobrado moderno com 4 dormitórios na Vila Ipiranga',
    description: [
      'Sobrado em condomínio fechado com 412 m², arquitetura moderna e terraço com churrasqueira e vista aberta.',
      'São 4 dormitórios, sendo 3 suítes, living com lareira e jardim de inverno.',
    ],
    purpose: 'venda',
    type: 'Sobrado',
    neighborhood: 'Vila Ipiranga',
    city: 'Londrina',
    address: 'Rua Espírito Santo — Vila Ipiranga',
    price: 3950000,
    condoFee: 1400,
    area: 412,
    bedrooms: 4,
    suites: 3,
    parking: 4,
    images: [
      img('photo-1564013799919-ab600027ffc6'),
      img('photo-1600585154526-990dced4db0d'),
      img('photo-1512918728675-ed5a9ecdebfd'),
    ],
    features: [
      'Terraço com churrasqueira',
      'Living com lareira',
      'Jardim de inverno',
      '4 vagas cobertas',
      'Lavabo',
    ],
    condoFeatures: ['Portaria 24h', 'Salão de festas', 'Playground'],
  },
  {
    code: '77520',
    title: 'Casa em Condomínio',
    subtitle: 'Casa mobiliada com 5 suítes na Alphaville Londrina',
    description: [
      'Casa mobiliada com 496 m² em condomínio fechado na Alphaville Londrina, pronta para morar.',
      'Área social integrada ao jardim, espaço gourmet com churrasqueira e piscina aquecida.',
    ],
    purpose: 'aluguel',
    type: 'Casa em Condomínio',
    neighborhood: 'Alphaville Londrina',
    city: 'Londrina',
    address: 'Alameda dos Flamboyants — Alphaville Londrina',
    price: 35000,
    condoFee: 1800,
    area: 496,
    bedrooms: 5,
    suites: 5,
    parking: 4,
    images: [
      img('photo-1600596542815-ffad4c1539a9'),
      img('photo-1600210492486-724fe5c67fb0'),
      img('photo-1522708323590-d24dbb6b0267'),
    ],
    featured: true,
    features: ['Mobiliada', 'Piscina aquecida', 'Espaço gourmet', 'Escritório', 'Lavabo'],
    condoFeatures: ['Portaria 24h', 'Quadra de esportes', 'Playground'],
  },
  {
    code: '78455',
    title: 'Apartamento',
    subtitle: 'Apartamento mobiliado de alto padrão na Gleba Palhano',
    description: [
      'Apartamento de 292 m² totalmente mobiliado, com 3 suítes e vista permanente para o Lago Igapó.',
      'Condomínio com lazer completo e serviços pay-per-use.',
    ],
    purpose: 'aluguel',
    type: 'Apartamento',
    neighborhood: 'Gleba Palhano',
    city: 'Londrina',
    address: 'Avenida Winston Churchill — Gleba Palhano',
    price: 28000,
    condoFee: 2900,
    area: 292,
    bedrooms: 3,
    suites: 3,
    parking: 3,
    images: [
      img('photo-1502672260266-1c1ef2d93688'),
      img('photo-1512918728675-ed5a9ecdebfd'),
      img('photo-1600210492486-724fe5c67fb0'),
    ],
    featured: true,
    features: ['Mobiliado', 'Vista para o Lago Igapó', 'Varanda gourmet', 'Lavabo', 'Depósito'],
    condoFeatures: ['Piscina aquecida', 'Academia', 'Spa', 'Portaria 24h'],
  },
  {
    code: '78012',
    title: 'Cobertura',
    subtitle: 'Cobertura com terraço gourmet na Vila Ipiranga',
    description: [
      'Cobertura de 245 m² com terraço gourmet, churrasqueira e vista panorâmica da Vila Ipiranga.',
      'São 3 dormitórios, sendo 2 suítes, em condomínio com lazer completo.',
    ],
    purpose: 'aluguel',
    type: 'Cobertura',
    neighborhood: 'Vila Ipiranga',
    city: 'Londrina',
    address: 'Rua Paranaguá — Vila Ipiranga',
    price: 18500,
    condoFee: 1600,
    area: 245,
    bedrooms: 3,
    suites: 2,
    parking: 3,
    images: [
      img('photo-1600585154526-990dced4db0d'),
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1600210492486-724fe5c67fb0'),
    ],
    features: ['Terraço gourmet', 'Churrasqueira', 'Vista panorâmica', 'Semimobiliada'],
    condoFeatures: ['Piscina', 'Academia', 'Salão de festas', 'Portaria 24h'],
  },
  {
    code: '78901',
    title: 'Studio',
    subtitle: 'Studio de luxo mobiliado no Jardim Higienópolis',
    description: [
      'Studio de 98 m² com decoração assinada e vista para a Praça Rocha Pombo, no coração do Jardim Higienópolis.',
      'Condomínio com rooftop, piscina com borda infinita e serviços de hotelaria.',
    ],
    purpose: 'aluguel',
    type: 'Studio',
    neighborhood: 'Jardim Higienópolis',
    city: 'Londrina',
    address: 'Avenida Higienópolis — Jardim Higienópolis',
    price: 9800,
    condoFee: 1100,
    area: 98,
    bedrooms: 1,
    suites: 1,
    parking: 2,
    images: [
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1502672260266-1c1ef2d93688'),
    ],
    features: ['Mobiliado e decorado', 'Vista para a Praça Rocha Pombo', 'Serviços de hotelaria'],
    condoFeatures: ['Rooftop', 'Piscina borda infinita', 'Academia', 'Coworking'],
  },
]

export const neighborhoods = [
  { name: 'Gleba Palhano', image: IMAGES.cityB },
  { name: 'Jardim Higienópolis', image: IMAGES.cityA },
  { name: 'Jardim Piza', image: IMAGES.cityC },
  { name: 'Alphaville Londrina', image: IMAGES.cityD },
]

export const categories: { label: string; type: PropertyType; image: string }[] = [
  { label: 'Coberturas', type: 'Cobertura', image: IMAGES.terrace },
  { label: 'Casas em Condomínio', type: 'Casa em Condomínio', image: IMAGES.condoHouse },
  { label: 'Sobrados', type: 'Sobrado', image: IMAGES.sobrado },
  { label: 'Apartamentos', type: 'Apartamento', image: IMAGES.apartment },
]

export const testimonials = [
  {
    quote:
      'Uma das melhores experiências que já tive na compra de um imóvel. Corretores extremamente profissionais, que entendem de verdade o mercado de alto padrão. Fui acompanhado do início ao fim com total transparência.',
    author: 'Fernanda Savi',
    role: 'Compradora · Gleba Palhano',
  },
  {
    quote:
      'Confiei a venda da minha casa à equipe e o resultado superou as expectativas. Fotos impecáveis, divulgação estratégica e uma negociação conduzida com maestria e discrição.',
    author: 'Ricardo Almeida',
    role: 'Vendedor · Jardim Piza',
  },
  {
    quote:
      'Atendimento gentil, seguro e tranquilo, tanto na compra quanto na venda. Se você tem um imóvel de médio a alto padrão, procure um profissional desta imobiliária. Recomendo!',
    author: 'Marina Costa',
    role: 'Cliente · Jardim Higienópolis',
  },
]

export const WHATSAPP = '5543991708520'
export const PHONE = '(43) 99170-8520'
export const EMAIL = 'contato.armangni@gmail.com'
export const ADDRESS = 'Avenida Adhemar Pereira de Barros, 630 · Bela Suiça, Londrina - PR'
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/armangni.imoveis/',
  facebook: 'https://www.facebook.com/imoveisarmangni/?locale=pt_BR',
  youtube: 'https://www.youtube.com/channel/UC9wtZuavR6-xkmxBVvbyr1g',
  linkedin: 'https://www.linkedin.com/company/armangni-neg%C3%B3cios-imobili%C3%A1rios/',
} as const

export const ANUNCIAR_WHATSAPP_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  'Olá! Gostaria de anunciar meu imóvel com a Armangni Negócios Imobiliários.'
)}`
