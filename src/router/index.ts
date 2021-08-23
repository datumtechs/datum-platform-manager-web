import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
/* Layout */
import Layout from '@/components/layout/index.vue'
Vue.use(Router)

export const constantRoutes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/404',
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: 'market',
    },
    children: [
      {
        path: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        name: 'Home',
      },
      {
        path: 'home/detail/:id',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/detail.vue'),
        name: 'detail',
        meta: {
          title: 'detail',
          icon: 'detail',
          activeMenu: '/home',
        },
        children: [
          {
            path: 'authorize',
            component: () =>
              import(
                /* webpackChunkName: "authorize" */ '@/views/home/authorize.vue'
              ),
            name: 'Authorize',
            meta: {
              title: 'application',
              activeMenu: '/home',
            },
          },
        ],
      },
      {
        path: 'home/:id/authorize',
        component: () =>
          import(
            /* webpackChunkName: "authorize" */ '@/views/home/authorize.vue'
          ),
        name: 'Authorize',
        meta: {
          title: 'application',
          activeMenu: '/home',
        },
      },
    ],
  },
  {
    path: '/case',
    redirect: '/case/index',
    meta: {
      title: 'case',
    },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Case',
        component: () =>
          import(/* webpackChunkName: "case" */ '@/views/case/index.vue'),
      },
      {
        path: 'description/:id',
        name: 'description',
        meta: {
          activeMenu: '/case/index',
        },
        component: () =>
          import(/* webpackChunkName: "case" */ '@/views/case/description.vue'),
      },
    ],
  },
  {
    path: '/project',
    redirect: '/project/all',
    component: Layout,
    meta: {
      title: 'project',
    },
    children: [
      {
        path: 'all',
        name: 'projectAll',
        component: () =>
          import(
            /* webpackChunkName: "projectAll" */ '@/views/project/all.vue'
          ),
      },
      {
        path: ':id(\\d+)',
        component: () =>
          import(
            /* webpackChunkName: "example-edit" */ '@/views/project/index.vue'
          ),
        name: 'project',
        meta: {
          title: 'project',
          noCache: true,
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/market',
    redirect: '/market/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Market',
        meta: {
          title: 'RosettaFlow',
          icon: 'market',
        },
        component: () =>
          import(/* webpackChunkName: "market" */ '@/views/market/index.vue'),
      },
    ],
  },
]
export const asyncRoutes: RouteConfig[] = []

const createRouter = () =>
  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes,
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}
export default router
