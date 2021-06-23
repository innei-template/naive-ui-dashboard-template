/*
 * @Author: Innei
 * @Date: 2021-03-21 22:21:31
 * @LastEditTime: 2021-03-22 11:50:11
 * @LastEditors: Innei
 * @FilePath: /admin-next/src/router.ts
 * Mark: Coding with Love
 */
import { Icon } from '@vicons/utils'
import TachometerAlt from '@vicons/fa/es/TachometerAlt'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
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
          <TachometerAlt />
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
      path: '/login',
      name: RouteName.Login,
      meta: { isPublic: true, title: '登陆' },
      component: LoginView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      meta: { isPublic: true },
      redirect: '/',
    },
  ],
})
