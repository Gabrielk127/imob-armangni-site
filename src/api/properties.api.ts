import { getJson } from '@/lib/http'
import type { Property, Purpose } from '@/data/properties'

/** Formato devolvido por `/public/properties`. */
interface PublicAddress {
  precision?: 'EXACT' | 'APPROXIMATE'
  street?: string
  number?: string
  complement?: string | null
  neighborhood?: string
  city?: string
  state?: string
  postalCode?: string
  latitude?: number | null
  longitude?: number | null
}

interface PublicUnit {
  id: string
  salePrice: number | null
  rentPrice: number | null
  builtArea: number | null
  totalArea: number | null
  bedrooms: number | null
  suites: number | null
  bathrooms: number | null
  parkingSpaces: number | null
  images?: { url: string; thumbnailUrl?: string }[]
  features?: { name: string; value: string; group: string }[]
}

interface PublicPropertyListItem {
  id: string
  code: string
  title: string
  description: string | null
  videoUrl?: string | null
  purpose: 'SALE' | 'RENT' | 'SALE_AND_RENT'
  isFeatured: boolean
  type: { id: string; name: string } | null
  condominium: { id: string; name: string } | null
  address: PublicAddress | null
  coverImage: string | null
  units: PublicUnit[]
}

interface PublicCondominium {
  id: string
  name: string
  description: string | null
  address: PublicAddress | null
  images: { url: string; thumbnailUrl?: string }[]
  amenities: { name: string; value: string; group: string }[]
}

interface PublicPropertyDetail
  extends Omit<PublicPropertyListItem, 'coverImage' | 'condominium'> {
  images: { url: string; thumbnailUrl?: string }[]
  condominium: PublicCondominium | null
}

export interface PublicListMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

/** Filtros aceitos por `/public/properties`. */
export interface PropertyQuery {
  page?: number
  limit?: number
  search?: string
  purpose?: 'SALE' | 'RENT' | 'SALE_AND_RENT'
  typeId?: string
  neighborhood?: string
  city?: string
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
  minBedrooms?: number
  minSuites?: number
  minParkingSpaces?: number
  isFeatured?: boolean
  sortBy?: 'price' | 'area' | 'title' | 'createdAt' | 'relevance'
  sortOrder?: 'asc' | 'desc'
}

// ── Tradução para o modelo que as telas já usam ──

/**
 * O site trabalha com uma finalidade só; um imóvel de venda e locação aparece
 * como venda. Os filtros continuam pegando os dois lados porque quem filtra é
 * a API.
 */
function toPurpose(purpose: PublicPropertyListItem['purpose']): Purpose {
  return purpose === 'RENT' ? 'aluguel' : 'venda'
}

/** Unidade que representa o imóvel na vitrine — a primeira cadastrada. */
function mainUnit(units: PublicUnit[]): PublicUnit | undefined {
  return units[0]
}

function priceOf(unit?: PublicUnit): number | null {
  const price = unit?.salePrice || unit?.rentPrice || null
  if (!price || price <= 0) return null
  return price
}

/** Em localização aproximada a API não envia rua nem número. */
function addressLine(address: PublicAddress | null | undefined): string {
  if (!address) return ''
  return [address.street, address.number].filter(Boolean).join(', ')
}

function toParagraphs(description: string | null): string[] {
  if (!description) return []
  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function toProperty(
  item: PublicPropertyListItem,
  extra: {
    images?: string[]
    thumbnails?: string[]
    features?: string[]
    condoFeatures?: string[]
  } = {}
): Property {
  const unit = mainUnit(item.units)

  return {
    code: item.code,
    // o card usa `title` como rótulo curto (o tipo) e `subtitle` como chamada
    title: item.type?.name ?? 'Imóvel',
    subtitle: item.title,
    description: toParagraphs(item.description),
    purpose: toPurpose(item.purpose),
    type: (item.type?.name ?? '') as Property['type'],
    neighborhood: item.address?.neighborhood ?? '',
    city: item.address?.city ?? '',
    address: addressLine(item.address),
    price: priceOf(unit),
    area: unit?.builtArea ?? unit?.totalArea ?? 0,
    bedrooms: unit?.bedrooms ?? undefined,
    suites: unit?.suites ?? undefined,
    parking: unit?.parkingSpaces ?? undefined,
    images: extra.images ?? (item.coverImage ? [item.coverImage] : []),
    thumbnails: extra.thumbnails,
    featured: item.isFeatured,
    videoUrl: item.videoUrl ?? undefined,
    features: extra.features ?? [],
    condoFeatures: extra.condoFeatures,
  }
}

// ── Chamadas ──

export const findAllProperties = async (
  query: PropertyQuery = {}
): Promise<{ data: Property[]; meta: PublicListMeta }> => {
  const response = await getJson<{
    data: PublicPropertyListItem[]
    meta: PublicListMeta
  }>('/public/properties', query as Record<string, string | number | boolean>)

  return {
    data: response.data.map((item) => toProperty(item)),
    meta: response.meta,
  }
}

export const findPropertyByCode = async (
  code: string
): Promise<Property | null> => {
  const detail = await getJson<PublicPropertyDetail>(
    `/public/properties/${encodeURIComponent(code)}`
  )

  // As fotos do imóvel primeiro, depois as das unidades. As duas listas andam
  // em paralelo — `images` para a galeria em tamanho grande e `thumbnails`
  // para a tira de seleção, que renderiza todas de uma vez num quadro de 112px.
  const all = [
    ...detail.images,
    ...detail.units.flatMap((unit) => unit.images ?? []),
  ]

  return toProperty(detail as unknown as PublicPropertyListItem, {
    images: all.map((image) => image.url),
    thumbnails: all.map((image) => image.thumbnailUrl ?? image.url),
    // atributos booleanos entram só com o nome; os demais como "nome: valor"
    features: detail.units
      .flatMap((unit) => unit.features ?? [])
      .map((feature) =>
        feature.value === 'true' || feature.value === ''
          ? feature.name
          : `${feature.name}: ${feature.value}`
      ),
    condoFeatures: detail.condominium?.amenities.map(
      (amenity) => amenity.name
    ),
  })
}

export const findPropertyTypes = async (): Promise<
  { id: string; name: string }[]
> => getJson<{ id: string; name: string }[]>('/public/property-types')

export const findNeighborhoods = async (): Promise<string[]> =>
  getJson<string[]>('/public/neighborhoods')
