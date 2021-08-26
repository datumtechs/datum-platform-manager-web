import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { message } from '@/plugins/message.ts'
import { getToken, removeToken, getLanguage } from '@/utils/auth'
/* 创建axios实例 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  headers: {
    'content-type': 'application/x-www-form-urlencoded', // 转换为key=value的格式必须增加content-type
  },
  transformRequest: [
    (data, headers) => {
      return qs.stringify(data)
    },
  ],
})
/* request拦截器 */
service.interceptors.request.use(
  (config: any) => {
    if (config.url !== '/login') {
      const token: string = getToken()
      const language: string = getLanguage()
      if (token) {
        config.headers.common['Access-Token'] = token
        config.headers.common['Accept-Language'] = language
      }
    }
    return config
  },
  (error: any) => {
    message.error('请求超时')
    Promise.reject(error)
  },
)

/* respone拦截器 */
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    if (res.code !== 10000) {
      message.error(res.msg)
      if (res.code === 4008) {
        removeToken()
      }
      if (res.code === 4018) {
        window.location.href = '/403'
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
    if (code === 401) {
      removeToken()
      // let jumpUrl = window.location.href
      // window.location.href = `${config.CAS_FRONTEND_URL}/login?url=${jumpUrl}&isLogout=1`
      window.location.replace('/login')
    }
    throw new Error(error.message || '网络异常，请重试')
  },
)

Vue.prototype.$axios = service
export default service
