import http from '@/api'

export const queryUserDataList = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getDataListByUser',
    params
  })
}
export const getUserAuthDataList = (params: {}): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getUserAuthDataList',
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


export const getDataListByOrg = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getDataListByOrg',
    params
  })
}

export const queryDataList = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getDataList',
    params
  })
}

export const getUserDatumNetworkLatInfo = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getUserDatumNetworkLatInfo',
    params
  })
}

export const getUserModelList = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getUserModelList',
    params
  })
}

