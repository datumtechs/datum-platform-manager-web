import { get, post, put, del } from './index'

// 数据列表
export const getDataList = (params?: any) => {
  return get('/data/list', params)
}

// 数据详情
export const getDataDetail = (id: number | string) => {
  return get(`/data/detail/${id}`)
}
