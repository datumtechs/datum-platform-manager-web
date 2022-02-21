export default [
  {
    path: '/nodes',
    name:"nodes",
    meta: {
      breadcrumbs: 'menu.nodes'
    },
    component: () => import(/* webpackChunkName: "nodes" */ '@/views/nodes/index.vue'),
    children: [{
      path: 'Details',
      name:"Details",
      meta: {
        breadcrumbs: 'menu.nodesDetail'
      },
      component: () => import(/* webpackChunkName: "nodesDetail" */ '@/views/nodes/components/Details.vue')
    }],
  },
  {
    path: '/marketplace',
    name:"marketplace",
    meta: {
      breadcrumbs: 'menu.marketplace'
    },
    component: () => import(/* webpackChunkName: "marketplace" */ '@/views/marketplace/index.vue'),
    children: [{
      path: 'Details',
      name:"Details",
      meta: {
        breadcrumbs: 'menu.marketplaceDetails'
      },
      component: () => import(/* webpackChunkName: "marketplaceDetail" */ '@/views/marketplace/components/Details.vue')
    }],
  },
  {
    path: '/computing',
    name:"computing",
    meta: {
      breadcrumbs: 'menu.computing'
    },
    component: () => import(/* webpackChunkName: "computing" */ '@/views/computing/index.vue'),
    children: [{
      path: 'Details',
      name:"Details",
      meta: {
        breadcrumbs: 'menu.computingDetails'
      },
      component: () => import(/* webpackChunkName: "computingDetails" */ '@/views/computing/components/Details.vue')
    }],
  },
  {
    path: '/*',
    redirect: 'assetsDetail',
    meta: {
      show: false,
      breadcrumbs: 'menu.computingDetails'
    },
  }
]