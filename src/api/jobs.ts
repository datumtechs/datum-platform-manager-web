import { get, post, put, del } from './index'

// 作业列表
export const jobList = (params: any) => {
  return post('/job/list', params)
}
// 添加作业
export const addJob = (params: any) => {
  return post('/job/add', params)
}
// 编辑作业
export const setJob = (params: any) => {
  return post('/job/edit', params)
}
// 编辑作业基本信息
export const setJobBase = (params: any) => {
  return post('/job/editBasicInfo', params)
}
// 查询关联工作流
export const queryWorkflow = (params: any) => {
  console.log(params)
  return get('/job/queryRelatedWorkflowName', params)
}
// 操作作业
export const actionJob = (params: any) => {
  return post('/job/action', params)
}

// 查询子作业
export const subJoblist = (params: any) => {
  return post('/subJob/list', params)
}

// 操作子作业
export const subJobaction = (params: any) => {
  return post('/subJob/action', params)
}

// 删除作业
export const deleteJobBatch = (params: any) => {
  return post('/job/deleteBatch', params)
}

// 删除子作业
export const subDeleteBatch = (params: any) => {
  return post('/subJob/deleteBatch', params)
}
