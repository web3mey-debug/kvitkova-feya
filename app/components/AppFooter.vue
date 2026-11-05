<script setup lang="ts">
const { t } = useI18n()
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
        <p>{{ t('footer.phone') }}</p>
        <p>{{ t('footer.address') }}</p>
        <p>{{ t('footer.hours') }}</p>
      </div>
      <div class="min-w-[200px] flex-1 space-y-1 text-[15px]" v-reveal="{ delay: 200 }">
        <p class="mb-2 font-semibold">{{ t('footer.write') }}</p>
        <a href="#" class="block hover:underline">Telegram</a>
        <a href="#" class="block hover:underline">Viber</a>
        <a href="#" class="block hover:underline">Instagram</a>
      </div>
    </div>
    <div class="border-t border-white/15 px-4 py-5 text-center text-[13px] text-[#d6cdd0]">
      © {{ new Date().getFullYear() }} Квіткова Фея · {{ t('footer.rights') }}
    </div>
  </footer>
</template>
