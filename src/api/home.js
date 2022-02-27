import http from 'request'

const homeApi = {
  queryGlobalData: () => {
    return http({
      method: 'get',
      url: '/flow/home/globalStats'
    })
  },
  // 全网数据量走势  /home/dataTrend
  queryDataTrend: data => {
    return http({
      method: 'get',
      url: '/flow/home/dataTrend',
      data
    })
  }
}

export default homeApi
