import { configs } from 'configs'
import {
  dateZhCN,
  GlobalThemeOverrides,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  useMessage,
  useNotification,
  zhCN,
} from 'naive-ui'
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { useStoreRef } from './hooks/use-store-ref'
import { UIStore } from './stores/ui'
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

export default App
