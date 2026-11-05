<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const scrolled = ref(false)
const progress = ref(0)
const open = ref(false)

function onScroll() {
  const y = window.scrollY
  scrolled.value = y > 24
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, y / max) : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})

watch(open, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
watch(() => route.fullPath, () => { open.value = false })

const home = (hash: string) => ({ path: localePath('/'), hash })
const links = computed(() => [
  { key: 'catalog', to: localePath('/catalog') },
  { key: 'occasions', to: home('#occasions') },
  { key: 'events', to: home('#events') },
  { key: 'delivery', to: home('#delivery') },
  { key: 'contacts', to: home('#contacts') }
])
const langs = computed(() => (locales.value as { code: 'uk' | 'en' }[]))
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-all duration-500"
    :class="scrolled ? 'bg-milk/85 backdrop-blur-md shadow-[0_8px_30px_-20px_rgb(43_43_43/0.35)]' : 'bg-milk'"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-500" :class="scrolled ? 'h-14' : 'h-20'">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-3" aria-label="Квіткова Фея">
        <span
          class="grid place-items-center rounded-full bg-blush font-display text-xl font-semibold transition-all duration-500"
          :class="scrolled ? 'size-9' : 'size-12'"
        >КФ</span>
        <span class="whitespace-nowrap font-display text-lg font-semibold sm:text-2xl">Квіткова Фея</span>
      </NuxtLink>

      <nav :aria-label="t('nav.main')" class="hidden items-center gap-8 text-sm lg:flex">
        <NuxtLink
          v-for="l in links" :key="l.key" :to="l.to"
          class="relative py-1 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-graphite after:transition-transform after:duration-300 hover:after:scale-x-100"
        >{{ t(`nav.${l.key}`) }}</NuxtLink>
      </nav>

      <div class="flex items-center gap-4 text-sm">
        <div class="hidden items-center gap-2 sm:flex" role="group" aria-label="Language">
          <NuxtLink
            v-for="l in langs" :key="l.code" :to="switchLocalePath(l.code)"
            :aria-current="l.code === locale ? 'true' : undefined"
            :class="l.code === locale ? 'font-semibold' : 'opacity-60 hover:opacity-100'"
          >{{ l.code.toUpperCase() }}</NuxtLink>
        </div>
        <NuxtLink :to="home('#order')" class="btn btn-dark hidden !min-h-11 !px-6 !text-sm sm:inline-flex">{{ t('common.order') }}</NuxtLink>
        <button
          type="button" class="grid size-11 place-items-center rounded-full border border-blush bg-white lg:hidden"
          :aria-label="open ? t('nav.menuClose') : t('nav.menuOpen')" :aria-expanded="open" aria-controls="mobile-menu"
          @click="open = !open"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <path v-if="!open" d="M3 6h14M3 10h14M3 14h14" />
            <path v-else d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </div>

    <!-- прогресс прокрутки -->
    <div class="absolute inset-x-0 bottom-0 h-0.5 bg-transparent" aria-hidden="true">
      <div class="h-full origin-left bg-blush-deep" :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <!-- мобильное меню -->
    <Transition
      enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in" leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="open" id="mobile-menu" class="absolute inset-x-0 top-full h-[calc(100dvh-100%)] bg-milk px-4 pb-10 pt-4 lg:hidden">
        <nav :aria-label="t('nav.main')" class="flex flex-col">
          <NuxtLink
            v-for="l in links" :key="l.key" :to="l.to"
            class="border-b border-blush py-4 font-display text-3xl" @click="open = false"
          >{{ t(`nav.${l.key}`) }}</NuxtLink>
        </nav>
        <div class="mt-8 flex items-center justify-between">
          <div class="flex gap-4 text-sm">
            <NuxtLink
              v-for="l in langs" :key="l.code" :to="switchLocalePath(l.code)"
              :class="l.code === locale ? 'font-semibold' : 'opacity-60'"
            >{{ l.code.toUpperCase() }}</NuxtLink>
          </div>
          <NuxtLink :to="home('#order')" class="btn btn-dark" @click="open = false">{{ t('common.order') }}</NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
