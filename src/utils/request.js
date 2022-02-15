import axios from 'axios'
import store from '../store/index.js'
import { addRequest, removeRequest } from './cancelToken'
import {
  Message
} from 'element-ui'
import { getLanguage } from '@/utils/lang'
let tokenAbnormal = false

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
})
service.interceptors.request.use(
  config => {
    addRequest(config)
    config.headers.common[ 'Accept-Language' ] = getLanguage()
    config.headers.common[ 'Access-Token' ] = store.getters[ 'app/token' ] || ''
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    const {
      data, config
    } = res
    removeRequest(config)
    if (data.code !== 10000) {
      if (data.code === 20006 || data.code === 20007) {
        // token  失效
        store.commit('app/SET_USER', '')
        store.commit('app/SET_ADDRESS', '')
        store.commit('app/SET_TOKEN', '')
      }
      if (config.url.includes('/flow') && !!data.msg && !tokenAbnormal) {
        tokenAbnormal = true
        Message.error(data.msg)
        setTimeout(() => {
          tokenAbnormal = false
        }, 500)
      }
    }
    return data
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service