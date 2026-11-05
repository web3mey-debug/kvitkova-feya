<script setup lang="ts">
const localePath = useLocalePath()
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const head = useLocaleHead({ seo: true })

useHead({
  htmlAttrs: { lang: () => head.value.htmlAttrs?.lang },
  link: () => head.value.link || [],
  meta: () => head.value.meta || []
})
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:p-3 focus:bg-white">Skip to content</a>
    <header class="bg-milk/90 backdrop-blur sticky top-0 z-20 border-b border-blush">
      <div class="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <NuxtLink :to="localePath('/')" class="font-display text-2xl" aria-label="Квіткова Фея">КФ</NuxtLink>
        <nav aria-label="Main" class="hidden md:flex gap-8 text-sm">
          <NuxtLink :to="localePath('/')">{{ t('nav.catalog') }}</NuxtLink>
          <NuxtLink :to="localePath('/')">{{ t('nav.events') }}</NuxtLink>
          <NuxtLink :to="localePath('/')">{{ t('nav.delivery') }}</NuxtLink>
          <NuxtLink :to="localePath('/')">{{ t('nav.contacts') }}</NuxtLink>
        </nav>
        <div class="flex gap-3 text-sm">
          <template v-for="l in locales" :key="typeof l === 'string' ? l : l.code">
            <NuxtLink
              v-if="typeof l !== 'string'"
              :to="switchLocalePath(l.code)"
              :aria-current="l.code === locale ? 'true' : undefined"
              :class="l.code === locale ? 'font-semibold' : 'opacity-70'"
            >{{ l.code.toUpperCase() }}</NuxtLink>
          </template>
        </div>
      </div>
    </header>
    <main id="main" class="flex-1"><slot /></main>
    <footer class="border-t border-blush py-8 text-center text-sm">
      <p class="eyebrow mb-2">Квіткова Фея</p>
      <p>© {{ new Date().getFullYear() }} · {{ t('footer.rights') }}</p>
    </footer>
  </div>
</template>
