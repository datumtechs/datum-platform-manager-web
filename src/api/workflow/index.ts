import http from '@/api'

export const queryWorkflowList = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/getWorkflowList',
    params
  })
}

export const queryWorkflowStats = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/getWorkflowStats',
    params
  })
}
//删除
export const deleteWorkflow = (data: {}): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/workflow/deleteWorkflow',
    data
  })
}

//查询算法对应计算流程
export const getProcessList = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/wizard/getCalculationProcessList',
    params
  })
}

//向导模式下创建工作流
export const postCreateWorkflowWizard = (data: {}): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/workflow/wizard/createWorkflowOfWizardMode',
    data
  })
}

//查询进度
export const getWorkflowSettingOfWizardMode = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/wizard/getWorkflowSettingOfWizardMode',
    params
  })
}

//设置工作流
export const setWorkflowOfWizardMode = (data: {}): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/workflow/wizard/settingWorkflowOfWizardMode',
    data
  })
}
//启动
export const startWorkFlow = (data: any): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow//workflow/start',
    data
  })
}

//查询工作流版本列表
export const getWorkflowVersionList = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow//workflow/getWorkflowVersionList',
    params
  })
}

//复制
export const copyWorkflow = (data: any): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/workflow/copyWorkflow',
    data
  })
}

export const getWorkflowRunTaskList = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/getWorkflowRunTaskList',
    params
  })
}

export const getWorkflowRunTaskResult = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/getWorkflowRunTaskResult',
    params
  })
}
// 查询启动工作流明细
export const getWorkflowStartDetail = (data: any): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/workflow/preparationStart',
    data
  })
}

export const preparationStartCredentialList = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/preparationStartCredentialList',
    params
  })
}

// 结果文件下载 /flow/workflow/downloadResultFile
export const downloadResultFile = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/workflow/downloadResultFile',
    params,
    responseType: 'blob'
  })
}

//启动 参数获取
export const getStartWorkParams = (data: any): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow//workflow/unsignedWorkflow',
    data
  })
}