import http from 'request'

const orgApi = {
  // findOrgInfo
  findOrgInfo: params => {
    return http({
      method: 'get',
      url: '/scan/org/findOrgInfo',
      params
    })
  },

  // 节点列表
  queryNodeList: params => {
    return http({
      method: 'get',
      url: '/scan/org/listOrgInfo',
      params
    })
  },

  // /org/listOrgInfoByName
  listOrgInfoByName: params => {
    return http({
      method: 'get',
      url: '/scan/org/listOrgInfoByName',
      params
    })
  },

  // /org/listOrgInfoByActivity
  listOrgInfoByActivity: params => {
    return http({
      method: 'get',
      url: '/scan/org/listOrgInfoByActivity',
      params
    })
  },

  // /org/listOrgInfoByMemory
  listOrgInfoByMemory: params => {
    return http({
      method: 'get',
      url: '/scan/org/listOrgInfoByMemory',
      params
    })
  },

  // /org/listOrgInfoByTotalAlgo
  listOrgInfoByTotalAlgo: params => {
    return http({
      method: 'get',
      url: '/scan/org/listOrgInfoByTotalAlgo',
      params
    })
  },

  // /org/listOrgInfoByTotalData
  listOrgInfoByTotalData: params => {
    return http({
      method: 'get',
      url: '/scan/org/listOrgInfoByTotalData',
      params
    })
  }
}

export default orgApi
