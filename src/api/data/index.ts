import http from '@/api'

export const queryUserDataList = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getUserDataList',
    params
  })
}
export const queryDataStats = (): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getDataStats'
  })
}

export const queryDataDetails = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getDataDetails',
    params
  })
}
//通过元数据查询参与任务
export const queryTaskListByData = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/task/getTaskListByData',
    params
  })
}

