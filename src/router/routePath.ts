//show: [1,2,3],//1 首页展示 2 side展示 3 登录可见菜单

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
    redirect: 'nodesIndex',
    // name: "nodes",
    meta: {
      show: [1, 2],//1 首页展示 2 side展示
      label: 'menu.nodes',
      search: true,
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
        path: 'details',
        name: "nodeDetails",
        meta: {
          label: 'menu.nodesDetail'
        },
        component: () => import('@/views/nodes/components/NodeDetails.vue')
      }],
  },
  {
    path: '/marketplace',
    name: "marketplace",
    meta: {
      show: [1, 2],//1 首页展示 2 side展示
      label: 'menu.marketplace',
      search: true,
      icon: "side-marketplace-icon"
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
      search: true,
      icon: "side-computing-icon"
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
    path: '/computeTask',
    name: "computeTask",
    meta: {
      show: [2],
      label: 'menu.computeTask',
      search: true,
      icon: "side-my-models-icon"
    },
    component: () => import('@/views/computing/ComputeTask.vue'),
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
      show: [3],
      label: 'menu.data',
      search: true,
      icon: "side-my-datas-icon"
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
      show: [3],
      label: 'menu.workflow',
      search: true,
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
      search: true,
      icon: "side-my-task-icon"
    },
    component: () => import('@/views/task/Details.vue'),
  },
  // {
  //   path: '/models',
  //   name: "models",
  //   meta: {
  //     show: [3],
  //     label: 'menu.models',
  //     search: true,
  //     icon: "side-my-models-icon"
  //   },
  //   component: () => import('@/views/myModels/index.vue'),
  // },
  {
    path: '/*',
    redirect: 'assetsDetail',
    meta: {
      show: [],//不展示
    },
  }
]