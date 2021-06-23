import QProgress from 'qier-progress'
import configs from '../../configs.json'
import { router } from './router'
export const progress = new QProgress({
  colorful: false,
  color: configs.progressbarColor,
})
const title = configs.title

router.beforeEach(async (to) => {
  progress.start()
  if (to.meta.isPublic) {
    return
  } else {
    // TODO auth
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
