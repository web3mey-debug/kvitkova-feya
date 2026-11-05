// Синхронизация публичных Telegram-каналов студий (веб-версия https://t.me/s/<канал>).
// Запуск: node tools/sync-telegram.mjs
// Пишет app/data/social/<студия>.telegram.json и скачивает фото в public/social/tg/<студия>/.
// При любой ошибке сети оставляет прежние данные и завершается с кодом 0 (сайт не ломается).
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseChannel } from './lib/parse-telegram.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const studios = JSON.parse(await readFile(join(root, 'app/data/studios.json'), 'utf8'))

const UA = 'KvitkovaFeyaSiteSync/1.0 (+https://github.com/web3mey-debug/kvitkova-feya)'
const MAX_POSTS = 12
const TIMEOUT_MS = 20_000

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'uk,en;q=0.8' }, signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res
}

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }

async function downloadImage(url, slug, id) {
  try {
    const res = await get(url)
    const ext = EXT[(res.headers.get('content-type') || '').split(';')[0]]
    if (!ext) return null
    const dir = join(root, 'public/social/tg', slug)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, `${id}.${ext}`), Buffer.from(await res.arrayBuffer()))
    return `/social/tg/${slug}/${id}.${ext}`
  } catch (e) {
    console.warn(`  ! фото ${id}: ${e.message}`)
    return null
  }
}

let failed = 0
for (const s of studios) {
  if (!s.telegram) continue
  const file = join(root, 'app/data/social', `${s.slug}.telegram.json`)
  try {
    console.log(`→ ${s.slug}: t.me/s/${s.telegram}`)
    const html = await (await get(`https://t.me/s/${s.telegram}`)).text()
    const ch = parseChannel(html, s.telegram)
    if (!ch.posts.length && !ch.description) throw new Error('канал без публичных постов (закрытый или другая разметка)')

    const latest = ch.posts.slice(-MAX_POSTS).reverse() // новые сверху
    for (const p of latest) {
      p.image = p.image ? await downloadImage(p.image, s.slug, p.id) : null
    }
    const out = {
      channel: s.telegram,
      title: ch.title,
      description: ch.description,
      phones: ch.phones,
      fetchedAt: new Date().toISOString(),
      posts: latest
    }
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, JSON.stringify(out, null, 2) + '\n')
    console.log(`  ✓ постов: ${latest.length}, телефонов в описании: ${ch.phones.length}`)
  } catch (e) {
    failed++
    console.warn(`  ✗ ${s.slug}: ${e.message} — оставляем прежние данные`)
  }
}
if (failed) console.warn(`Не удалось обновить каналов: ${failed}`)
