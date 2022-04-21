import http from '@/api'

//查询算法
export const getAlgTree = (): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/alg/getAlgTree',
  })
}

