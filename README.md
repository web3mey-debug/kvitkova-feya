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

## Студії та соцмережі
- Список студій, ніки Instagram/Telegram і контакти: `app/data/studios.json` (телефон/адресу/графік можна вписати вручну — вони мають пріоритет над даними з Telegram).
- **Telegram** (автоматично): `npm run sync:telegram` читає публічні веб-версії каналів `t.me/s/<канал>`, пише `app/data/social/<студія>.telegram.json` і завантажує фото в `public/social/tg/`. У GitHub Actions синк запускається перед кожною збіркою і за розкладом (кожні 6 годин). Помилка мережі не ламає збірку — залишаються попередні дані. Перевірка парсера: `npm run test:telegram`.
- **Instagram** (вручну): фото додаються у `app/data/instagram.json` (`studio`, `image`, `caption`, `url`). Автоматичний парсинг Instagram не використовується: це порушує правила сервісу і ненадійно; офіційний варіант — Instagram API з токеном власника акаунта.
- Сторінки: `/studios`, `/studios/kyiv`, `/studios/boryspil`, `/studios/shchaslyve`.
