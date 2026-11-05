/**
 * Путь к файлу из public/ с учётом app.baseURL
 * (нужно, когда сайт лежит не в корне домена, например на GitHub Pages: /kvitkova-feya/).
 */
export function useAsset() {
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return (path: string) => (path.startsWith('/') ? base + path : path)
}
