import { get, post, put, del } from './index'

// 项目列表
export const getProject = (params?: any) => {
  return get('/project/queryProjectPageList', params)
}

// 项目详情
export const getProjectDetail = (id: string | number) => {
  return get('/project/queryProjectDetails', { id })
}

// 项目模板列表
export const getProjectTemplate = (params?: any) => {
  return get('/projectTemplate/list', params)
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

// 用户列表
export const userList = (projectId: string | number) => {
  return get('/project/queryAllUserNickname/' + projectId)
}

// 成员列表
export const getMember = (params?: any) => {
  return get('/project/queryProjMemberPageList', params)
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

// 工作流列表
export const getWorkflows = (params?: any) => {
  return get('/workflow/list', params)
}

// 新增工作流
export const addWorkflow = (params?: any) => {
  return post('/workflow/add', params)
}

// 编辑工作流
export const setWorkflow = (params?: any) => {
  return post('/workflow/edit', params)
}
// 复制工作流
export const copyWorkflow = (params?: any) => {
  return post('/workflow/copy', params)
}

// 删除工作流
export const delWorkflow = (id?: number) => {
  return post(`/workflow/delete/${id}`, {})
}

// 批量删除工作流
export const deleteBatch = (params: any) => {
  return post('/workflow/deleteBatch', params)
}
