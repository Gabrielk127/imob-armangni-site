import type { Property } from '../data/properties'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function formatPrice(property: Pick<Property, 'price' | 'purpose'>): string {
  if (property.price == null) return 'Sob consulta'
  const value = brl.format(property.price)
  return property.purpose === 'aluguel' ? `${value}/mês` : value
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('pt-BR')} m²`
}
