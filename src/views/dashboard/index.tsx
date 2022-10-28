import { ContentLayout } from 'layouts/content'
import { pick } from 'lodash-es'
import { NIcon as Icon , NButton, NH1, NP, NSpace, NText, useMessage } from 'naive-ui'
import { defineComponent, onBeforeMount, ref } from 'vue'
import Copy from '~icons/material-symbols/content-copy-outline'
import Refresh from '~icons/material-symbols/refresh-rounded'

export default defineComponent({
  setup() {
    const hitokoto = ref('')
    const message = useMessage()
    const fetchHitokoto = async () => {
      const json = await fetch('https://v1.hitokoto.cn/?c=d')
      const data = (await (json.json() as unknown)) as {
        hitokoto: string
        from: string
        from_who: string
        creator: string
      }
      const postfix = Object.values(
        pick(data, ['from', 'from_who', 'creator']),
      ).filter(Boolean)[0]
      hitokoto.value = data.hitokoto + (postfix ? ` —— ${postfix}` : '')
    }

    onBeforeMount(() => {
      fetchHitokoto()
    })

    return () => (
      <ContentLayout>
        <NH1 class="font-light">欢迎回来</NH1>
        <NP>
          <NSpace align="center" class="min-h-[3rem]">
            {hitokoto.value ? (
              <>
                <NText class="leading-normal">{hitokoto.value}</NText>
                <div class="space-x-2 flex items-center">
                  <NButton
                    text
                    onClick={fetchHitokoto}
                    class="ml-4 phone:ml-0 phone:float-right"
                  >
                    <Icon>
                      <Refresh />
                    </Icon>
                  </NButton>

                  <NButton
                    text
                    onClick={() => {
                      navigator.clipboard.writeText(hitokoto.value)
                      message.success('已复制')
                      message.info(hitokoto.value)
                    }}
                  >
                    <Icon>
                      <Copy />
                    </Icon>
                  </NButton>
                </div>
              </>
            ) : (
              <NText>加载中...</NText>
            )}
          </NSpace>
        </NP>
      </ContentLayout>
    )
  },
})
