import http from '@/api'

//查询算法
export const getAlgTree = (): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/alg/getAlgTree',
  })
}

//查询算法详情
export const queryAlgoDetail = (): Promise<any> => {
  return http({
    method: 'GET',
    url: ' /flow/alg/getAlgTreeDetails',
  })
}
