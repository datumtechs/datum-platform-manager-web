import axios from '../utils/request'

// get
export function get(url: string, params?: any) {
  return axios.get(url, {
    params: params,
  })
}

// post
export function post(url: string, params: any) {
  return axios.post(url, params)
}

// put
export function put(url: string, params?: any) {
  return axios.put(url, params)
}

// delete
export function del(url: string) {
  return axios.delete(url)
}
//  down
export function down(url: string, params?: any) {
  return axios({
    method: 'get',
    url,
    params,
    responseType: 'blob', // blob, arraybuffer是js中提供处理二进制的接口
  })
}
