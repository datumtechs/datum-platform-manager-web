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
        path: 'home/detail/:id',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home/detail.vue'),
        name: 'detail',
        meta: {
          title: 'detail',
          icon: 'detail',
          activeMenu: '/home/data',
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
          activeMenu: '/home/data',
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
        path: ':id',
        redirect: '/project/:id/work',
        component: () =>
          import(/* webpackChunkName: "project" */ '@/views/project/index.vue'),
        name: 'project',
        meta: {
          title: 'project',
          activeMenu: '/project/all',
        },
        children: [
          {
            path: 'work',
            name: 'work',
            meta: {
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
            path: 'workflow/:workflow',
            name: 'workflow',
            meta: {
              title: 'workflow',
              activeMenu: '/project/all',
            },
            component: () =>
              import(
                /* webpackChunkName: "project-workflow" */ '@/views/project/workflow/index.vue'
              ),
          },
          {
            path: 'subjob/:subjob',
            name: 'subjob',
            meta: {
              title: 'subjob',
              activeMenu: '/project/all',
            },
            component: () =>
              import(
                /* webpackChunkName: "project-subjob" */ '@/views/project/subjob.vue'
              ),
          },
        ],
      },
      {
        path: 'edit/:id',
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
        path: 'manage/:id',
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
        name: 'data',
        component: () =>
          import(/* webpackChunkName: "data" */ '@/views/resources/index.vue'),
      },
      {
        path: 'detail/:id',
        name: 'resourcesData',
        meta: {
          title: 'detail',
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
    routes: constantRoutes,
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}
export default router
