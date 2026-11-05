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
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#F4CDD6" stroke-width="1.3" aria-hidden="true">
            <circle cx="11" cy="11" r="2" />
            <ellipse cx="11" cy="5" rx="2.4" ry="4" /><ellipse cx="11" cy="17" rx="2.4" ry="4" />
            <ellipse cx="5" cy="11" rx="4" ry="2.4" /><ellipse cx="17" cy="11" rx="4" ry="2.4" />
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>
