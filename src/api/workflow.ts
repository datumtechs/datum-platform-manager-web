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

// 查询工作流列表
export const getNodes = (id?: any) => {
  return get(`/workflowNode/queryNodeDetailsList/${id}`)
}

// 输入工作流
export const addNodeInput = (params?: any) => {
  return post('/workflowNode/addNodeInput', params)
}

// 查询组织选项
export const getOrganization = () => {
  return get('/data/getAllAuthOrganization/')
}
// 查询表选项
export const getTables = (parmas: any) => {
  return get('/data/getAllAuthTables', parmas)
}
// 查询字段选项
export const getColumns = (id: string | number) => {
  return get(`/data/getAllAuthColumns/${id}`)
}

// 启动工作流
export const startWorkflow = (parmas: any) => {
  return post('/workflow/start', parmas)
}

// 终止工作流
export const endWorkflow = (parmas: any) => {
  return post('/workflow/terminate', parmas)
}

// 获取运行日志
export const getWorkflwLog = (id: string | number) => {
  return post(`/workflow/getLog/${id}`, {})
}
