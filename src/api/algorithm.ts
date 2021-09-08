import { get, post, put, del } from './index'

// 算法树列表
export const geAlgorithmTree = () => {
  return get('/algorithm/queryAlgorithmTreeList')
}

// 算法树列表
export const geAlgorithms = (params?: any) => {
  return get('/algorithm/queryAlgorithmList', params)
}

// 新增工作流
export const addWorkflow = (params?: any) => {
  return post('/workflow/add', params)
}

// 编辑工作流
export const setWorkflow = (params?: any) => {
  return post('/workflow/edit', params)
}
