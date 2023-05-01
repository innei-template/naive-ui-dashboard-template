import { NSpin } from 'naive-ui'
import type { VNode } from 'vue'
import { Suspense, defineComponent } from 'vue'
import type { RouteLocation } from 'vue-router'
import { RouterView } from 'vue-router'

const $RouterView = defineComponent({
  setup() {
    return () => (
      <RouterView>
        {{
          default({ Component }: { Component: VNode; route: RouteLocation }) {
            return (
              <Suspense>
                {{
                  default: () => Component,

                  fallback() {
                    return () => (
                      <div class="fixed left-1/2 top-1/2 transform text-accent -translate-y-1/2 -translate-x-1/2">
                        <NSpin strokeWidth={14} />
                      </div>
                    )
                  },
                }}
              </Suspense>
            )
          },
        }}
      </RouterView>
    )
  },
})
export default $RouterView
