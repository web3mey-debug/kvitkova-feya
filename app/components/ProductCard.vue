<script setup lang="ts">
import type { Product } from '~/data/products'

const props = defineProps<{ product: Product; eager?: boolean }>()
const { t } = useI18n()
const localePath = useLocalePath()
const to = computed(() => localePath(`/catalog/${props.product.slug}`))
const name = computed(() => t(`products.items.${props.product.slug}.name`))
</script>

<template>
  <article class="card-lift group overflow-hidden rounded-3xl border border-blush bg-white">
    <NuxtLink :to="to" class="zoom-img block overflow-hidden" :aria-label="name">
      <img
        :src="product.art" width="800" height="1000" :alt="name"
        :loading="eager ? 'eager' : 'lazy'" decoding="async" class="aspect-[4/5] h-auto w-full object-cover"
      >
    </NuxtLink>
    <div class="p-5">
      <p class="mb-1.5 text-xs uppercase tracking-[0.12em] text-muted">{{ t(`tags.${product.tag}`) }}</p>
      <h3 class="mb-2 text-2xl">
        <NuxtLink :to="to" class="after:absolute after:inset-0">{{ name }}</NuxtLink>
      </h3>
      <p class="mb-4 text-[15px]">{{ t('common.priceFrom') }}</p>
      <span class="btn btn-line w-full !min-h-11 !text-sm group-hover:bg-graphite group-hover:text-white">{{ t('common.order') }}</span>
    </div>
  </article>
</template>

<style scoped>
article { position: relative; }
</style>
