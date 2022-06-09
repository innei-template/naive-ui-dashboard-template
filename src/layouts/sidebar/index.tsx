import $RouterView from 'layouts/router-view'
import { NLayoutContent } from 'naive-ui'
import { defineComponent, watchEffect } from 'vue'
import { useStoreRef } from '~/hooks/use-store-ref'
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
    return () => (
      <div class={styles['root']}>
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
            left: !collapse.value ? sidebarWidth.value + 'px' : '100px',
          }}
        >
          <$RouterView />
        </NLayoutContent>
      </div>
    )
  },
})
