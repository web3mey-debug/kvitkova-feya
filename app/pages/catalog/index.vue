<script setup lang="ts">
import { products, occasionList, type Occasion } from '~/data/products'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

useSeoMeta({
  title: () => t('seo.catalogTitle'),
  description: () => t('seo.catalogDescription'),
  ogTitle: () => t('seo.catalogTitle'),
  ogDescription: () => t('seo.catalogDescription')
})

// Фильтр хранится в ?occasion=…; канонический URL — без параметра (страница каталога),
// чтобы комбинации фильтров не плодили дубли в поиске.
const active = computed<Occasion | null>(() => {
  const q = route.query.occasion
  return occasionList.includes(q as Occasion) ? (q as Occasion) : null
})
function setFilter(o: Occasion | null) {
  router.replace({ query: o ? { occasion: o } : {} })
}
const list = computed(() => (active.value ? products.filter((p) => p.occasions.includes(active.value!)) : products))

useSchemaOrg([defineBreadcrumb({ itemListElement: [{ name: t('nav.home'), item: '/' }, { name: t('nav.catalog') }] })])
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-20 pt-10">
    <h1 class="mb-3 text-5xl md:text-6xl" v-reveal>{{ t('catalog.title') }}</h1>
    <p class="mb-8 max-w-2xl text-muted" v-reveal="{ delay: 80 }">{{ t('catalog.intro') }}</p>

    <div role="group" :aria-label="t('catalog.filters')" class="mb-10 flex flex-wrap gap-3" v-reveal="{ delay: 140 }">
      <button
        type="button" :aria-pressed="!active"
        class="min-h-11 cursor-pointer rounded-full border-[1.5px] border-graphite px-5 text-sm font-semibold transition-all duration-300"
        :class="!active ? 'bg-graphite text-white' : 'hover:bg-blush'" @click="setFilter(null)"
      >{{ t('common.all') }}</button>
      <button
        v-for="o in occasionList" :key="o" type="button" :aria-pressed="active === o"
        class="min-h-11 cursor-pointer rounded-full border-[1.5px] border-graphite px-5 text-sm font-semibold transition-all duration-300"
        :class="active === o ? 'bg-graphite text-white' : 'hover:bg-blush'" @click="setFilter(o)"
      >{{ t(`occasions.items.${o}`) }}</button>
    </div>

    <TransitionGroup v-if="list.length" tag="ul" name="grid" class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      <li v-for="(p, i) in list" :key="p.slug" v-reveal="{ delay: (i % 3) * 90 }">
        <ProductCard :product="p" :eager="i < 3" />
      </li>
    </TransitionGroup>
    <p v-else class="py-16 text-center text-muted">{{ t('catalog.empty') }}</p>
  </div>
</template>

<style scoped>
.grid-move, .grid-enter-active, .grid-leave-active { transition: all 0.5s var(--ease-out-soft); }
.grid-enter-from, .grid-leave-to { opacity: 0; transform: scale(0.95); }
.grid-leave-active { position: absolute; }
</style>
