import studiosJson from './studios.json'
import kyivTg from './social/kyiv.telegram.json'
import boryspilTg from './social/boryspil.telegram.json'
import instagramJson from './instagram.json'

export type StudioSlug = 'kyiv' | 'boryspil' | 'shchaslyve'

export interface TelegramPost {
  id: number
  url: string
  date: string | null
  text: string
  image: string | null
}
export interface TelegramFeed {
  channel: string
  title: string | null
  description: string | null
  phones: string[]
  fetchedAt: string | null
  posts: TelegramPost[]
}
export interface InstagramItem {
  studio: StudioSlug
  image: string
  caption?: string
  url?: string
}
export interface Studio {
  slug: StudioSlug
  instagram: string
  telegram: string | null
  /** Контакты, заданные вручную (приоритетнее данных из Telegram) */
  phone: string | null
  address: string | null
  hours: string | null
  instagramUrl: string
  telegramUrl: string | null
  /** Лента канала, подтянутая синком (tools/sync-telegram.mjs) */
  feed: TelegramFeed | null
  /** Телефон: заданный вручную, иначе первый найденный в описании Telegram-канала */
  displayPhone: string | null
  instagramPosts: InstagramItem[]
}

const feeds: Partial<Record<StudioSlug, TelegramFeed>> = {
  kyiv: kyivTg as TelegramFeed,
  boryspil: boryspilTg as TelegramFeed
}

export const studios: Studio[] = (studiosJson as Array<Pick<Studio, 'slug' | 'instagram' | 'telegram' | 'phone' | 'address' | 'hours'>>).map((s) => {
  const feed = feeds[s.slug] ?? null
  return {
    ...s,
    instagramUrl: `https://www.instagram.com/${s.instagram}`,
    telegramUrl: s.telegram ? `https://t.me/${s.telegram}` : null,
    feed,
    displayPhone: formatPhone(s.phone ?? feed?.phones?.[0] ?? '') || null,
    instagramPosts: (instagramJson as InstagramItem[]).filter((i) => i.studio === s.slug)
  }
})

export const studioSlugs = studios.map((s) => s.slug)
export const getStudio = (slug: string) => studios.find((s) => s.slug === slug)

/** +380671234567 -> +38 067 123 45 67 (иначе возвращает как есть) */
export function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, '')
  return d.length === 12 && d.startsWith('380') ? `+38 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}` : phone
}

/** Ссылка tel: из номера в любом формате */
export const telHref = (phone: string) => 'tel:+' + phone.replace(/\D/g, '')
