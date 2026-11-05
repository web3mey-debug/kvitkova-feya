<script setup lang="ts">
import { occasionList } from '~/data/products'

const { t } = useI18n()
const localePath = useLocalePath()
const asset = useAsset()

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
    description: t('seo.description')
    // TODO: заполнить данными заказчика — address, telephone, openingHours, geo, areaServed, sameAs
  }),
  defineWebSite({ name: 'Квіткова Фея' })
])

const budgets = ['1000', '1500', '2500', '4000'] as const
const budget = ref<(typeof budgets)[number]>('1500')
const steps = ['1', '2', '3'] as const
const faq = ['1', '2', '3', '4'] as const
</script>

<template>
  <div>
    <HeroSlider />
    <MarqueeBand />

    <!-- Приводи -->
    <section id="occasions" class="mx-auto max-w-6xl px-4 pb-10 pt-20">
      <h2 class="mb-3 text-center text-4xl md:text-5xl" v-reveal>{{ t('occasions.title') }}</h2>
      <p class="mb-10 text-center text-muted" v-reveal="{ delay: 80 }">{{ t('occasions.subtitle') }}</p>
      <ul class="grid grid-cols-2 gap-4 md:grid-cols-3">
        <li v-for="(o, i) in occasionList" :key="o" v-reveal="{ delay: i * 70, variant: 'zoom' }">
          <NuxtLink
            :to="{ path: localePath('/catalog'), query: { occasion: o } }"
            class="card-lift group flex h-full flex-col items-center justify-center gap-4 rounded-[28px] border border-blush bg-white px-4 py-9 text-center font-display text-xl sm:text-2xl"
          >
            <svg class="text-blush-deep transition-transform duration-700 group-hover:rotate-[72deg] group-hover:scale-110" width="44" height="44" viewBox="0 0 44 44" fill="currentColor" aria-hidden="true">
              <ellipse cx="22" cy="10" rx="5.5" ry="9" /><ellipse cx="22" cy="34" rx="5.5" ry="9" />
              <ellipse cx="10" cy="22" rx="9" ry="5.5" /><ellipse cx="34" cy="22" rx="9" ry="5.5" opacity=".7" />
              <circle cx="22" cy="22" r="4" fill="#2B2B2B" />
            </svg>
            {{ t(`occasions.items.${o}`) }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- Популярные букеты (карусель) -->
    <section id="catalog" class="mx-auto max-w-6xl px-4 py-16">
      <div class="mb-2 flex flex-wrap items-end justify-between gap-4">
        <h2 class="text-4xl md:text-5xl" v-reveal>{{ t('catalog.popular') }}</h2>
        <NuxtLink :to="localePath('/catalog')" class="border-b-[1.5px] border-graphite pb-0.5 text-sm font-semibold" v-reveal="{ delay: 80 }">{{ t('catalog.all') }} →</NuxtLink>
      </div>
      <ProductCarousel />
    </section>

    <!-- Букет від флориста -->
    <section id="order" class="mx-auto max-w-6xl px-4 py-10">
      <div class="grid gap-10 rounded-[36px] bg-sage px-6 py-12 md:grid-cols-2 md:px-14 md:py-16" v-reveal="{ variant: 'zoom' }">
        <div class="text-center md:text-left">
          <h2 class="mb-4 text-4xl md:text-5xl">{{ t('florist.title') }}</h2>
          <p class="mb-8 max-w-md leading-relaxed md:mx-0">{{ t('florist.text') }}</p>
          <p id="budget-label" class="mb-3 text-sm font-semibold">{{ t('florist.budget') }}</p>
          <div role="group" aria-labelledby="budget-label" class="flex flex-wrap justify-center gap-3 md:justify-start">
            <button
              v-for="b in budgets" :key="b" type="button" :aria-pressed="budget === b"
              class="min-h-12 cursor-pointer rounded-full border-[1.5px] border-graphite px-6 text-[15px] font-semibold transition-all duration-300"
              :class="budget === b ? 'bg-graphite text-white -translate-y-0.5' : 'bg-transparent hover:bg-white/40'"
              @click="budget = b"
            >{{ t(`florist.budgets.${b}`) }}</button>
          </div>
        </div>
        <div class="rounded-[28px] bg-white p-6 md:p-8">
          <h3 class="mb-4 text-3xl">{{ t('form.title') }}</h3>
          <LeadForm />
        </div>
      </div>
    </section>

    <!-- Как заказать -->
    <section id="how" class="mx-auto max-w-6xl px-4 py-20">
      <h2 class="mb-12 text-center text-4xl md:text-5xl" v-reveal>{{ t('steps.title') }}</h2>
      <ol class="grid gap-10 md:grid-cols-3">
        <li v-for="(s, i) in steps" :key="s" class="text-center" v-reveal="{ delay: i * 140 }">
          <div class="mx-auto mb-5 grid size-20 place-items-center rounded-full bg-blush font-display text-4xl font-semibold">{{ s }}</div>
          <h3 class="mb-2 text-2xl">{{ t(`steps.items.${s}.title`) }}</h3>
          <p class="mx-auto max-w-xs leading-relaxed text-muted">{{ t(`steps.items.${s}.text`) }}</p>
        </li>
      </ol>
    </section>

    <!-- О студии -->
    <section class="bg-blush">
      <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-12 px-4 py-20">
        <div class="min-w-0 flex-1 basis-[340px]" v-reveal="{ variant: 'left' }">
          <div class="mx-auto aspect-square max-w-[420px] overflow-hidden rounded-full bg-milk">
            <img :src="asset('/slides/bouquet.svg')" width="1000" height="1000" alt="" loading="lazy" decoding="async" class="size-full scale-110 object-cover">
          </div>
        </div>
        <div class="min-w-0 flex-1 basis-[400px]" v-reveal="{ variant: 'right' }">
          <h2 class="mb-5 text-4xl md:text-5xl">{{ t('about.title') }}</h2>
          <p class="mb-4 leading-[1.75]">{{ t('about.p1') }}</p>
          <p class="leading-[1.75]">{{ t('about.p2') }}</p>
        </div>
      </div>
    </section>

    <!-- Отзывы -->
    <section class="mx-auto max-w-6xl px-4 pb-10 pt-20">
      <h2 class="mb-10 text-center text-4xl md:text-5xl" v-reveal>{{ t('reviews.title') }}</h2>
      <ul class="grid gap-6 md:grid-cols-3">
        <li v-for="i in 3" :key="i" v-reveal="{ delay: i * 100 }">
          <figure class="card-lift h-full rounded-3xl border border-blush bg-white p-7">
            <svg class="mb-3 text-blush-deep" width="32" height="24" viewBox="0 0 32 24" fill="currentColor" aria-hidden="true"><path d="M0 24V13C0 5 4 1 12 0v4C8 5 6 7 6 11h6v13H0Zm18 0V13c0-8 4-12 12-13v4c-4 1-6 3-6 7h6v13H18Z" /></svg>
            <blockquote class="mb-4 leading-relaxed">{{ t('reviews.text') }}</blockquote>
            <figcaption class="text-sm text-muted">{{ t('reviews.author') }}</figcaption>
          </figure>
        </li>
      </ul>
    </section>

    <!-- Доставка / оплата / события -->
    <section id="delivery" class="mx-auto max-w-6xl px-4 py-10">
      <div class="grid gap-6 md:grid-cols-3">
        <div v-reveal="{ delay: 0 }" class="rounded-3xl border border-blush bg-white p-8">
          <h3 class="mb-3 text-3xl">{{ t('info.delivery.title') }}</h3>
          <p class="leading-relaxed text-muted">{{ t('info.delivery.text') }}</p>
        </div>
        <div v-reveal="{ delay: 120 }" class="rounded-3xl border border-blush bg-white p-8">
          <h3 class="mb-3 text-3xl">{{ t('info.payment.title') }}</h3>
          <p class="leading-relaxed text-muted">{{ t('info.payment.text') }}</p>
        </div>
        <div id="events" v-reveal="{ delay: 240 }" class="rounded-3xl border border-blush bg-white p-8">
          <h3 class="mb-3 text-3xl">{{ t('info.events.title') }}</h3>
          <p class="leading-relaxed text-muted">{{ t('info.events.text') }}</p>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mx-auto max-w-3xl px-4 py-16">
      <h2 class="mb-8 text-center text-4xl md:text-5xl" v-reveal>{{ t('faq.title') }}</h2>
      <div v-reveal="{ delay: 100 }">
        <details v-for="f in faq" :key="f" class="group border-b border-blush py-5">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold">
            {{ t(`faq.items.${f}.q`) }}
            <span class="grid size-8 shrink-0 place-items-center rounded-full bg-blush transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p class="mt-3 leading-relaxed text-muted">{{ t(`faq.items.${f}.a`) }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
