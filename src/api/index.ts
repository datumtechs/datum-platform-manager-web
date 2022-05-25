import axios from 'axios'
import { useUsersInfo } from '@/stores'
import { addRequest, removeRequest } from '@/utils/cancelToken'
import { ElMessage } from 'element-plus'
import { getLanguage } from '@/utils/lang'
let tokenAbnormal = false

const service = axios.create({
  // baseURL: 'https://192.168.120.122', // url = base url + request url
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
})
service.interceptors.request.use(
  (config: any) => {
    addRequest(config)
    config.headers.common['Accept-Language'] = getLanguage()
    config.headers.common['Access-Token'] = useUsersInfo().getToken || ''
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res: any) => {
    const {
      data, config
    } = res
    removeRequest(config)
    if (data.code !== 10000) {
      if (data.code === 20006 || data.code === 20007) {
        // token  失效
        useUsersInfo().clean()
        window.location.href = '/'
      }
      if (config.url.includes('/flow') && !!data.msg && !tokenAbnormal) {
        tokenAbnormal = true
        ElMessage.error(data.msg)
        setTimeout(() => {
          tokenAbnormal = false
        }, 500)
      }
    }
    return data
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default service