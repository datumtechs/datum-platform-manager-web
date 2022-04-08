import http from '@/api'

export const queryUserDataList = (): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/data/getUserDataList'
  })
}
