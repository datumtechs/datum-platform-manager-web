import { get, post, put, del } from './index'

// 数据列表
export const getDataList = (params?: any) => {
  return get('/data/pageList', params)
}

// 数据详情
export const getDataDetail = (id: string | number) => {
  return get('/data/detail/' + id)
}

// 元数据分页
export const getColumnList = (params?: any) => {
  return get('data/columnList', params)
}
