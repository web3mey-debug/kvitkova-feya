<script setup lang="ts">
import { studios, telHref } from '~/data/studios'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer id="contacts" class="bg-graphite text-milk">
    <div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-10 px-4 py-14">
      <div class="min-w-[220px] flex-1" v-reveal>
        <p class="mb-3 font-display text-3xl font-semibold">Квіткова Фея</p>
        <p class="eyebrow !text-[11px]">{{ t('footer.tagline') }}</p>
      </div>
      <div class="min-w-[200px] flex-1 space-y-1 text-[15px]" v-reveal="{ delay: 100 }">
        <p class="mb-2 font-semibold">{{ t('footer.contacts') }}</p>
        <p v-for="s in studios" :key="s.slug">
          <NuxtLink :to="localePath(`/studios/${s.slug}`)" class="hover:underline">{{ t(`studios.cities.${s.slug}`) }}</NuxtLink>
          <template v-if="s.displayPhone"> · <a :href="telHref(s.displayPhone)" class="hover:underline">{{ s.displayPhone }}</a></template>
        </p>
      </div>
      <div class="min-w-[200px] flex-1 space-y-1 text-[15px]" v-reveal="{ delay: 200 }">
        <p class="mb-2 font-semibold">{{ t('footer.write') }}</p>
        <template v-for="s in studios" :key="s.slug">
          <a :href="s.instagramUrl" target="_blank" rel="noopener" class="block hover:underline">Instagram · {{ t(`studios.cities.${s.slug}`) }}</a>
          <a v-if="s.telegramUrl" :href="s.telegramUrl" target="_blank" rel="noopener" class="block hover:underline">Telegram · {{ t(`studios.cities.${s.slug}`) }}</a>
        </template>
      </div>
    </div>
    <div class="border-t border-white/15 px-4 py-5 text-center text-[13px] text-[#d6cdd0]">
      © {{ new Date().getFullYear() }} Квіткова Фея · {{ t('footer.rights') }}
    </div>
  </footer>
</template>
