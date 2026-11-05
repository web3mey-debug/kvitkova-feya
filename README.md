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

## Что сделано
- Главная: слайдер-баннер (3 слайда, автопрокрутка, свайп, клавиатура, пауза при наведении), бегущая лента, карусель букетов, блок «Букет від флориста» с формой, шаги, о студии, отзывы, FAQ.
- Каталог с фильтром по поводу и карточки товаров (`/catalog/<slug>`).
- Анимации при прокрутке (`v-reveal`, `app/plugins/reveal.ts`): без JS контент остаётся видимым; `prefers-reduced-motion` отключает движение.
- Иллюстрации (SVG) генерируются скриптом: `node tools/gen-art.mjs public` — временные, до реальной фотосъёмки.

## TODO (нужны данные заказчика)
- Реальные фото, цены (`Offer` в разметке `Product`), тексты, отзывы, контакты, адрес и часы работы (`Florist`).
- Отправка заявок: сейчас `LeadForm.vue` — заглушка без сетевого запроса (Telegram-бот / email / CRM).
- Ссылки мессенджеров и соцсетей, настоящий домен в `NUXT_PUBLIC_SITE_URL`.
- Разметка `FAQPage` — после написания ответов.

## Публичное превью (Netlify / Cloudflare Pages)
Репозиторий можно подключить к хостингу без доп. настроек в коде:
- **Netlify:** Add new site → Import from Git → выбрать репозиторий. Настройки возьмутся из `netlify.toml`. Каждая ветка и PR получают свой адрес превью.
- **Cloudflare Pages:** Build command `npm run generate`, output directory `.output/public`, переменная `NODE_VERSION=22`.
