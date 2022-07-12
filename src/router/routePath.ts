//show: ['home','side','login'],//home 首页展示  side side展示 login 登录可见菜单

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

  // path: '/nodes',
  // name: 'nodes',
  // redirect: {
  //   name: 'nodesIndex'
  // },
  // meta: {
  //   show: ['home', 'side'],
  //   label: 'menu.nodes',
  //   icon: "side-node-icon"
  // },
  // component: () => import('@/views/nodes/index.vue'),
  // children: [
  {
    path: '/nodes',
    name: "nodes",
    meta: {
      show: ['home', 'side'],
      label: 'menu.nodes',
      icon: "side-node-icon"
    },
    component: () => import('@/views/nodes/components/NodeIndex.vue'),
  },
  {
    path: '/nodes/details/:identityId',
    name: "nodeDetails",
    redirect: {
      name: "nodeDetailIndex"
    },
    meta: {
      show: [],
      label: 'menu.nodesDetail',
      icon: "side-node-icon"
    },
    component: () => import('@/views/nodes/components/NodeDetails.vue'),
    children: [
      {
        path: '/nodes/details/:identityId/index',
        name: "nodeDetailIndex",
        meta: {
          label: 'menu.nodesDetail'
        },
        component: () => import('@/views/nodes/components/NodeDetailIndex.vue')
      },
      {
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
      }
    ]
  },
  // ],

  {
    // path: '/marketplace',
    // name: 'marketplace',
    // redirect: {
    //   name: 'marketplaceIndex'
    // },
    // meta: {
    //   show: ['home', 'side'],
    //   label: 'menu.marketplace',
    //   icon: "side-marketplace-icon",
    // },
    // component: () => import('@/views/marketplace/index.vue'),
    // children: [],

    path: '/marketplace',
    name: "marketplace",
    meta: {
      label: 'menu.marketplace',
      show: ['home', 'side'],
      icon: "side-marketplace-icon",
    },
    component: () => import('@/views/marketplace/components/MarketplaceIndex.vue'),
  }, {
    path: '/marketplace/dataOverview',
    name: "marketDataOverview",
    meta: {
      label: 'menu.marketplace',
      show: [],
      icon: "side-marketplace-icon",
    },
    component: () => import('@/components/DataDetails.vue')
  },
  {
    path: '/computeServe',
    name: "computeServe",
    meta: {
      show: ['home', 'side'],
      label: 'menu.AlgoService',
      icon: "side-computing-icon"
    },
    component: () => import('@/views/computeServe/index.vue'),
  },
  {
    path: '/computeTask',
    name: "computeTask",
    meta: {
      show: ['home', 'side'],
      label: 'menu.computeTask',
      icon: "side-computeTask-icon"
    },
    component: () => import('@/views/computeTask/index.vue')
  },
  {
    path: '/computeTask/details',
    name: "computeTaskDetails",
    meta: {
      show: [],
      label: 'menu.computeTaskDetails',
      icon: "side-computeTask-icon"
    },
    component: () => import('@/views/computeTask/components/Details.vue'),
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
    path: '/createWorkFlow',
    redirect: 'createWorkFlow',
    meta: {
      show: [],
      label: 'menu.createTask'
    },
    props: (route: any) => ({ ...route.query }),
    // component: () => import('@/views/task/CreateTask.vue'),
    component: () => import('@/views/task/index.vue'),
    children: [{
      path: '/createWorkFlow/wizardMode/:workflowId?/:workflowVersion?/:views?',
      name: "wizardMode",
      meta: {
        label: 'menu.createTask',
      },
      component: () => import('@/views/task/WizardMode.vue'),
    }, {
      path: '/createWorkFlow/expertModel/:workflowId?/:workflowVersion?/:workflowName?/:isSettingCompleted?/:isReadonly?',
      name: "expertModel",
      meta: {
        label: 'menu.createTask'
      },
      component: () => import('@/views/task/ExpertIndex.vue')
    }],
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
    component: () => import('@/views/workflow/MyWorkFlow.vue'),
  },
  {
    path: '/workflow/details/:id',
    name: "workflowDetails",
    meta: {
      show: [],
      label: 'menu.workflowDetails',
      icon: "side-my-task-icon"
    },
    component: () => import('@/views/workflow/components/Details.vue'),
  },
  {
    path: '/workflow/details/:id/subtask/:runId',
    name: "workflowSubtask",
    meta: {
      show: [],
      label: 'menu.workflowDetails',
      icon: "side-my-task-icon"
    },
    component: () => import('@/views/workflow/components/Subtask.vue'),
  },
  {
    path: '/workflow/details/:id/subtask/:runId/taskResult/:taskId',
    name: "TaskResult",
    meta: {
      show: [],
      label: 'menu.workflowDetails',
      icon: "side-my-task-icon"
    },
    component: () => import('@/views/workflow/components/TaskResult.vue'),
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
    path: '/:pathMatch(.*)',
    redirect: 'home',
    meta: {
      show: [],//不展示
    },
  }
]