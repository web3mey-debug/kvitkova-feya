<script setup lang="ts">
const { t } = useI18n()
const keys = ['1', '2', '3', '4', '5', '6']
</script>

<template>
  <div class="marquee overflow-hidden border-y border-graphite/10 bg-graphite py-4 text-milk" aria-label="">
    <div class="marquee-track">
      <ul v-for="n in 2" :key="n" class="flex shrink-0 items-center" :aria-hidden="n === 2 ? 'true' : undefined">
        <li v-for="k in keys" :key="k" class="flex items-center whitespace-nowrap font-display text-2xl">
          <span class="px-8">{{ t(`marquee.${k}`) }}</span>
          <FlowerIcon :size="26" outline class="text-blush" />
        </li>
      </ul>
    </div>
  </div>
</template>
