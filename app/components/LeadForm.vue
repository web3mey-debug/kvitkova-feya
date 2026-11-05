<script setup lang="ts">
const props = defineProps<{ context?: string; compact?: boolean }>()
const { t } = useI18n()

const name = ref('')
const phone = ref('+380')
const comment = ref('')
const honeypot = ref('') // скрытое поле-ловушка для ботов
const errors = reactive({ name: false, phone: false })
const state = ref<'idle' | 'sending' | 'done'>('idle')

// +380 XX XXX XX XX
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, '')
  if (!d.startsWith('380')) d = '380' + d.replace(/^0+|^38/, '')
  d = d.slice(0, 12)
  const p = [d.slice(0, 3), d.slice(3, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)].filter(Boolean)
  return '+' + p.join(' ')
}
const onPhone = (e: Event) => { phone.value = formatPhone((e.target as HTMLInputElement).value) }

async function submit() {
  errors.name = name.value.trim().length < 2
  errors.phone = phone.value.replace(/\D/g, '').length !== 12
  if (errors.name || errors.phone || honeypot.value) return
  state.value = 'sending'
  // TODO: отправка заявки (Telegram-бот / email / CRM) через серверный маршрут или внешний API.
  // Сейчас — заглушка без сетевого запроса.
  await new Promise((r) => setTimeout(r, 700))
  state.value = 'done'
}
</script>

<template>
  <form class="flex flex-col gap-4" novalidate @submit.prevent="submit">
    <p v-if="state === 'done'" role="status" class="rounded-2xl bg-blush px-5 py-4 font-medium">{{ t('form.success') }}</p>
    <template v-else>
      <label class="flex flex-col gap-1.5 text-sm font-medium">
        {{ t('form.name') }}
        <input
          v-model="name" type="text" autocomplete="name" :placeholder="t('form.namePlaceholder')"
          :aria-invalid="errors.name" :aria-describedby="errors.name ? 'err-name' : undefined"
          class="min-h-12 rounded-2xl border-[1.5px] border-[#cdbcc0] bg-milk px-4 text-[15px] transition focus:border-graphite"
        >
        <span v-if="errors.name" id="err-name" class="text-[13px] text-[#9b2c4a]">{{ t('form.errorName') }}</span>
      </label>
      <label class="flex flex-col gap-1.5 text-sm font-medium">
        {{ t('form.phone') }}
        <input
          :value="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+380 XX XXX XX XX"
          :aria-invalid="errors.phone" :aria-describedby="errors.phone ? 'err-phone' : undefined"
          class="min-h-12 rounded-2xl border-[1.5px] border-[#cdbcc0] bg-milk px-4 text-[15px] transition focus:border-graphite"
          @input="onPhone"
        >
        <span v-if="errors.phone" id="err-phone" class="text-[13px] text-[#9b2c4a]">{{ t('form.errorPhone') }}</span>
      </label>
      <label v-if="!props.compact" class="flex flex-col gap-1.5 text-sm font-medium">
        {{ t('form.comment') }}
        <textarea v-model="comment" rows="3" class="rounded-2xl border-[1.5px] border-[#cdbcc0] bg-milk px-4 py-3 text-[15px] transition focus:border-graphite" />
      </label>
      <input v-model="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="absolute -left-[9999px] size-0 opacity-0">
      <button type="submit" class="btn btn-dark w-full !min-h-13" :disabled="state === 'sending'">
        {{ state === 'sending' ? t('form.sending') : (context || t('form.submit')) }}
      </button>
      <p class="text-center text-[13px] text-muted">{{ t('form.privacy') }}</p>
    </template>
  </form>
</template>
