export default [
  {
    path: '/',
    name: "home",
    alias: '/home',
    meta: {
      show: [1],//1 首页展示 2 side展示
      label: 'menu.home'
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/nodes',
    name: "nodes",
    meta: {
      show: [1, 2],//1 首页展示 2 side展示
      label: 'menu.nodes',
      search: true
    },
    component: () => import('@/views/nodes/index.vue'),
    children: [{
      path: 'Details',
      name: "Details",
      meta: {
        label: 'menu.nodesDetail'
      },
      component: () => import('@/views/nodes/components/Details.vue')
    }],
  },
  {
    path: '/marketplace',
    name: "marketplace",
    meta: {
      show: [1, 2],//1 首页展示 2 side展示
      label: 'menu.marketplace',
      search: true
    },
    component: () => import('@/views/marketplace/index.vue'),
    children: [{
      path: 'Details',
      name: "Details",
      meta: {
        label: 'menu.marketplaceDetails'
      },
      component: () => import('@/views/marketplace/components/Details.vue')
    }],
  },
  {
    path: '/computing',
    name: "computing",
    meta: {
      show: [1, 2],//1 首页展示 2 side展示
      label: 'menu.computing',
      search: true
    },
    component: () => import('@/views/computing/index.vue'),
    children: [{
      path: 'Details',
      name: "Details",
      meta: {
        label: 'menu.computingDetails'
      },
      component: () => import('@/views/computing/components/Details.vue')
    }],
  },
  {
    path: '/myAccount/:infoType',
    name: "myAccount",
    meta: {
      show: [],
      label: 'head.myAccount'
    },
    component: () => import('@/views/myAccount/index.vue')
  },
  {
    path: '/*',
    redirect: 'assetsDetail',
    meta: {
      show: [],//不展示
    },
  }
]