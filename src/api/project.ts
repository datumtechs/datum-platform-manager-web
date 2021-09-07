import { get, post, put, del } from './index'

// 项目列表
export const getProject = (params?: any) => {
  return get('/project/queryProjectList', params)
}

// 项目详情
export const getProjectDetail = (id: string | number) => {
  return get('/project/queryProjectDetails', { id })
}

// 新增项目
export const addProject = (params?: any) => {
  return post('/project/addProject', params)
}

// 删除项目
export const delProject = (params?: any) => {
  return post('/project/deleteProject', params)
}

// 批量删除项目
export const delProjects = (params?: any) => {
  return post('/project/deleteProjectBatch', params)
}

// 编辑项目
export const setProject = (params?: any) => {
  return post('/project/updateProject', params)
}

// 成员列表
export const getMember = (params?: any) => {
  return get('/project/queryProjMemberList', params)
}

// 删除成员
export const delProjMember = (params?: any) => {
  return post('/project/deleteProjMember', params)
}

// 批量删除成员
export const delProjMembers = (params?: any) => {
  return post('/project/deleteProjMemberBatch', params)
}

// 新增成员
export const addProjMember = (params?: any) => {
  return post('/project/addProjMember', params)
}

// 编辑成员
export const setProjMember = (params?: any) => {
  return post('/project/updateProjMember', params)
}