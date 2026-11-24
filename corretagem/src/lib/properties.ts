import type { Property } from '../content/site';
export function propertyMessage(template: string, property: Pick<Property, 'name' | 'reference'>): string {
  return template.replaceAll('{name}', property.name).replaceAll('{reference}', property.reference);
}
export const formatPrice = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
