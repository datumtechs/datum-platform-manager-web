import request from '@/utils/request'
// 账号权限
export const getUserInfo = () => {
  return request.get('/user/permission/')
}

// 修改昵称
export const setNickName = (params: any) => {
  return request.post('/user/updateNickName', params)
}
