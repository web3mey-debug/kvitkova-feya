// Генератор SVG-иллюстраций (слайды героя и плитки товаров) для сайта «Квіткова Фея».
// Запуск: node gen.mjs <outDir>
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const out = process.argv[2]
mkdirSync(join(out, 'slides'), { recursive: true })
mkdirSync(join(out, 'products'), { recursive: true })

function rngFor(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const f = (n) => Math.round(n * 10) / 10

const PAL = {
  rose:  { petals: ['#E9A9B8', '#F4CDD6', '#FBE3E8', '#FFFFFF'], center: '#D98BA0', dot: '#B8607B' },
  blush: { petals: ['#F4CDD6', '#FBE3E8', '#FFFFFF', '#F4CDD6'], center: '#E9A9B8', dot: '#C77A92' },
  cream: { petals: ['#FFFFFF', '#FFF1EE', '#F8DDD8', '#F4CDD6'], center: '#E8C4A0', dot: '#B88B5E' },
  deep:  { petals: ['#D98BA0', '#E9A9B8', '#F4CDD6', '#FBE3E8'], center: '#B8607B', dot: '#8E3F59' },
  peach: { petals: ['#F6C2B4', '#FADAD0', '#FFF1EE', '#FFFFFF'], center: '#E59C86', dot: '#B9684F' }
}
const LEAF = ['#9DB09A', '#7E9680', '#B9C8B6', '#6E8872']

function bloom(cx, cy, R, p, rng) {
  const layers = [
    { n: 9, len: 1.0, w: 0.42, c: p.petals[0], d: 0.5 },
    { n: 8, len: 0.8, w: 0.4, c: p.petals[1], d: 0.4 },
    { n: 7, len: 0.58, w: 0.38, c: p.petals[2], d: 0.29 },
    { n: 6, len: 0.36, w: 0.34, c: p.petals[3], d: 0.18 }
  ]
  let s = `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${Math.floor(rng() * 360)})">`
  layers.forEach((L, i) => {
    for (let k = 0; k < L.n; k++) {
      const a = (k * 360) / L.n + i * (180 / L.n) + (rng() - 0.5) * 8
      s += `<ellipse cx="0" cy="${f(-R * L.d)}" rx="${f(R * L.w * 0.55)}" ry="${f(R * L.len * 0.5)}" transform="rotate(${f(a)})" fill="${L.c}" stroke="#ffffff" stroke-opacity=".45" stroke-width="1.4"/>`
    }
  })
  s += `<circle r="${f(R * 0.09)}" fill="${p.center}"/>`
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * Math.PI * 2
    s += `<circle cx="${f(Math.cos(a) * R * 0.14)}" cy="${f(Math.sin(a) * R * 0.14)}" r="${f(R * 0.018)}" fill="${p.dot}"/>`
  }
  return s + '</g>'
}

function leaf(x, y, L, angle, color) {
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})"><path d="M0 0C${f(L * 0.25)} ${f(-L * 0.3)} ${f(L * 0.7)} ${f(-L * 0.22)} ${f(L)} 0C${f(L * 0.7)} ${f(L * 0.22)} ${f(L * 0.25)} ${f(L * 0.3)} 0 0Z" fill="${color}"/><path d="M0 0L${f(L * 0.9)} 0" stroke="#ffffff" stroke-opacity=".35" stroke-width="2"/></g>`
}

function filler(cx, cy, r, n, color, rng) {
  let s = ''
  for (let i = 0; i < n; i++) {
    const a = rng() * Math.PI * 2
    const d = Math.sqrt(rng()) * r
    s += `<circle cx="${f(cx + Math.cos(a) * d)}" cy="${f(cy + Math.sin(a) * d)}" r="${f(3 + rng() * 5)}" fill="${color}"/>`
  }
  return s
}

