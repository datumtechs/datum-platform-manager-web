import request from '@/utils/request'

// 作业列表
export const jobList = (params: any) => {
  return request.post('/job/list', params)
}
// 添加作业
export const addJob = (params: any) => {
  return request.post('/job/add', params)
}
// 编辑作业
export const setJob = (params: any) => {
  return request.post('/job/edit', params)
}
// 查询关联工作流
export const queryWorkflow = (params: any) => {
  return request.get('/job/queryRelatedWorkflowName', params)
}
// 操作作业
export const actionJob = (params: any) => {
  return request.post('/job/action', params)
}
