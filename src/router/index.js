import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { clearRequest } from '../utils/cancelToken'
// import Layout from '@/components/layout/index.vue'

Vue.use(VueRouter)

const routes = [ {
  name: 'home',
  path: '/home',
  component: () => import(/* webpackChunkName: "Home" */ '@/views/home/Home.vue')
},
{
  name: 'layout',
  path: '/',
  redirect: '/home',
  component: () => import('@/layout/index.vue'),
  children: [ {
    name: 'cases',
    path: '/cases',
    component: () => import(/* webpackChunkName: "layout-cases-Cases" */ '@/views/cases/Cases.vue')
  },
  {
    name: 'projectIndex',
    path: '/projects',
    redirect: 'projects',
    component: () => import('@/views/projects/Index.vue'),
    meta: {
      breadcrumbs: 'menu.projects'
    },
    children: [ {
      name: 'projects',
      path: '/projects',
      component: () => import(/* webpackChunkName: "layout-projects-Projects" */ '@/views/projects/Projects.vue')
    },
    {
      name: 'createProject',
      path: '/projects/create',
      component: () => import(/* webpackChunkName: "layout-projects-CreateProjects" */ '@/views/projects/CreateProjects.vue'),
      meta: {
        breadcrumbs: 'cases.newProject'
      }
    },
    {
      name: 'projectCenter',
      path: '/projects/projectView/',
      redirect: 'projectView',
      component: () => import('@/views/projects/ProjectCenter.vue'),
      meta: {
        breadcrumbs: 'projects.projectView'
      },
      children: [ {
        name: 'projectView',
        path: '/projects/projectView/',
        component: () => import(/* webpackChunkName: "layout-projects-ProjectView" */ '@/views/projects/ProjectView.vue')
      },
      {
        name: 'subJob',
        path: '/projects/projectView/subJob',
        component: () => import(/* webpackChunkName: "layout-projects-components-SubJob" */ '@/views/projects/components/SubJob.vue'),
        meta: {
          breadcrumbs: 'menu.subJob',
          dynamic: true
        }
      },
      {
        name: 'workflowEdit',
        path: '/projects/projectView/workflowEdit',
        component: () => import(/* webpackChunkName: "layout-projects-components-WorkflowEdit" */ '@/views/projects/components/WorkflowEdit.vue'),
        meta: {
          breadcrumbs: 'menu.workflowEdit',
          dynamic: true
        }
      }
      ]
    }
    ]
  },
  {
    name: 'assetsIndex',
    path: '/assets',
    redirect: 'assets',
    component: () => import('@/views/assets/Index.vue'),
    meta: {
      breadcrumbs: 'menu.assets'
    },
    children: [ {
      name: 'assets',
      path: '/assets',
      component: () => import('@/views/assets/Assets.vue')
    }, {
      name: 'assetCenter',
      path: '/assets/detail',
      redirect: 'assetsDetail',
      component: () => import(/* webpackChunkName: "assetsIndex-assets-Index" */ '@/views/assets/Index.vue'),
      children: [ {
        name: 'assetsDetail',
        path: '/assets/detail',
        component: () => import(/* webpackChunkName: "assetsIndex-assets-AssetDetail" */ '@/views/assets/AssetDetail.vue'),
        meta: {
          breadcrumbs: 'menu.assetsDetail'
        }
      },
      {
        name: 'assetsReapply',
        path: '/assets/assetsReapply',
        component: () => import(/* webpackChunkName: "assets-assetCenter-assetsReapply" */ '@/views/marketplace/AssetsReapply.vue'),
        meta: {
          breadcrumbs: 'data.applyAuth'
        }
      } ]
    } ]
  },
  {
    // name: 'marketplace',
    path: '/marketplace',
    redirect: 'marketplace',
    component: () => import('@/views/marketplace/Index.vue'),
    children: [ {
      name: 'marketplace',
      path: '/marketplace',
      component: () => import(/* webpackChunkName: "marketplace-marketplace-Marketplace" */ '@/views/marketplace/Marketplace.vue'),
      meta: {
        breadcrumbs: 'menu.marketplace'
      }
    }
    ]
  },

  {
    path: '/nodes',
    redirect: 'nodes',
    component: () => import('@/views/nodes/Index.vue'),
    children: [ {
      name: 'nodes',
      path: '/nodes',
      component: () => import(/* webpackChunkName: "nodes-nodes-Nodes" */ '@/views/nodes/Nodes.vue')
    },
    {
      name: 'nodeDetail',
      path: '/nodes/nodeDetail',
      component: () => import(/* webpackChunkName: "nodes-nodes-nodeDetail" */ '@/views/nodes/nodeDetail.vue')
    },
    {
      name: 'metaDetail',
      path: '/nodes/metaDetail',
      component: () => import(/* webpackChunkName: "nodes-nodes-metaDetail" */ '@/views/nodes/metaDetail.vue')
    },
    {
      name: 'taskDetail',
      path: '/nodes/taskDetail',
      component: () => import(/* webpackChunkName: "nodes-nodes-taskDetail" */ '@/views/nodes/taskDetail.vue')
    },
    {
      name: 'metaJoinTaskDetail',
      path: '/nodes/metaJoinTaskDetail',
      component: () => import(/* webpackChunkName: "nodes-nodes-metaJoinTaskDetail" */ '@/views/nodes/metaJoinTaskDetail.vue')
    },
    {
      name: 'taskEvent',
      path: '/nodes/taskEvent',
      component: () => import(/* webpackChunkName: "nodes-nodes-taskEvent" */ '@/views/nodes/taskEvent.vue')
    }
    ]
  },
  {
    name: 'documentation',
    path: '/documentation',
    component: () => import(/* webpackChunkName: "nodes-documentation-Documentation" */ '@/views/documentation/Documentation.vue')
  }
  ]
},
{
  path: '*',
  component: () => import('@/views/404'),
  hidden: true
}
]

const router = new VueRouter({
  mode: 'history',
  routes
})
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  clearRequest()
  if (from.path === '/' && to.path === '/home' && store.getters[ 'app/user' ]) {
    next({ name: 'cases' })
  }
  next()
})

export {
  routes
}
export default router