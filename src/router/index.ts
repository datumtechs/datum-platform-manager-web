import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
/* Layout */
import Layout from '@/components/layout/index.vue'
import { stringifyQuery, parseQuery } from './utils/query'
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
    redirect: '/home/data',
    meta: {
      title: 'market',
    },
    children: [
      {
        path: 'home',
        redirect: '/home/data',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        children: [
          {
            path: 'data',
            name: 'data',
            component: () =>
              import(
                /* webpackChunkName: "homeData" */ '@/views/home/list.vue'
              ),
          },
          {
            path: 'algorithm',
            name: 'algorithm',
            component: () =>
              import(
                /* webpackChunkName: "homeAlgorithm" */ '@/views/home/list.vue'
              ),
          },
          {
            path: 'service',
            name: 'service',
            component: () =>
              import(
                /* webpackChunkName: "homeService" */ '@/views/home/list.vue'
              ),
          },
        ],
      },
      {
        path: 'data/detail/:id/:userMateDataId/:metaid',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/detail.vue'),
        name: 'dataDetail',
        meta: {
          title: 'dataDetail',
          activeMenu: '/home/data',
          dynamic: true, // breadcrumb dynamic name
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
        path: 'data/:id/:userMateDataId/authorize/:metaid',
        component: () =>
          import(
            /* webpackChunkName: "authorize" */ '@/views/home/authorize.vue'
          ),
        name: 'Authorize',
        meta: {
          title: 'application',
          activeMenu: '/home/data',
        },
      },
      {
        path: 'algorithm/detail/:id',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/detail.vue'),
        name: 'algorithmDetail',
        meta: {
          title: 'algorithmDetail',
          activeMenu: '/home/data',
          dynamic: true,
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
      title: 'projectAll',
    },
    children: [
      {
        path: 'create',
        name: 'create',
        meta: {
          title: 'create',
          activeMenu: '/project/all',
        },
        component: () =>
          import(/* webpackChunkName: "create" */ '@/views/project/create.vue'),
      },
      {
        path: 'all',
        name: 'projectAll',
        component: () =>
          import(
            /* webpackChunkName: "project-all" */ '@/views/project/all.vue'
          ),
      },
      {
        path: '',
        redirect: '/project/work',
        component: () =>
          import(/* webpackChunkName: "project" */ '@/views/project/index.vue'),
        name: 'project',
        meta: {
          title: 'project',
          activeMenu: '/project/all',
          dynamic: true,
        },
        children: [
          {
            path: 'work',
            name: 'work',
            meta: {
              // dynamic: true,
              title: 'work',
              activeMenu: '/project/all',
            },
            component: () =>
              import(
                /* webpackChunkName: "project-work" */ '@/views/project/work.vue'
              ),
          },
          {
            path: 'jobs',
            name: 'jobs',
            meta: {
              title: 'jobs',
              activeMenu: '/project/all',
            },
            component: () =>
              import(
                /* webpackChunkName: "project-work" */ '@/views/project/work.vue'
              ),
          },
          {
            path: 'workflow',
            name: 'workflow',
            meta: {
              title: 'workflow',
              activeMenu: '/project/all',
              dynamic: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "project-workflow" */ '@/views/project/workflow/index.vue'
              ),
          },
          {
            path: 'subjob',
            name: 'subjob',
            meta: {
              title: 'subjob',
              activeMenu: '/project/all',
              dynamic: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "project-subjob" */ '@/views/project/subjob.vue'
              ),
          },
        ],
      },
      {
        path: 'edit',
        component: () =>
          import(
            /* webpackChunkName: "project-edit" */ '@/views/project/setup.vue'
          ),
        name: 'edit',
        meta: {
          title: 'projectEdit',
          activeMenu: '/project/all',
        },
      },
      {
        path: 'manage',
        component: () =>
          import(
            /* webpackChunkName: "project-manage" */ '@/views/project/setup.vue'
          ),
        name: 'manage',
        meta: {
          title: 'projectManage',
          activeMenu: '/project/all',
        },
      },
    ],
  },
  {
    path: '/resources',
    redirect: '/resources/data',
    component: Layout,
    meta: {
      title: 'resources',
    },
    children: [
      {
        path: 'data',
        name: 'resourcesList',
        component: () =>
          import(/* webpackChunkName: "data" */ '@/views/resources/index.vue'),
      },
      {
        path: 'detail/:id/:userMateDataId/:metaid',
        name: 'resourcesData',
        meta: {
          title: 'resourcesData',
          dynamic: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "resources-data" */ '@/views/home/detail.vue'
          ),
      },
    ],
  },
  {
    path: '/account',
    redirect: '/account/nickname',
    component: Layout,
    meta: {
      title: 'account',
    },
    children: [
      {
        path: 'nickname',
        name: 'nickname',
        component: () =>
          import(
            /* webpackChunkName: "nickname" */ '@/views/account/nickname.vue'
          ),
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
    stringifyQuery: stringifyQuery, // 加密
    parseQuery: parseQuery, // 解密
    routes: constantRoutes,
  })
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}
export default router
