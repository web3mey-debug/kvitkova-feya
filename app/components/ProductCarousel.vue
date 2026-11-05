<script setup lang="ts">
import { products } from '~/data/products'

const { t } = useI18n()
const track = ref<HTMLElement | null>(null)
const canPrev = ref(false)
const canNext = ref(true)

function update() {
  const el = track.value
  if (!el) return
  canPrev.value = el.scrollLeft > 4
  canNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 4
}
function scrollBy(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('li')
  const step = (card?.getBoundingClientRect().width ?? 280) + 24
  el.scrollBy({ left: dir * step, behavior: 'smooth' })
}
onMounted(() => {
  update()
  window.addEventListener('resize', update, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <div class="relative">
    <div class="mb-6 flex justify-end gap-2">
      <button type="button" class="grid size-11 place-items-center rounded-full border border-graphite/40 transition hover:bg-graphite hover:text-white disabled:opacity-30" :disabled="!canPrev" :aria-label="t('slider.prev')" @click="scrollBy(-1)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 3 5 9l6 6" /></svg>
      </button>
      <button type="button" class="grid size-11 place-items-center rounded-full border border-graphite/40 transition hover:bg-graphite hover:text-white disabled:opacity-30" :disabled="!canNext" :aria-label="t('slider.next')" @click="scrollBy(1)">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7 3 6 6-6 6" /></svg>
      </button>
    </div>
    <ul
      ref="track"
      class="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4"
      @scroll.passive="update"
    >
      <li
        v-for="(p, i) in products" :key="p.slug"
        class="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[23.5%]"
        v-reveal="{ delay: i * 90 }"
      >
        <ProductCard :product="p" />
      </li>
    </ul>
  </div>
</template>
