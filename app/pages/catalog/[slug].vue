<script setup lang="ts">
import { products } from '~/data/products'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const asset = useAsset()

const product = products.find((p) => p.slug === route.params.slug)
if (!product) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })

const name = computed(() => t(`products.items.${product.slug}.name`))
const desc = computed(() => t(`products.items.${product.slug}.desc`))

useSeoMeta({
  title: () => t('seo.productTitle', { name: name.value }),
  description: () => t('seo.productDescription', { name: name.value }),
  ogTitle: () => t('seo.productTitle', { name: name.value }),
  ogDescription: () => t('seo.productDescription', { name: name.value }),
  ogImage: asset(product.art),
  ogType: 'website'
})

useSchemaOrg([
  defineProduct({ name: name.value, description: desc.value, image: asset(product.art) /* TODO: offers — когда появятся цены */ }),
  defineBreadcrumb({
    itemListElement: [
      { name: t('nav.home'), item: '/' },
      { name: t('nav.catalog'), item: '/catalog' },
      { name: name.value }
    ]
  })
])

const sizes = ['S', 'M', 'L'] as const
const size = ref<(typeof sizes)[number]>('M')
const addonKeys = ['card', 'choco', 'balloons'] as const
const addons = reactive<Record<string, boolean>>({})
const similar = products.filter((p) => p.slug !== product.slug).slice(0, 3)
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-20 pt-6">
    <nav :aria-label="t('product.breadcrumb')" class="mb-6 text-[13px] text-muted">
      <NuxtLink :to="localePath('/')" class="hover:underline">{{ t('nav.home') }}</NuxtLink> /
      <NuxtLink :to="localePath('/catalog')" class="hover:underline">{{ t('nav.catalog') }}</NuxtLink> /
      <span class="text-graphite">{{ name }}</span>
    </nav>

    <div class="flex flex-wrap items-start gap-12">
      <div class="min-w-0 flex-1 basis-[440px]" v-reveal="{ variant: 'left' }">
        <div class="overflow-hidden rounded-[32px] bg-blush">
          <img :src="asset(product.art)" width="800" height="1000" :alt="name" fetchpriority="high" decoding="async" class="aspect-[4/5] h-auto w-full object-cover">
        </div>
      </div>

      <div class="min-w-0 flex-1 basis-[400px]" v-reveal="{ variant: 'right' }">
        <p class="mb-3 text-xs uppercase tracking-[0.12em] text-muted">{{ t(`tags.${product.tag}`) }}</p>
        <h1 class="mb-4 text-5xl leading-none md:text-6xl">{{ name }}</h1>
        <p class="mb-8 max-w-lg leading-[1.7]">{{ desc }}</p>

        <p id="size-label" class="mb-2.5 text-sm font-semibold">{{ t('product.size') }}</p>
        <div role="group" aria-labelledby="size-label" class="mb-2 flex gap-3">
          <button
            v-for="s in sizes" :key="s" type="button" :aria-pressed="size === s"
            class="min-h-12 w-16 cursor-pointer rounded-full border-[1.5px] border-graphite font-semibold transition-all duration-300"
            :class="size === s ? 'bg-graphite text-white' : 'hover:bg-blush'" @click="size = s"
          >{{ s }}</button>
        </div>
        <p class="mb-8 text-sm text-muted">{{ t(`product.sizeNote.${size}`) }}</p>

        <p id="addon-label" class="mb-2.5 text-sm font-semibold">{{ t('product.addons') }}</p>
        <div role="group" aria-labelledby="addon-label" class="mb-8 flex flex-wrap gap-3">
          <button
            v-for="a in addonKeys" :key="a" type="button" :aria-pressed="!!addons[a]"
            class="min-h-11 cursor-pointer rounded-full border-[1.5px] border-graphite px-5 text-sm font-medium transition-all duration-300"
            :class="addons[a] ? 'bg-blush' : 'hover:bg-blush-soft'" @click="addons[a] = !addons[a]"
          >{{ addons[a] ? '✓' : '+' }} {{ t(`product.addonItems.${a}`) }}</button>
        </div>

        <div class="rounded-[28px] border border-blush bg-white p-7">
          <h2 class="mb-4 text-3xl">{{ t('product.quickOrder') }}</h2>
          <LeadForm compact :context="t('product.orderFor', { price: t('product.price') })" />
          <p class="mt-3 text-center text-[13px] text-muted">{{ t('product.messengerHint') }}</p>
        </div>
      </div>
    </div>

    <section class="mt-20 grid gap-6 md:grid-cols-3">
      <div v-reveal class="rounded-3xl border border-blush bg-white p-7">
        <h2 class="mb-2.5 text-3xl">{{ t('product.composition') }}</h2>
        <p class="leading-relaxed text-muted">{{ t('product.compositionText') }}</p>
      </div>
      <div v-reveal="{ delay: 120 }" class="rounded-3xl border border-blush bg-white p-7">
        <h2 class="mb-2.5 text-3xl">{{ t('product.photoTitle') }}</h2>
        <p class="leading-relaxed text-muted">{{ t('product.photoText') }}</p>
      </div>
      <div v-reveal="{ delay: 240 }" class="rounded-3xl border border-blush bg-white p-7">
        <h2 class="mb-2.5 text-3xl">{{ t('product.deliveryTitle') }}</h2>
        <p class="leading-relaxed text-muted">{{ t('product.deliveryText') }}</p>
      </div>
    </section>

    <section class="mt-20">
      <h2 class="mb-8 text-4xl md:text-5xl" v-reveal>{{ t('product.similar') }}</h2>
      <ul class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        <li v-for="(p, i) in similar" :key="p.slug" v-reveal="{ delay: i * 100 }"><ProductCard :product="p" /></li>
      </ul>
    </section>
  </div>
</template>
