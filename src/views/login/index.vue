<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStoreRef } from '../../hooks/use-store-ref'
import configs from '../../../configs.json'
import Avatar from '../../components/avatar/index.vue'
import ParallaxButtonVue from '../../components/button/parallax-button.vue'
import { UserModel } from '../../models/user'
import { useUserStore } from '../../stores/user'
import { RESTManager } from '../../utils/rest'

const bgUrl = configs.loginBg
export const LoginView = defineComponent({
  components: { Avatar, ParallaxButtonVue },
  setup() {
    const loaded = ref(false)
    const { user, updateToken } = useStoreRef(useUserStore)
    const router = useRouter()
    const input = ref<HTMLInputElement>(null!)
    onMounted(() => {
      const $$ = new Image()
      $$.src = bgUrl
      $$.onload = (e) => {
        loaded.value = true
      }
      input.value.focus()

      document.onkeydown = (e) => {
        input.value.focus()
      }
    })

    onUnmounted(() => {
      document.onkeydown = null
    })

    const toast = useMessage()

    const password = ref('')

    const handleLogin = async (e: Event) => {
      e.stopPropagation()
      try {
        if (!user.value || !user.value.username) {
          toast.error('主人信息无法获取')
          return
        }
        const res = await RESTManager.api.master.login.post<{
          token: string & UserModel
        }>({
          data: {
            username: user.value?.username,
            password: password.value,
          },
        })
        updateToken(res.token)

        router.push('/dashboard')
        toast.success('欢迎回来')
      } catch (e) {
        toast.error('登陆失败')
      }
    }

    return {
      // bgUrl: loaded.value ? bgUrl : '',
      bgUrl,
      loaded,
      user,
      password,
      handleLogin,
      input,
    }
  },
})

export default LoginView
</script>

<template>
  <div>
    <div
      class="bg transition-opacity duration-700"
      :style="{ backgroundImage: `url(${bgUrl})`, opacity: loaded ? 1 : 0 }"
    />

    <div class="wrapper">
      <Avatar :src="user?.avatar" :size="80" />
      <form action="#" @submit.prevent="handleLogin">
        <div class="input-wrap">
          <input ref="input" v-model="password" type="password" autofocus />
          <div class="blur" />
        </div>
        <ParallaxButtonVue
          title="登陆"
          class="p-button-raised p-button-rounded"
          @click="handleLogin"
        />
      </form>

      <!-- <Avatar :size="80" src="https://resume.innei.ren/avatar.ec3d4d8d.png" /> -->
    </div>
  </div>
</template>

<style scoped="">
@import './index.css';
</style>
