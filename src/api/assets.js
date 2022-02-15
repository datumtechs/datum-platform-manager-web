import http from 'request'

const assetsApi = {
  // 查询资产数据列表
  listByOwner: params => {
    return http({
      method: 'get',
      url: '/flow/data/listByOwner',
      params
    })
  },
  // 查询算法列表
  getAlgoList: params => {
    return http({
      method: 'get',
      url: '/flow/algorithm/list',
      params
    })
  },

  // 撤销授权申请 /flow/data/revoke
  revokeAssets: data => {
    return http({
      method: 'post',
      url: '/flow/data/revoke',
      data
    })
  },

  // 查询元数据详情 /flow/data/detail
  getMetaDetail: params => {
    return http({
      method: 'get',
      url: '/flow/data/detail',
      params
    })
  },

  // 查询元数据分页列表 /flow/data/columnList
  getMetaList: params => {
    return http({
      method: 'get',
      url: '/flow/data/columnList',
      params
    })
  }

}

export default assetsApi
