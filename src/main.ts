import { createApp } from 'vue'
import App from './App'
import './index.css'
import { router } from './router'
import 'virtual:windi.css'
import { piniaStore } from './stores'
const app = createApp(App)

app.use(router)
app.use(piniaStore)
app.mount('#app')

if (__DEV__) {
  window.app = app
}
