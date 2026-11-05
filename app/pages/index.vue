<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineLocalBusiness({
    '@type': 'Florist',
    name: 'Квіткова Фея',
    description: t('seo.description'),
    // TODO: заполнить после получения данных заказчика
    // address, telephone, openingHours, geo, areaServed, sameAs
  }),
  defineWebSite({ name: 'Квіткова Фея' })
])

const occasions = ['birthday', 'wedding', 'march8', 'sorry', 'b2b', 'box'] as const
</script>

<template>
  <div>
    <section class="bg-blush">
      <div class="mx-auto max-w-6xl px-4 py-20 md:py-32 text-center">
        <p class="eyebrow mb-4">{{ t('hero.eyebrow') }}</p>
        <h1 class="text-4xl md:text-6xl mb-6">{{ t('hero.title') }}</h1>
        <p class="mx-auto max-w-xl mb-10">{{ t('hero.text') }}</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <NuxtLink :to="localePath('/')" class="bg-graphite text-white px-8 py-3 rounded-full">{{ t('hero.cta') }}</NuxtLink>
          <NuxtLink :to="localePath('/')" class="border border-graphite px-8 py-3 rounded-full">{{ t('hero.cta2') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16">
      <h2 class="text-3xl md:text-4xl text-center mb-10">{{ t('occasions.title') }}</h2>
      <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <li v-for="o in occasions" :key="o" class="bg-white rounded-3xl border border-blush p-8 text-center font-display text-xl">
          {{ t(`occasions.items.${o}`) }}
        </li>
      </ul>
    </section>
  </div>
</template>
