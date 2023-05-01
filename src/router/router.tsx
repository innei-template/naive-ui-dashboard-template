import { NIcon as Icon } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import SetupLayout from '../layouts/setup-view.vue'
import { SidebarLayout } from '../layouts/sidebar'
import DashBoardView from '../views/dashboard'
import LoginView from '../views/login/index.vue'
import { RouteName } from './name'

export const routeForMenu: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    component: DashBoardView,
    name: RouteName.Dashboard,
    meta: {
      title: '仪表盘',
      icon: (
        <Icon>
          <i class={'icon-[uil--tachometer-fast]'} />
        </Icon>
      ),
    },
  },
]

export const router = createRouter({
  history: __DEV__ ? createWebHistory() : createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: SidebarLayout,
      name: RouteName.Home,
      redirect: '/dashboard',
      children: [...routeForMenu],
    },

    {
      component: SetupLayout,
      path: '/',
      children: [
        {
          path: '/setup-api',
          meta: { isPublic: true, title: '设置接口地址' },
          component: () => import('../views/setup/setup-api'),
        },
        {
          path: '/login',
          name: RouteName.Login,
          meta: { isPublic: true, title: '登陆' },
          component: LoginView,
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: { isPublic: true },
      redirect: '/',
    },
  ],
})
