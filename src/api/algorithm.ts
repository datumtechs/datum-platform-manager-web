import { get, post, put, del } from './index'

// 算法树列表
export const geAlgorithmTree = () => {
  return get('/algorithm/queryAlgorithmTreeList')
}

// 算法树列表
export const geAlgorithms = (params?: any) => {
  return get('/algorithm/list', params)
}

// 算法详情
export const getAlgorithmsDetail = (id: string | number) => {
  return get('/algorithm/details/' + id)
}
