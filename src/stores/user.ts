import { ref } from 'vue'
import { UserModel } from '../models/user'
import { getToken, setToken } from '../utils/auth'

export function UserStore() {
  const user = ref<UserModel | null>(null)
  const token = ref<string>('')

  const $token = getToken()
  if ($token) {
    token.value = $token
  }

  return {
    user,
    token,

    async fetchUser() {
      // TODO
      user.value = {
        avatar: 'https://avatars.githubusercontent.com/u/41265413?v=4',
        created: new Date('2021/06/21 19:00').toISOString(),
        id: '1',
        modified: new Date(),
        name: 'Innei',
        username: 'Innei',
      }
    },

    updateToken($token: string) {
      if ($token) {
        setToken($token, 7)
      }

      token.value = $token
    },
  }
}
