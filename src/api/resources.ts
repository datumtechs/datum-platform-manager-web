import request from '@/utils/request'
// 已授权资源
export const getListByOwner = (params?: any) => {
  return request.get('/data/listByOwner/', params)
}
