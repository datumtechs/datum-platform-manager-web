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

export const updateUserInfo = (data: {}): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/user/updateUserName',
    data
  })
}

//网络节点列表
export const getUserOrgList = (params?: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/org/getUserOrgList',
    params
  })
}

//用户有可用数据的
export const getBaseOrgList = (params: any): Promise<any> => {
  return http({
    method: 'GET',
    url: '/flow/org/getBaseOrgList',
    params
  })
}


//  添加网络节点
export const postJoinOrg = (data: {}): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/org/joinOrg',
    data
  })
}

//  删除网络节点
export const delNodeOrg = (data: {}): Promise<any> => {
  return http({
    method: 'POST',
    url: '/flow/org/quitOrg',
    data
  })
}