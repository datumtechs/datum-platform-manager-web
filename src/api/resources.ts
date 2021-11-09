import { get, post, put, del } from './index'
// 已授权资源
export const getListByOwner = (params?: any) => {
  return get('/data/listByOwner/', params)
}
