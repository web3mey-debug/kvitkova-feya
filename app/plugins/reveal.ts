import type { DirectiveBinding } from 'vue'

type RevealValue = { delay?: number; variant?: 'up' | 'left' | 'right' | 'zoom' } | number | undefined

function parse(v: RevealValue) {
  if (typeof v === 'number') return { delay: v, variant: 'up' }
  return { delay: v?.delay ?? 0, variant: v?.variant ?? 'up' }
}

/**
 * v-reveal — плавное появление при прокрутке (IntersectionObserver).
 * В SSR-разметку попадает только атрибут data-reveal; скрывает элемент CSS-правило
 * `.js [data-reveal]`, поэтому без JavaScript контент остаётся видимым.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps(binding: DirectiveBinding<RevealValue>) {
      const { delay, variant } = parse(binding.value)
      return { 'data-reveal': variant, style: delay ? `--d:${delay}ms` : undefined }
    },
    mounted(el: HTMLElement, binding: DirectiveBinding<RevealValue>) {
      const { delay, variant } = parse(binding.value)
      el.setAttribute('data-reveal', variant)
      if (delay) el.style.setProperty('--d', `${delay}ms`)

      if (!('IntersectionObserver' in window)) {
        el.classList.add('is-in')
        return
      }
      observer ||= new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-in')
              observer?.unobserve(e.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    }
  })
})
