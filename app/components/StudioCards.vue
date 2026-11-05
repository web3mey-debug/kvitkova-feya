<script setup lang="ts">
import { telHref, type Studio } from '~/data/studios'

defineProps<{ studios: Studio[] }>()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <ul class="grid gap-6 md:grid-cols-3">
    <li v-for="(s, i) in studios" :key="s.slug" v-reveal="{ delay: i * 120 }">
      <article class="card-lift relative flex h-full flex-col rounded-3xl border border-blush bg-white p-7">
        <FlowerIcon :size="44" class="mb-4 text-blush-deep" />
        <h3 class="mb-3 text-3xl">
          <NuxtLink :to="localePath(`/studios/${s.slug}`)" class="after:absolute after:inset-0">{{ t(`studios.cities.${s.slug}`) }}</NuxtLink>
        </h3>
        <p class="mb-5 flex-1 text-[15px] text-muted">
          <template v-if="s.displayPhone"><a :href="telHref(s.displayPhone)" class="relative z-10 font-semibold text-graphite underline underline-offset-4">{{ s.displayPhone }}</a></template>
          <template v-else>{{ t('studios.tbd') }}</template>
        </p>
        <div class="relative z-10 flex flex-wrap gap-2 text-sm">
          <a :href="s.instagramUrl" target="_blank" rel="noopener" class="rounded-full border border-graphite/40 px-4 py-2 hover:bg-graphite hover:text-white">Instagram</a>
          <a v-if="s.telegramUrl" :href="s.telegramUrl" target="_blank" rel="noopener" class="rounded-full border border-graphite/40 px-4 py-2 hover:bg-graphite hover:text-white">Telegram</a>
        </div>
      </article>
    </li>
  </ul>
</template>
