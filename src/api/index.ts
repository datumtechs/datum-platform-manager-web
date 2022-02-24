import axios from 'axios'
import { USEUSERSINFO } from '@/stores'
import { addRequest, removeRequest } from '@/utils/cancelToken'
import { ElMessage } from 'element-plus'
import { getLanguage } from '@/utils/lang'
let tokenAbnormal = false

const service = axios.create({
  // baseURL: '/api', // url = base url + request url
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
})
service.interceptors.request.use(
  (config: any) => {
    addRequest(config)
    config.headers.common['Accept-Language'] = getLanguage()
    config.headers.common['Access-Token'] = USEUSERSINFO().getToken || ''
    return config
  },
  (error: any) => {
    console.log(error)
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
        USEUSERSINFO().clean()
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
    console.log(error)
    return Promise.reject(error)
  }
)

export default service