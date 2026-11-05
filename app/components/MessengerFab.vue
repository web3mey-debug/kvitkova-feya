<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="fixed bottom-5 right-4 z-30 flex flex-col gap-3">
    <a
      href="#" :aria-label="t('fab.telegram')"
      class="grid size-13 place-items-center rounded-full bg-graphite text-milk shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M21 4 3 11l6 2 2 6 3-4 5 3z" /></svg>
    </a>
    <a
      href="#" :aria-label="t('fab.call')"
      class="grid size-13 place-items-center rounded-full bg-blush text-graphite shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
    </a>
  </div>
</template>
