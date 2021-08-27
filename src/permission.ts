import router from './router'
import { config } from '@/config/index.ts'
import { setToken, setUserId } from '@/utils/auth'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { PermissionModule } from '@/store/modules/permission'
const whiteList = ['/login', '/home', '/case/index']
// router.beforeEach(async (to: Route, _: Route, next: any) => {
//   if (UserModule.token) {
//      Check whether the user has obtained his permission roles
//     if (to.path === '/login') {
//        If is logged in, redirect to the home page
//       next({ path: '/home' })
//     } else {
//        if (UserModule.roles.length === 0) {
//       //   try {
//       //     await UserModule.GetUserInfo()
//       //     const roles = UserModule.roles
//       //     if (!roles.includes(50000)) return router.replace({ path: '/403' })
//       //     PermissionModule.GenerateRoutes(roles)
//       //     router.addRoutes(PermissionModule.dynamicRoutes)
//       //     next({ ...to, replace: true })
//       //   } catch (err) {
//       //     UserModule.ResetToken()
//       //   }
//       // } else {
//       //   next()
//       // }
//       next()
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       // In the free login whitelist, go directly
//       next()
//     } else {
//       // Other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//     }
//   }
// })
