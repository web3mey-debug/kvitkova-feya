import tailwindcss from '@tailwindcss/vite'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://kvitkova-feya.example'
// На подпути (GitHub Pages: /kvitkova-feya/) robots.txt модуль генерировать не может
const atRoot = !process.env.NUXT_APP_BASE_URL || process.env.NUXT_APP_BASE_URL === '/'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org'
  ],

  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },

  site: {
    url: siteUrl,
    name: 'Квіткова Фея',
    defaultLocale: 'uk'
  },

  i18n: {
    baseUrl: siteUrl,
    strategy: 'prefix_except_default',
    defaultLocale: 'uk',
    locales: [
      { code: 'uk', language: 'uk-UA', name: 'Українська', file: 'uk.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: false
  },

  image: {
    format: ['avif', 'webp'],
    quality: 80
  },

  robots: { robotsTxt: atRoot },

  schemaOrg: { identity: undefined },

  nitro: {
    prerender: { crawlLinks: true, routes: ['/', '/en', '/studios', '/studios/kyiv', '/studios/boryspil', '/studios/shchaslyve'] }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'uk' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#F4CDD6' }
      ]
    }
  }
})