function leavesRing(cx, cy, r, n, L, rng, spread = 360, start = 0) {
  let s = ''
  for (let i = 0; i < n; i++) {
    const a = start + (i / n) * spread + (rng() - 0.5) * 14
    const rad = (a * Math.PI) / 180
    s += leaf(cx + Math.cos(rad) * r, cy + Math.sin(rad) * r, L * (0.8 + rng() * 0.4), a, LEAF[Math.floor(rng() * LEAF.length)])
  }
  return s
}

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`

/* ---------- Слайд 1: букет в круге ---------- */
function slideBouquet() {
  const rng = rngFor(11)
  let b = `<ellipse cx="500" cy="948" rx="330" ry="26" fill="#2B2B2B" opacity=".08"/>`
  b += `<circle cx="500" cy="500" r="430" fill="#FFF8F6"/>`
  b += `<circle cx="500" cy="500" r="452" fill="none" stroke="#2B2B2B" stroke-opacity=".25" stroke-width="2" stroke-dasharray="3 14" stroke-linecap="round"/>`
  b += leavesRing(500, 500, 250, 14, 190, rng)
  b += filler(500, 500, 360, 70, '#FFFFFF', rng)
  const spots = [
    [500, 495, 160, 'rose'], [330, 385, 118, 'blush'], [672, 375, 124, 'deep'], [345, 625, 108, 'cream'],
    [662, 628, 114, 'rose'], [500, 285, 98, 'peach'], [500, 705, 92, 'blush'], [230, 505, 72, 'cream'], [775, 505, 74, 'peach']
  ]
  spots.forEach(([x, y, R, p]) => { b += bloom(x, y, R, PAL[p], rng) })
  b += filler(500, 500, 400, 22, '#7E9680', rng)
  return svg(1000, 1000, b)
}

/* ---------- Слайд 2: весільна арка ---------- */
function slideWedding() {
  const rng = rngFor(23)
  let b = `<ellipse cx="500" cy="948" rx="330" ry="24" fill="#2B2B2B" opacity=".08"/>`
  b += `<path d="M200 940V470A300 300 0 0 1 800 470V940Z" fill="#F4CDD6"/>`
  b += `<path d="M236 940V474A264 264 0 0 1 764 474V940Z" fill="none" stroke="#2B2B2B" stroke-opacity=".35" stroke-width="2.5"/>`
  b += `<path d="M312 940V480A188 188 0 0 1 688 480V940Z" fill="#FFF8F6"/>`
  // цветочная композиция слева-снизу и справа-сверху
  b += leavesRing(235, 640, 70, 11, 170, rng, 300, 90)
  b += leavesRing(770, 330, 70, 10, 150, rng, 300, -90)
  b += filler(240, 620, 140, 40, '#FFFFFF', rng)
  b += filler(770, 340, 120, 32, '#FFFFFF', rng)
  const spots = [
    [225, 770, 112, 'rose'], [310, 650, 92, 'cream'], [205, 590, 96, 'blush'], [300, 520, 80, 'peach'], [210, 470, 70, 'deep'], [375, 760, 70, 'blush'],
    [790, 380, 108, 'deep'], [700, 290, 88, 'rose'], [820, 255, 70, 'cream'], [610, 215, 66, 'blush'], [800, 500, 66, 'peach']
  ]
  spots.forEach(([x, y, R, p]) => { b += bloom(x, y, R, PAL[p], rng) })
  b += filler(250, 560, 190, 14, '#7E9680', rng)
  return svg(1000, 1000, b)
}

/* ---------- Слайд 3: коробка с цветами (вид сверху) ---------- */
function boxTop(cx, cy, R, rng, rows = 1) {
  let b = `<ellipse cx="${cx}" cy="${cy + R + 36}" rx="${R * 0.82}" ry="22" fill="#2B2B2B" opacity=".1"/>`
  b += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#2B2B2B"/>`
  b += `<circle cx="${cx}" cy="${cy}" r="${R - 26}" fill="#FFF8F6"/>`
  b += `<circle cx="${cx}" cy="${cy}" r="${R - 44}" fill="#EBC5CE"/>`
  const pal = ['rose', 'blush', 'cream', 'deep', 'peach']
  const inner = R - 52
  const step = inner / 3.3
  const pts = []
  for (let ring = 0; ring <= 3; ring++) {
    const rr = ring * step
    const cnt = ring === 0 ? 1 : ring * 6
    for (let k = 0; k < cnt; k++) {
      const a = (k / cnt) * Math.PI * 2 + ring * 0.4
      pts.push([cx + Math.cos(a) * rr * 0.96, cy + Math.sin(a) * rr * 0.96, ring])
    }
  }
  b += leavesRing(cx, cy, inner * 0.82, 16, inner * 0.38, rng)
  pts.forEach(([x, y, ring]) => {
    b += bloom(x, y, step * (0.78 + rng() * 0.2), PAL[pal[Math.floor(rng() * pal.length)]], rng)
  })
  return b
}
function slideBox() {
  const rng = rngFor(37)
  return svg(1000, 1000, boxTop(500, 480, 420, rng))
}

