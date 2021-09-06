import request from '@/utils/request'
// 账号权限
export const getUserInfo = () => {
  return request.get('/user/permission/')
}

// 修改昵称
export const setNickName = (params: any) => {
  return request.post('/user/updateNickName', params)
}

// 用户列表
export const userList = () => {
  return request.get('/user/queryAllUserNickname')
}

// uuid
export const getLoginNonce = (address: string) => {
  return request.get('/user/getLoginNonce/' + address)
}
// 登录
export const getLogin = (params: any) => {
  return request.post('/user/login', params)
}
