import { defineComponent, onMounted } from 'vue'
import {
  GlobalThemeOverrides,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  useMessage,
  useNotification,
} from 'naive-ui'
import { RouterView } from 'vue-router'
import { UIStore } from './stores/ui'
import { UserStore } from './stores/user'
import { useInjector, useProviders } from './utils/deps-injection'
import { zhCN, dateZhCN } from 'naive-ui'
import { configs } from 'configs'

const Root = defineComponent({
  name: 'Home',

  setup() {
    const { fetchUser } = useInjector(UserStore)

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
    useProviders(UIStore, UserStore)

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
