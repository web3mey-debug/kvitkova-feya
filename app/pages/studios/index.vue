<script setup lang="ts">
import { studios } from '~/data/studios'

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.studiosTitle'),
  description: () => t('seo.studiosDescription'),
  ogTitle: () => t('seo.studiosTitle'),
  ogDescription: () => t('seo.studiosDescription')
})
useSchemaOrg([defineBreadcrumb({ itemListElement: [{ name: t('nav.home'), item: '/' }, { name: t('nav.studios') }] })])
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-20 pt-10">
    <h1 class="mb-3 text-5xl md:text-6xl" v-reveal>{{ t('studios.title') }}</h1>
    <p class="mb-10 max-w-2xl text-muted" v-reveal="{ delay: 80 }">{{ t('studios.intro') }}</p>
    <StudioCards :studios="studios" />
  </div>
</template>
