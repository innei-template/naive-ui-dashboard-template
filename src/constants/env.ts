export const API_URL = (() => {
  const url =
    parseUrlencode(new URLSearchParams(location.search).get('__api')) ||
    localStorage.getItem('__api') ||
    window.injectData.BASE_API ||
    (import.meta.env.VITE_APP_BASE_API as string) ||
    ''

  return url.endsWith('/') ? url.slice(0, -1) : url
})()
export const bgUrl =
  window.injectData.LOGIN_BG ||
  (import.meta.env.VITE_APP_LOGIN_BG as string) ||
  localStorage.getItem('LOGIN_BG') ||
  'https://fastly.jsdelivr.net/gh/mx-space/docs-images@master/images/chichi-1.jpeg'

function parseUrlencode(url: string | null) {
  return url ? decodeURIComponent(url) : null
}

export const WEB_URL: string =
  window.injectData.WEB_URL ||
  (import.meta.env.VITE_APP_WEB_URL as string) ||
  'http://localhost:2323'
