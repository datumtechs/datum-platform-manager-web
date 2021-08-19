import { get, post, put, del } from './index'

// 路口设备信息
export const getRoadsDevices = (params: any) => {
  return get('/cross/query/', params)
}

// 设备数量
export const getDeviceTotal = () => {
  return get('/device/total/')
}
