//show: ['home','side','login'],//1 首页展示 2 side展示 3 登录可见菜单

export default [
  {
    path: '/',
    name: "home",
    alias: '/home',
    meta: {
      show: ['home'],
      label: 'menu.home'
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/nodes',
    redirect: 'nodesIndex',
    // name: "nodes",
    meta: {
      show: ['home', 'side'],
      label: 'menu.nodes',
      icon: "side-node-icon"
    },
    component: () => import('@/views/nodes/index.vue'),
    children: [
      {
        path: '/nodes',
        name: "nodesIndex",
        meta: {
          label: 'menu.nodes',
        },
        component: () => import('@/views/nodes/components/NodeIndex.vue'),
      },
      {
        path: '/nodes/details/:identityId',
        name: "nodeDetails",
        meta: {
          label: 'menu.nodesDetail'
        },
        component: () => import('@/views/nodes/components/NodeDetails.vue')
      }, {
        path: '/nodes/details/:identityId/dataOverview',
        name: "dataOverview",
        meta: {
          label: 'menu.nodesDetail'
        },
        component: () => import('@/views/nodes/components/DataOverview.vue')
      }, {
        path: '/nodes/details/:identityId/computationOverview',
        name: "computationOverview",
        meta: {
          label: 'menu.nodesDetail'
        },
        component: () => import('@/views/nodes/components/ComputationOverview.vue')
      }],
  },
  {
    path: '/marketplace',
    redirect: 'marketplaceIndex',
    meta: {
      show: ['home', 'side'],
      label: 'menu.marketplace',
      icon: "side-marketplace-icon",
    },
    component: () => import('@/views/marketplace/index.vue'),
    children: [{
      path: '/marketplace',
      name: "marketplaceIndex",
      meta: {
        label: 'menu.marketplace',
      },
      component: () => import('@/views/marketplace/components/MarketplaceIndex.vue'),
    }, {
      path: '/marketplace/dataOverview',
      name: "marketDataOverview",
      meta: {
        label: 'menu.marketplace'
      },
      component: () => import('@/components/DataDetails.vue')
    }],
  },
  {
    path: '/ComputeServe',
    name: "ComputeServe",
    meta: {
      show: ['home', 'side'],
      label: 'menu.computing',
      icon: "side-computing-icon"
    },
    component: () => import('@/views/computing/ComputeServe.vue'),
  },
  {
    path: '/computeTask',
    name: "computeTask",
    meta: {
      show: ['side'],
      label: 'menu.computeTask',
      icon: "side-computeTask-icon"
    },
    component: () => import('@/views/computing/ComputeTask.vue'),
  },
  {
    path: '/computeTask/details',
    name: "computeTaskDetails",
    meta: {
      show: [],
      label: 'menu.computeTaskDetails',
      icon: "side-computeTask-icon"
    },
    component: () => import('@/views/computing/components/Details.vue'),
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
    path: '/createTask',
    name: "createTask",
    meta: {
      show: [],
      label: 'menu.createTask'
    },
    component: () => import('@/views/task/CreateTask.vue')
  },
  {
    path: '/data',
    name: "data",
    meta: {
      show: ['login'],
      label: 'menu.data',
      icon: "side-my-data-icon"
    },
    component: () => import('@/views/myData/index.vue')
  },
  {
    path: '/data/details',
    name: "dataDetails",
    meta: {
      label: 'menu.dataDetails',
      show: []
    },
    component: () => import('@/views/myData/components/Details.vue')
  },
  {
    path: '/data/credentials',
    name: "dataCredentials",
    meta: {
      label: 'menu.dataCredentials',
      show: []
    },
    component: () => import('@/views/myData/components/Credentials.vue')
  },
  {
    path: '/workflow',
    name: "workflow",
    meta: {
      show: ['login'],
      label: 'menu.workflow',
      icon: "side-my-task-icon"
    },
    component: () => import('@/views/task/index.vue'),
  },
  {
    path: '/workflow/details/:id',
    name: "workflowDetails",
    meta: {
      show: [],
      label: 'menu.workflowDetails',
      icon: "side-my-task-icon"
    },
    component: () => import('@/views/task/Details.vue'),
  },
  // {
  //   path: '/models',
  //   name: "models",
  //   meta: {
  //     show: ['login'],
  //     label: 'menu.models',
  //     icon: "side-my-models-icon"
  //   },
  //   component: () => import('@/views/myModels/index.vue'),
  // },
  {
    path: '/myAuthorization',
    name: "myAuthorization",
    meta: {
      show: ['login'],
      label: 'menu.myAuthorization',
      icon: "side-my-auth-icon"
    },
    component: () => import('@/views/myAuth/index.vue'),
  },
  {
    path: '/*',
    redirect: 'home',
    meta: {
      show: [],//不展示
    },
  }
]