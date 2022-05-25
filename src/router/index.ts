import { createRouter, createWebHistory } from 'vue-router'
import routePath from './routePath'
import {cleanFn} from '@/directives'

const router:any = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routePath]
})

router.beforeResolve(() => {
  cleanFn()
})

export default router
