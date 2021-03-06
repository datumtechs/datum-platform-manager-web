import Vue from 'vue'
import axios from 'axios'
import { message } from '@/plugins/message.ts'
import { getToken, removeToken, getLanguage, setToken } from '@/utils/auth'
import { UserModule } from '@/store/modules/user'
import router from '@/router'

/* 创建axios实例 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 10000,
  headers: {
    ContentType: 'application/json',
  },
})
/* request拦截器 */
service.interceptors.request.use(
  (config: any) => {
    const token: string = getToken()
    const language: string = getLanguage()
    config.headers.common['Accept-Language'] = language
    if (token) {
      config.headers.common['Access-Token'] = token
      // 设置token失效时间, 默认30min
      setToken(token)
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  },
)

/* respone拦截器 */
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    const responseType = response.request.responseType
    if (res.code !== 10000 && responseType !== 'blob') {
      message.error(res.msg)
      if (res.code === 20006 || res.code === 20007 || res.code === 20008) {
        UserModule.ResetToken()
        router.replace('/')
      }
    }
    return res
  },
  (error: any) => {
    const code = error.response ? error.response.status : 0
    switch (code) {
      case 404:
        error.message = '未找到服务'
        break
      case 401:
        error.message = 'Token失效'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      default:
        error.message = '网络异常，请重试'
        break
    }
    message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000,
    })
    throw new Error(error.message || '网络异常，请重试')
  },
)

Vue.prototype.$axios = service
export default service
