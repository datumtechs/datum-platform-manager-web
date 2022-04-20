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

// export const queryTaskDetails = (params: {}): Promise<any> => {
//   return http({
//     method: 'GET',
//     url: '/flow/task/getTaskDetails',
//     params
//   })
// }
// export const queryTaskStats = (params: {}): Promise<any> => {
//   return http({
//     method: 'GET',
//     url: '/flow/task/getTaskStats',
//     params
//   })
// }