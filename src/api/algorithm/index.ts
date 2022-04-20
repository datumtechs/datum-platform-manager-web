import http from '@/api'

export const getAlgTree = (): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/alg/getAlgTree',
  })
}
