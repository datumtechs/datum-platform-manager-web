import request from '@/utils/request'
// 账号权限
export const getUserInfo = () => {
  return request.get('/user/permission/')
}
