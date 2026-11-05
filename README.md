# Квіткова Фея — сайт студії флористики

Промо-сайт на **Nuxt 4** (статична генерація) + Tailwind CSS 4. Українська (основна) та англійська версії.

- ТЗ: [`docs/TZ.md`](docs/TZ.md)
- Дизайн-токени: `app/assets/css/main.css` (`@theme`)
- Тексти: `i18n/locales/*.json`

## Запуск
```bash
npm install
npm run dev       # розробка
npm run generate  # статична збірка в .output/public
```

Змінна `NUXT_PUBLIC_SITE_URL` задає домен для canonical, hreflang та sitemap.
