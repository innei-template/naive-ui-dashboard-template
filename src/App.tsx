import { configs } from 'configs'
import type { GlobalThemeOverrides } from 'naive-ui'
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  dateZhCN,
  useMessage,
  useNotification,
  zhCN,
} from 'naive-ui'
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useStoreRef } from './hooks/use-store-ref'
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
    primaryColor: configs.colors.primary.default ?? '#1a9cf3',
    primaryColorHover: configs.colors.primary.shallow ?? '#16aae7',
    primaryColorPressed: configs.colors.primary.deep ?? '#1188e8',
    primaryColorSuppl: configs.colors.primary.suppl ?? '#2980b9',
  },
}

const App = defineComponent({
  setup() {
    return () => (
      <NConfigProvider
        locale={zhCN}
        dateLocale={dateZhCN}
        themeOverrides={themeOverrides}
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
