import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { extractPhones, parseChannel } from './lib/parse-telegram.mjs'

const html = readFileSync(new URL('./fixtures/tgme-sample.html', import.meta.url), 'utf8')
const r = parseChannel(html, 'testchan')

assert.equal(r.title, 'Тестовий канал')
assert.match(r.description, /Квіти щодня\./)
assert.match(r.description, /\n/, 'переводы строк сохраняются')
assert.deepEqual(r.phones, ['+380671234567'])
assert.equal(r.posts.length, 2, 'служебные сообщения пропускаются')
assert.equal(r.posts[0].id, 101)
assert.equal(r.posts[0].image, 'https://cdn.example/photo101.jpg')
assert.equal(r.posts[0].text, 'Новий букет!\nЦіна за запитом & доставка.')
assert.equal(r.posts[0].date, '2026-11-01T10:00:00+00:00')
assert.equal(r.posts[1].image, null)

assert.deepEqual(extractPhones('тел 0671234567 і 380 50 111 22 33, 067-765-43-21'), ['+380671234567', '+380501112233', '+380677654321'])
assert.deepEqual(extractPhones('нічого'), [])

console.log('parse-telegram: ok')
