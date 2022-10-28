import $RouterView from 'layouts/router-view'
import { NLayoutContent } from 'naive-ui'
import { defineComponent, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'

import { useStoreRef } from '~/hooks/use-store-ref'
import { RESTManager } from '~/utils'

import { Sidebar } from '../../components/sidebar'
import { useUIStore } from '../../stores/ui'
import styles from './index.module.css'

export const SidebarLayout = defineComponent({
  name: 'SidebarLayout',

  setup() {
    const ui = useStoreRef(useUIStore)

    const collapse = ui.sidebarCollapse
    watchEffect(() => {
      // console.log(ui.viewport)
      collapse.value = ui.viewport.value.mobile ? true : false
    })

    const sidebarWidth = ui.sidebarWidth

    const isInApiDebugMode =
      localStorage.getItem('__api') ||
      localStorage.getItem('__gateway') ||
      new URLSearchParams(location.search).get('__api') ||
      new URLSearchParams(location.search).get('__gateway')

    const isLaptop = computed(
      () => ui.viewport.value.mobile || ui.viewport.value.pad,
    )

    return () => (
      <div class={styles['root']}>
        {isInApiDebugMode && (
          <div
            class="h-[40px] fixed top-0 left-0 right-0 bg-dark-800 z-2 text-gray-400 flex items-center transition-all duration-300 whitespace-pre"
            style={{
              paddingLeft: !collapse.value ? '270px' : '120px',
            }}
          >
            Current in api custom pointing mode, please check:{' '}
            <RouterLink to={'/setup-api'}>setup-api</RouterLink>. Endpoint:{' '}
            {RESTManager.endpoint}
          </div>
        )}
        <Sidebar
          collapse={collapse.value}
          width={sidebarWidth.value}
          onCollapseChange={(s) => {
            collapse.value = s
          }}
        />

        <NLayoutContent
          embedded
          nativeScrollbar={false}
          class={styles['content']}
          style={{
            left: !collapse.value ? `${sidebarWidth.value}px` : '100px',
            pointerEvents: isLaptop.value && !collapse.value ? 'none' : 'auto',
            top: isInApiDebugMode && '40px',
          }}
        >
          <$RouterView />
        </NLayoutContent>
      </div>
    )
  },
})
