import http from 'request'

const orgApi = {
  // findOrgInfo
  findOrgInfo: params => {
    return http({
      method: 'get',
      url: '/flow/org/findOrgInfo',
      params
    })
  },

  // 节点列表
  queryNodeList: params => {
    return http({
      method: 'get',
      url: '/flow/org/listOrgInfo',
      params
    })
  },

  // /org/listOrgInfoByName
  listOrgInfoByName: params => {
    return http({
      method: 'get',
      url: '/flow/org/listOrgInfoByName',
      params
    })
  },

  // /org/listOrgInfoByActivity
  listOrgInfoByActivity: params => {
    return http({
      method: 'get',
      url: '/flow/org/listOrgInfoByActivity',
      params
    })
  },

  // /org/listOrgInfoByMemory
  listOrgInfoByMemory: params => {
    return http({
      method: 'get',
      url: '/flow/org/listOrgInfoByMemory',
      params
    })
  },

  // /org/listOrgInfoByTotalAlgo
  listOrgInfoByTotalAlgo: params => {
    return http({
      method: 'get',
      url: '/flow/org/listOrgInfoByTotalAlgo',
      params
    })
  },

  // /org/listOrgInfoByTotalData
  listOrgInfoByTotalData: params => {
    return http({
      method: 'get',
      url: '/flow/org/listOrgInfoByTotalData',
      params
    })
  }
}

export default orgApi
