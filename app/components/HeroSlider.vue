<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface Slide { id: 'bouquet' | 'wedding' | 'box'; bg: string; art: string; to: string; to2: string }
const slides = computed<Slide[]>(() => [
  { id: 'bouquet', bg: '#F4CDD6', art: '/slides/bouquet.svg', to: localePath({ path: '/', hash: '#order' }), to2: localePath('/catalog') },
  { id: 'wedding', bg: '#FBE3E8', art: '/slides/wedding.svg', to: localePath({ path: '/', hash: '#events' }), to2: localePath('/catalog') },
  { id: 'box', bg: '#9DB09A', art: '/slides/box.svg', to: localePath('/catalog'), to2: localePath({ path: '/', hash: '#how' }) }
])

const DURATION = 6500
const index = ref(0)
const paused = ref(false)
const reduced = ref(false)
const n = computed(() => slides.value.length)

const go = (i: number) => { index.value = (i + n.value) % n.value }
const next = () => go(index.value + 1)
const prev = () => go(index.value - 1)

// автопрокрутка: прогресс-полоска — CSS-анимация, по её окончанию листаем дальше
function onBarEnd(i: number) {
  if (i === index.value && !reduced.value) next()
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const onVis = () => { paused.value = document.hidden }
  document.addEventListener('visibilitychange', onVis)
  onBeforeUnmount(() => document.removeEventListener('visibilitychange', onVis))
})

// свайп
let startX = 0
let startY = 0
function onDown(e: PointerEvent) { startX = e.clientX; startY = e.clientY }
function onUp(e: PointerEvent) {
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)()
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

const petals = [
  { l: '6%', t: '14%', s: 26, r: '-20deg', d: '0s', tt: '7s' },
  { l: '44%', t: '8%', s: 18, r: '30deg', d: '1.2s', tt: '8s' },
  { l: '52%', t: '78%', s: 30, r: '70deg', d: '.6s', tt: '9s' },
  { l: '3%', t: '70%', s: 20, r: '10deg', d: '2s', tt: '6.5s' }
]
</script>

<template>
  <section
    class="relative overflow-hidden transition-colors duration-700"
    :style="{ backgroundColor: slides[index]?.bg }"
    aria-roledescription="carousel" :aria-label="t('slider.label')"
    tabindex="-1"
    @pointerdown="onDown" @pointerup="onUp" @keydown="onKey"
    @mouseenter="paused = true" @mouseleave="paused = false"
    @focusin="paused = true" @focusout="paused = false"
  >
    <!-- летающие лепестки -->
    <svg
      v-for="(p, i) in petals" :key="i" class="petal hidden text-graphite/15 md:block" :style="{ left: p.l, top: p.t, '--r': p.r, '--dl': p.d, '--t': p.tt }"
      :width="p.s" :height="p.s * 1.6" viewBox="0 0 20 32" aria-hidden="true"
    ><ellipse cx="10" cy="16" rx="7" ry="14" fill="currentColor" /></svg>

    <div class="mx-auto grid max-w-6xl" style="touch-action: pan-y">
      <div
        v-for="(s, i) in slides" :key="s.id"
        class="slide grid items-center gap-6 px-4 pb-24 pt-8 md:grid-cols-2 md:gap-10 md:pb-28 md:pt-12"
        :class="{ 'is-active': i === index }"
        role="group" aria-roledescription="slide" :aria-label="`${i + 1} / ${n}`"
        :inert="i !== index || undefined"
      >
        <div class="order-2 text-center md:order-1 md:text-left">
          <p class="eyebrow anim mb-4" style="--ad: 150ms">{{ t(`slider.slides.${s.id}.eyebrow`) }}</p>
          <component :is="i === 0 ? 'h1' : 'h2'" class="anim mb-5 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl" style="--ad: 280ms">
            {{ t(`slider.slides.${s.id}.title`) }}
          </component>
          <p class="anim mx-auto mb-8 max-w-md text-[17px] leading-relaxed md:mx-0" style="--ad: 420ms">{{ t(`slider.slides.${s.id}.text`) }}</p>
          <div class="anim flex flex-wrap justify-center gap-3 md:justify-start" style="--ad: 560ms">
            <NuxtLink :to="s.to" class="btn btn-dark">{{ t(`slider.slides.${s.id}.cta`) }}</NuxtLink>
            <NuxtLink :to="s.to2" class="btn btn-line">{{ t(`slider.slides.${s.id}.cta2`) }}</NuxtLink>
          </div>
        </div>
        <div class="art order-1 mx-auto w-full max-w-[300px] sm:max-w-[380px] md:order-2 md:max-w-[500px]">
          <img
            :src="s.art" width="1000" height="1000" alt=""
            :loading="i === 0 ? 'eager' : 'lazy'" :fetchpriority="i === 0 ? 'high' : 'auto'" decoding="async"
            class="aspect-square h-auto w-full select-none" draggable="false"
          >
        </div>
      </div>
    </div>

    <!-- управление -->
    <div class="absolute inset-x-0 bottom-5 z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
      <div class="flex flex-1 gap-2" role="tablist" aria-label="Slides" @keydown.stop="onKey">
        <button
          v-for="(s, i) in slides" :key="s.id" type="button" role="tab"
          :aria-selected="i === index" :aria-label="t('slider.goTo', { n: i + 1 })"
          class="slide-bar group relative h-11 max-w-24 flex-1"
          :class="{ 'is-active': i === index, 'is-done': i < index }"
          :style="{ '--dur': `${DURATION}ms`, '--play': paused || reduced ? 'paused' : 'running' }"
          @click="go(i)"
        >
          <span class="absolute inset-x-0 top-1/2 block h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-graphite/20">
            <span class="fill block h-full bg-graphite" @animationend="onBarEnd(i)" />
          </span>
        </button>
      </div>
      <div class="hidden gap-2 md:flex">
        <button type="button" class="grid size-11 place-items-center rounded-full border border-graphite/40 bg-white/60 backdrop-blur transition hover:bg-graphite hover:text-white" :aria-label="t('slider.prev')" @click="prev">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 3 5 9l6 6" /></svg>
        </button>
        <button type="button" class="grid size-11 place-items-center rounded-full border border-graphite/40 bg-white/60 backdrop-blur transition hover:bg-graphite hover:text-white" :aria-label="t('slider.next')" @click="next">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 3 6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  </section>
</template>
