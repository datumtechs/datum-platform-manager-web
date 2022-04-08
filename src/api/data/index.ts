import http from '@/api'

export const queryUserDataList = (): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getUserDataList'
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