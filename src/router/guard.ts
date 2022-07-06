import { API_URL } from 'constants/env'
import QProgress from 'qier-progress'

import { configs } from '../configs'
// import { RESTManager } from '../utils/rest'
import { router } from './router'

export const progress = new QProgress({ colorful: false, color: '#1a9cf3' })
const title = configs.title

router.beforeEach(async (to) => {
  if (to.path === '/setup-api') {
    return
  }

  if (!API_URL) {
    return '/setup-api'
  }

  progress.start()

  if (to.meta.isPublic || to.fullPath.startsWith('/dev')) {
    return
  } else {
    // TODO
    // const { ok } = await RESTManager.api('master')('check_logged').get<{
    //   ok: number
    // }>()
    // if (!ok) {
    //   return `/login?from=${encodeURI(to.fullPath)}`
    // }
    return
  }
})

router.afterEach((to, _) => {
  document.title = getPageTitle(to?.meta.title as any)
  progress.finish()
})

router.onError(() => {
  progress.finish()
})

function getPageTitle(pageTitle?: string | null) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
