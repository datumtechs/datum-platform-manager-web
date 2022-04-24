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
