import { get, post, put, del } from './index'

// 申请数据
export const getDataAuth = (params?: any) => {
  return post('/data/auth', params)
}
