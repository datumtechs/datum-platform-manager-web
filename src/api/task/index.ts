import http from '@/api'

export const queryTaskList = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/task/getTaskList',
    params
  })
}

export const queryTaskDetails = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/task/getTaskDetails',
    params
  })
}
export const queryTaskStats = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/task/getTaskStats',
    params
  })
}
export const getTaskListByOrg = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/task/getTaskListByOrg',
    params
  })
}
