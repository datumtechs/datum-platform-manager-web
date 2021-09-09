import { get, post, put, del } from './index'

// 新增工作流节点
export const addWorkflowNode = (params?: any) => {
  return post('/workflowNode/add', params)
}

// 编辑工作流
export const setWorkflow = (params?: any) => {
  return post('/workflow/edit', params)
}

// 保存工作流代码
export const saveNodeCode = (params?: any) => {
  return post('/workflowNode/saveNodeCode', params)
}

// 保存环境节点依赖资源
export const saveNodeResource = (params?: any) => {
  return post('/workflowNode/saveNodeResource', params)
}
// 输出
export const addNodeOutput = (params?: any) => {
  return post('/workflowNode/addNodeOutput', params)
}

// 清空工作流
export const clearNode = (params?: any) => {
  return post('/workflowNode/clear', params)
}

// 保存工作流-总保存
export const saveNode = (params?: any) => {
  return post('/workflowNode/save', params)
}
