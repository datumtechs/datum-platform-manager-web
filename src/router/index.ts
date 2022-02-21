import { createRouter, createWebHistory } from 'vue-router'
import routePath from './routePath'

const router:any = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routePath]
})

export default router