/* ---------- Плитки товаров 800x1000 ---------- */
function cone(cx, top, bottom, wide, fill, rng, flowers, leafCount, bgFiller) {
  let b = ''
  // стебли
  for (let i = 0; i < 9; i++) {
    const x = cx + (i - 4) * 14
    b += `<path d="M${x} ${top + 80}L${cx + (i - 4) * 3} ${bottom}" stroke="#7E9680" stroke-width="6" stroke-linecap="round" opacity=".9"/>`
  }
  b += leavesRing(cx, top + 120, 190, leafCount, 150, rng, 220, 160)
  b += filler(cx, top + 70, 200, bgFiller, '#FFFFFF', rng)
  flowers.forEach(([x, y, R, p]) => { b += bloom(x, y, R, PAL[p], rng) })
  // упаковка (конус)
  b += `<path d="M${cx - wide} ${top + 300}L${cx} ${bottom}L${cx + wide} ${top + 300}Q${cx} ${top + 360} ${cx - wide} ${top + 300}Z" fill="${fill}"/>`
  b += `<path d="M${cx - wide} ${top + 300}L${cx} ${bottom}" stroke="#2B2B2B" stroke-opacity=".12" stroke-width="3"/>`
  b += `<path d="M${cx + wide} ${top + 300}L${cx} ${bottom}" stroke="#2B2B2B" stroke-opacity=".12" stroke-width="3"/>`
  b += `<path d="M${cx - wide * 0.4} ${top + 418}Q${cx} ${top + 440} ${cx + wide * 0.4} ${top + 418}L${cx + wide * 0.36} ${top + 444}Q${cx} ${top + 466} ${cx - wide * 0.36} ${top + 444}Z" fill="#2B2B2B"/>`
  b += `<ellipse cx="${cx - 26}" cy="${top + 436}" rx="26" ry="14" transform="rotate(-18 ${cx - 26} ${top + 436})" fill="#2B2B2B"/><ellipse cx="${cx + 26}" cy="${top + 436}" rx="26" ry="14" transform="rotate(18 ${cx + 26} ${top + 436})" fill="#2B2B2B"/><circle cx="${cx}" cy="${top + 438}" r="9" fill="#F4CDD6"/>`
  return b
}
function tile(bg, body, seedDeco) {
  const rng = rngFor(seedDeco)
  let deco = ''
  for (let i = 0; i < 9; i++) {
    deco += `<ellipse cx="${f(rng() * 800)}" cy="${f(rng() * 1000)}" rx="${f(8 + rng() * 10)}" ry="${f(16 + rng() * 14)}" transform="rotate(${Math.floor(rng() * 180)} ${f(rng() * 800)} ${f(rng() * 1000)})" fill="#ffffff" opacity=".35"/>`
  }
  return svg(800, 1000, `<rect width="800" height="1000" fill="${bg}"/>${deco}<g transform="translate(16 52) scale(.96)">${body}</g>`)
}

const products = {
  'nizhniy-ranok': () => {
    const rng = rngFor(101)
    return tile('#F4CDD6', cone(400, 110, 930, 250, '#FFF8F6', rng, [
      [400, 330, 120, 'blush'], [275, 395, 96, 'rose'], [525, 395, 100, 'cream'], [330, 245, 84, 'peach'], [480, 235, 86, 'rose'], [225, 290, 64, 'cream'], [580, 295, 66, 'blush']
    ], 9, 40), 5)
  },
  'pudrova-mriya': () => {
    const rng = rngFor(202)
    return tile('#FFF0F2', cone(400, 120, 930, 240, '#F4CDD6', rng, [
      [400, 340, 118, 'cream'], [280, 400, 92, 'blush'], [520, 400, 96, 'cream'], [340, 250, 82, 'blush'], [470, 240, 80, 'peach'], [400, 150, 62, 'rose']
    ], 8, 30), 6)
  },
  'sad-u-korobtsi': () => {
    const rng = rngFor(303)
    return tile('#9DB09A', boxTop(400, 450, 330, rng), 7)
  },
  'mono-pivonii': () => {
    const rng = rngFor(404)
    return tile('#FBE3E8', cone(400, 120, 930, 235, '#FFFFFF', rng, [
      [400, 330, 150, 'deep'], [260, 420, 112, 'rose'], [545, 415, 118, 'deep'], [360, 215, 92, 'rose']
    ], 6, 8), 8)
  },
  'sukhotsvity': () => {
    const rng = rngFor(505)
    const dried = { petals: ['#D7B38F', '#E6CBB0', '#F2E2CE', '#FFFFFF'], center: '#A67C52', dot: '#7A5530' }
    PAL.dried = dried
    return tile('#EADBCB', cone(400, 130, 930, 225, '#FFF8F6', rng, [
      [400, 340, 112, 'dried'], [285, 405, 88, 'dried'], [515, 405, 90, 'dried'], [345, 255, 76, 'dried'], [460, 245, 74, 'dried']
    ], 10, 60), 9)
  },
  'vesilnyi': () => {
    const rng = rngFor(606)
    return tile('#FFFFFF', cone(400, 100, 930, 255, '#F4CDD6', rng, [
      [400, 320, 130, 'cream'], [265, 390, 100, 'blush'], [535, 392, 104, 'cream'], [330, 230, 88, 'peach'], [475, 220, 90, 'blush'], [215, 290, 66, 'rose'], [590, 290, 68, 'cream']
    ], 10, 56), 10)
  }
}

writeFileSync(join(out, 'slides', 'bouquet.svg'), slideBouquet())
writeFileSync(join(out, 'slides', 'wedding.svg'), slideWedding())
writeFileSync(join(out, 'slides', 'box.svg'), slideBox())
for (const [slug, fn] of Object.entries(products)) {
  writeFileSync(join(out, 'products', `${slug}.svg`), fn())
}
console.log('ok')
