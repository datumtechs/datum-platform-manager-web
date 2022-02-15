import http from 'request'

const dataApi = {
  // 数据市场列表 /flow/data/pageList
  queryDataPageList: params => {
    return http({
      method: 'get',
      url: '/flow/data/pageList',
      params
    })
  },

  // 数据授权
  authData: data => {
    return http({
      method: 'post',
      url: '/flow/data/auth',
      data
    })
  },

  // 制定组织上传的文件列表? /data/listDataFileByIdentityId
  queryMetaListByNodeId: params => {
    return http({
      method: 'get',
      url: '/scan/data/listDataFileByIdentityId',
      params
    })
  },

  // 查询数据文件描述 /data/getDataFile
  getDataFile: params => {
    return http({
      method: 'get',
      url: '/scan/data/getDataFile',
      params
    })
  },

  // 查询数据文件的metaDataColumn定义  /data/listMetaDataColumn
  listMetaDataColumn: params => {
    return http({
      method: 'get',
      url: '/scan/data/listMetaDataColumn',
      params
    })
  },

  // 查询所有组织 /data/listDataFile
  listDataFile: params => {
    return http({
      method: 'get',
      url: '/scan/data/listDataFile',
      params
    })
  }

  // 申请授权

}

export default dataApi
