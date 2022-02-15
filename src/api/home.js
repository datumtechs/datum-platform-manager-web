import http from 'request'

const homeApi = {
  queryGlobalData: () => {
    return http({
      method: 'get',
      url: '/scan/home/globalStats'
    })
  },
  // 全网数据量走势  /home/dataTrend
  queryDataTrend: data => {
    return http({
      method: 'get',
      url: '/scan/home/dataTrend',
      data
    })
  }
}

export default homeApi
