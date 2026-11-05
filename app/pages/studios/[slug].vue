<script setup lang="ts">
import { getStudio, telHref } from '~/data/studios'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const studio = getStudio(String(route.params.slug))
if (!studio) throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })

const city = computed(() => t(`studios.cities.${studio.slug}`))
const cityIn = computed(() => t(`studios.citiesIn.${studio.slug}`))
const mapUrl = computed(() => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${t('studios.mapQuery')} ${city.value}`)}`)

useSeoMeta({
  title: () => t('seo.studioTitle', { cityIn: cityIn.value }),
  description: () => t('seo.studioDescription', { city: city.value }),
  ogTitle: () => t('seo.studioTitle', { cityIn: cityIn.value }),
  ogDescription: () => t('seo.studioDescription', { city: city.value })
})

useSchemaOrg([
  defineLocalBusiness({
    '@type': 'Florist',
    name: `Квіткова Фея — ${t('studios.cities.' + studio.slug, {}, { locale: 'uk' })}`,
    telephone: studio.displayPhone ?? undefined,
    address: { addressLocality: t('studios.cities.' + studio.slug, {}, { locale: 'uk' }), addressCountry: 'UA', ...(studio.address ? { streetAddress: studio.address } : {}) },
    sameAs: [studio.instagramUrl, studio.telegramUrl].filter(Boolean) as string[]
    // TODO: openingHours, geo — когда заказчик подтвердит данные
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: t('nav.home'), item: '/' },
      { name: t('nav.studios'), item: '/studios' },
      { name: city.value }
    ]
  })
])
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-20 pt-6">
    <nav :aria-label="t('product.breadcrumb')" class="mb-6 text-[13px] text-muted">
      <NuxtLink :to="localePath('/')" class="hover:underline">{{ t('nav.home') }}</NuxtLink> /
      <NuxtLink :to="localePath('/studios')" class="hover:underline">{{ t('nav.studios') }}</NuxtLink> /
      <span class="text-graphite">{{ city }}</span>
    </nav>

    <header class="mb-12 rounded-[36px] bg-blush px-6 py-12 md:px-14 md:py-16" v-reveal="{ variant: 'zoom' }">
      <p class="eyebrow mb-3">{{ t('studios.eyebrow') }}</p>
      <h1 class="mb-4 text-5xl leading-none md:text-7xl">{{ t('studios.studioIn', { cityIn }) }}</h1>
      <p v-if="studio.feed?.description" class="max-w-2xl whitespace-pre-line leading-relaxed">{{ studio.feed.description }}</p>
    </header>

    <div class="mb-16 grid gap-10 md:grid-cols-[1fr_1fr]">
      <dl class="space-y-5 rounded-3xl border border-blush bg-white p-7" v-reveal="{ variant: 'left' }">
        <div>
          <dt class="mb-1 text-xs uppercase tracking-[0.12em] text-muted">{{ t('studios.phone') }}</dt>
          <dd class="text-xl font-semibold">
            <a v-if="studio.displayPhone" :href="telHref(studio.displayPhone)" class="underline underline-offset-4">{{ studio.displayPhone }}</a>
            <span v-else class="text-muted">{{ t('studios.tbd') }}</span>
          </dd>
        </div>
        <div>
          <dt class="mb-1 text-xs uppercase tracking-[0.12em] text-muted">{{ t('studios.address') }}</dt>
          <dd>
            <span v-if="studio.address">{{ studio.address }} · </span><span v-else class="text-muted">{{ t('studios.tbd') }} · </span>
            <a :href="mapUrl" target="_blank" rel="noopener" class="underline underline-offset-4">{{ t('studios.map') }}</a>
          </dd>
        </div>
        <div>
          <dt class="mb-1 text-xs uppercase tracking-[0.12em] text-muted">{{ t('studios.hours') }}</dt>
          <dd><span v-if="studio.hours">{{ studio.hours }}</span><span v-else class="text-muted">{{ t('studios.tbd') }}</span></dd>
        </div>
        <div class="flex flex-wrap gap-3 pt-2">
          <a :href="studio.instagramUrl" target="_blank" rel="noopener" class="btn btn-line !min-h-11 !text-sm">Instagram</a>
          <a v-if="studio.telegramUrl" :href="studio.telegramUrl" target="_blank" rel="noopener" class="btn btn-line !min-h-11 !text-sm">Telegram</a>
        </div>
      </dl>
      <div class="rounded-3xl border border-blush bg-white p-7" v-reveal="{ variant: 'right' }">
        <h2 class="mb-4 text-3xl">{{ t('form.title') }} — {{ city }}</h2>
        <LeadForm />
      </div>
    </div>

    <SocialFeed :studio="studio" />
  </div>
</template>
