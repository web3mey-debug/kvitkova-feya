import { parse } from 'node-html-parser'

/** HTML-фрагмент -> чистый текст с переводами строк */
function htmlToText(html) {
  const withBreaks = html.replace(/<br\s*\/?>/gi, '\n')
  return parse(withBreaks).text.replace(/ /g, ' ').replace(/\n{3,}/g, '\n\n').trim()
}

/** Украинские номера: +380 XX XXX XX XX, 380XXXXXXXXX, 0XX XXX XX XX (с пробелами, дефисами, скобками) */
export function extractPhones(text) {
  const found = new Set()
  for (const m of text.matchAll(/\+?\d[\d\s().-]{8,18}\d/g)) {
    const digits = m[0].replace(/\D/g, '')
    if (digits.length === 12 && digits.startsWith('380')) found.add('+' + digits)
    else if (digits.length === 10 && digits.startsWith('0')) found.add('+38' + digits)
  }
  return [...found]
}

function bgUrl(style = '') {
  const m = style.match(/background-image:\s*url\((['"]?)(.*?)\1\)/i)
  return m ? m[2] : null
}

/**
 * Разбор публичной веб-версии канала https://t.me/s/<канал>.
 * Возвращает { title, description, phones, posts[] } (посты — от старых к новым, как на странице).
 */
export function parseChannel(html, channel) {
  const root = parse(html)
  const title = root.querySelector('.tgme_channel_info_header_title')?.text.trim() || null
  const descEl = root.querySelector('.tgme_channel_info_description')
  const description = descEl ? htmlToText(descEl.innerHTML) : null

  const posts = []
  for (const el of root.querySelectorAll('.tgme_widget_message')) {
    const ref = el.getAttribute('data-post') // channel/123
    if (!ref || !ref.includes('/')) continue
    const id = Number(ref.split('/').pop())
    if (!Number.isFinite(id)) continue

    const textEl = el.querySelector('.tgme_widget_message_text')
    const text = textEl ? htmlToText(textEl.innerHTML) : ''
    const photoEl = el.querySelector('.tgme_widget_message_photo_wrap')
    const image = photoEl ? bgUrl(photoEl.getAttribute('style') || '') : null
    const time = el.querySelector('.tgme_widget_message_date time')?.getAttribute('datetime') || null
    const url = el.querySelector('.tgme_widget_message_date')?.getAttribute('href') || `https://t.me/${ref}`

    if (!text && !image) continue
    posts.push({ id, url, date: time, text, image })
  }

  const phones = extractPhones([description || '', ...posts.slice(-5).map((p) => p.text)].join('\n'))
  return { channel, title, description, phones, posts }
}
