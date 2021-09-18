import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import { message } from '@/plugins/message.ts'
import { PermissionModule } from '@/store/modules/permission'
// 白名单
const whiteList = [
  '/404',
  '/403',
  'data',
  'algorithm',
  'algorithmDetail',
  'service',
  'dataDetail',
  '/case/index',
  'description',
]
//  判断 白名单 =》用户登录页面。全局检测 token =》 role
router.beforeEach(async (to: Route, _: Route, next: any) => {
  if (UserModule.token) {
    next()
  } else {
    const name = to.name || ''
    const path = to.path || ''
    if (whiteList.indexOf(name) !== -1 || whiteList.indexOf(path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next('/home/data')
      message.error('暂无权限，请连接钱包')
    }
  }
})
// router.beforeEach(async (to: Route, _: Route, next: any) => {
//   if (UserModule.token) {
//      Check whether the user has obtained his permission roles
//     if (to.path === '/login') {
//        If is logged in, redirect to the home page
//       next({ path: '/home' })
//     } else {
//        if (UserModule.roles.length === 0) {
//         try {
//            await UserModule.GetUserInfo()
//            const roles = UserModule.roles
//             if (!roles.includes(50000)) return router.replace({ path: '/403' })
//              PermissionModule.GenerateRoutes(roles)
//              router.addRoutes(PermissionModule.dynamicRoutes)
//              next({ ...to, replace: true })
//         } catch (err) {
//           UserModule.ResetToken()
//         }
// } else {
//   next()
// }
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
