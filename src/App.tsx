import {
  GlobalThemeOverrides,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  darkTheme,
  dateZhCN,
  useMessage,
  useNotification,
  zhCN,
} from 'naive-ui'
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useStoreRef } from './hooks/use-store-ref'
import { useUIStore } from './stores/ui'
import { useUserStore } from './stores/user'

const Root = defineComponent({
  name: 'Home',

  setup() {
    const { fetchUser } = useStoreRef(useUserStore)

    onMounted(() => {
      window.message = useMessage()
      window.notification = useNotification()

      fetchUser()
    })

    return () => {
      return <RouterView />
    }
  },
})

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'var(--theme-color)',
    primaryColorHover: 'var(--theme-hover-color)',
    primaryColorPressed: 'var(--theme-active-color)',
    primaryColorSuppl: 'var(--theme-suppl-color)',
  },
}

const App = defineComponent({
  setup() {
    const { isDark, naiveUIDark } = useStoreRef(useUIStore)
    return () => (
      <NConfigProvider
        locale={zhCN}
        dateLocale={dateZhCN}
        themeOverrides={themeOverrides}
        theme={naiveUIDark.value ? darkTheme : isDark.value ? darkTheme : null}
      >
        <NNotificationProvider>
          <NMessageProvider>
            <NDialogProvider>
              <Root />
            </NDialogProvider>
          </NMessageProvider>
        </NNotificationProvider>
      </NConfigProvider>
    )
  },
})

// eslint-disable-next-line import/no-default-export
export default App
