<script setup lang="ts">
// Ставим класс .js до гидратации: только тогда CSS прячет элементы с v-reveal.
// Без JS (и для роботов) весь контент остаётся видимым.
useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  script: [{ innerHTML: "document.documentElement.classList.add('js')", tagPosition: 'head' }]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
