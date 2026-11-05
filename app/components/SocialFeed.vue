<script setup lang="ts">
import type { Studio } from '~/data/studios'

const props = defineProps<{ studio: Studio }>()
const { t, locale } = useI18n()
const asset = useAsset()

const posts = computed(() => (props.studio.feed?.posts ?? []).slice(0, 6))
const insta = computed(() => props.studio.instagramPosts.slice(0, 9))

const fmt = computed(() => new Intl.DateTimeFormat(locale.value === 'uk' ? 'uk-UA' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))
const dateOf = (d: string | null) => (d ? fmt.value.format(new Date(d)) : '')
const excerpt = (s: string) => (s.length > 220 ? s.slice(0, 217).trimEnd() + '…' : s)
</script>

<template>
  <div class="space-y-16">
    <!-- Telegram -->
    <section v-if="studio.telegramUrl" aria-labelledby="tg-title">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id="tg-title" class="text-3xl md:text-4xl" v-reveal>{{ t('studios.telegramTitle') }}</h2>
        <a :href="studio.telegramUrl" target="_blank" rel="noopener" class="btn btn-line !min-h-11 !text-sm">{{ t('studios.followTg') }}</a>
      </div>
      <ul v-if="posts.length" class="grid gap-6 md:grid-cols-3">
        <li v-for="(p, i) in posts" :key="p.id" v-reveal="{ delay: (i % 3) * 90 }">
          <article class="card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-blush bg-white">
            <img v-if="p.image" :src="asset(p.image)" :alt="excerpt(p.text).slice(0, 80)" loading="lazy" decoding="async" class="aspect-[4/3] w-full object-cover">
            <div class="flex flex-1 flex-col p-5">
              <time v-if="p.date" :datetime="p.date" class="mb-2 text-xs uppercase tracking-[0.12em] text-muted">{{ dateOf(p.date) }}</time>
              <p class="mb-4 flex-1 whitespace-pre-line leading-relaxed">{{ excerpt(p.text) }}</p>
              <a :href="p.url" target="_blank" rel="noopener" class="text-sm font-semibold underline underline-offset-4">{{ t('studios.openPost') }}</a>
            </div>
          </article>
        </li>
      </ul>
      <p v-else class="rounded-3xl border border-blush bg-white p-6 text-muted">{{ t('studios.feedEmpty') }}</p>
    </section>

    <!-- Instagram (материалы добавляются вручную: app/data/instagram.json) -->
    <section aria-labelledby="ig-title">
      <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
        <h2 id="ig-title" class="text-3xl md:text-4xl" v-reveal>{{ t('studios.instagramTitle') }}</h2>
        <a :href="studio.instagramUrl" target="_blank" rel="noopener" class="btn btn-line !min-h-11 !text-sm">@{{ studio.instagram }}</a>
      </div>
      <ul v-if="insta.length" class="grid grid-cols-2 gap-3 md:grid-cols-3">
        <li v-for="(i, n) in insta" :key="i.image" v-reveal="{ delay: (n % 3) * 80, variant: 'zoom' }">
          <a :href="i.url || studio.instagramUrl" target="_blank" rel="noopener" class="zoom-img card-lift block overflow-hidden rounded-3xl">
            <img :src="asset(i.image)" :alt="i.caption || ''" loading="lazy" decoding="async" class="aspect-square w-full object-cover">
          </a>
        </li>
      </ul>
      <p v-else class="rounded-3xl border border-blush bg-white p-6 text-muted">{{ t('studios.instagramEmpty') }}</p>
    </section>
  </div>
</template>
