<script setup lang="ts">
const { t } = useI18n()
const head = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  link: () => head.value.link || [],
  meta: () => head.value.meta || []
})
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">{{ t('nav.skip') }}</a>
    <AppHeader />
    <main id="main" class="flex-1"><slot /></main>
    <AppFooter />
    <MessengerFab />
  </div>
</template>
