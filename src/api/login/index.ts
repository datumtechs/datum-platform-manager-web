import http from '@/api'

export const Login = (data: any): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/user/login',
    data
  })
}

export const LoginNonceId = (address: string): Promise<any> => {
  return http({
    method: 'GET',
    url: `/flow/user/getLoginNonce`,
    params: { address }
  })
}

export const Logout = (): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/user/logout'
  })
}