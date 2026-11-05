export type ProductTag = 'hit' | 'new' | 'box' | 'mono' | 'dried' | 'wedding'
export type Occasion = 'birthday' | 'wedding' | 'march8' | 'sorry' | 'b2b' | 'box'

export interface Product {
  slug: string
  tag: ProductTag
  art: string
  occasions: Occasion[]
}

// Названия и описания — в i18n/locales/*.json (products.items.<slug>).
// Цены пока не заданы: ждём данные заказчика.
export const products: Product[] = [
  { slug: 'nizhniy-ranok', tag: 'hit', art: '/products/nizhniy-ranok.svg', occasions: ['birthday', 'march8'] },
  { slug: 'pudrova-mriya', tag: 'new', art: '/products/pudrova-mriya.svg', occasions: ['birthday', 'sorry'] },
  { slug: 'sad-u-korobtsi', tag: 'box', art: '/products/sad-u-korobtsi.svg', occasions: ['box', 'march8', 'b2b'] },
  { slug: 'mono-pivonii', tag: 'mono', art: '/products/mono-pivonii.svg', occasions: ['march8', 'sorry'] },
  { slug: 'sukhotsvity', tag: 'dried', art: '/products/sukhotsvity.svg', occasions: ['b2b', 'birthday'] },
  { slug: 'vesilnyi', tag: 'wedding', art: '/products/vesilnyi.svg', occasions: ['wedding'] }
]

export const occasionList: Occasion[] = ['birthday', 'wedding', 'march8', 'sorry', 'b2b', 'box']
